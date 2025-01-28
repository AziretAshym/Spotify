import express from "express";
import mongoose from "mongoose";
import Album from "../models/Album";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res, next) => {
    const albumIdQuery = req.query.album_id;

    if (!albumIdQuery) {
        res.status(400).send("Album id is required");
        return;
    }

    try {
        const tracks = await Track.find({ album: albumIdQuery }).sort({ number: 1 });
        res.send(tracks);
    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', auth, async (req, res, next) => {
    const { title, album, duration, isPublished } = req.body;

    if (!album) {
        res.status(400).send('Album id must be in request!');
    }

    if (!mongoose.isValidObjectId(album)) {
        res.status(400).send('Invalid album id!');
    }

    try {
        const existAlbum = await Album.findById(album);
        if (!existAlbum) {
            res.status(404).send('Album not found!');
        }

        const newTrack = new Track({
            title,
            album,
            duration,
            isPublished
        });

        await newTrack.save();
        res.send(newTrack);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            const ValidationError = Object.keys(e.errors).map(key => ({
                field: key,
                message: e.errors[key].message,
            }));
            res.status(400).send({ error: ValidationError });
        }
        next(e);
    }
});

tracksRouter.delete("/:id", auth, permit('admin'), async (req, res, next) => {
    try {
        const trackId = req.params.id;

        if (!mongoose.isValidObjectId(trackId)) {
            res.status(400).send({ error: 'Invalid track ID' });
            return;
        }

        const track = await Track.findById(trackId);

        if (!track) {
            res.status(404).send({ error: 'Track not found' });
            return;
        }

        await track.deleteOne();
        res.send({ message: 'Track deleted successfully' });
    } catch (e) {
        next(e);
    }
})

export default tracksRouter;
