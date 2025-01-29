import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artist";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
    const artistIdQuery = req.query.artist_id;

    try {
        const filter = artistIdQuery ? { artist: artistIdQuery } : {};
        const albums = await Album.find(filter).sort({ yearOfIssue: -1 });

        const albumsWithTrackCount = await Promise.all(
            albums.map(async (album) => {
                const trackCount = await Track.countDocuments({ album: album._id });
                return { ...album.toObject(), trackCount };
            })
        );

        res.send(albumsWithTrackCount);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post("/", imagesUpload.single('image'), auth, async (req, res, next) => {
    const { title, artist, yearOfIssue, isPublished } = req.body;

    if (!artist) {
        res.status(400).send('Artist id must be in request!');
    }

    if (!mongoose.isValidObjectId(artist)) {
        res.status(400).send('Invalid artist ID!');
    }

    if (yearOfIssue > new Date().getFullYear()) {
        res.status(400).send(`The year you enter (${yearOfIssue}) cannot be greater than the current year (${new Date().getFullYear()})!`);
        return;
    }

    try {
        const existArtist = await Artist.findById(artist);
        if (!existArtist) {
            res.status(404).send('Artist not found!');
        }

        const newAlbum = new Album({
            title,
            artist,
            yearOfIssue,
            isPublished,
            image: req.file ? `images/${req.file.filename}` : null,
        });

        await newAlbum.save();
        res.send(newAlbum);
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

albumsRouter.delete("/:id", auth, permit('admin'), async (req, res, next) => {
    try {
        const albumId = req.params.id;

        if (!mongoose.isValidObjectId(albumId)) {
            res.status(400).send({ error: 'Invalid album ID' });
            return;
        }

        const album = await Album.findById(albumId);

        if (!album) {
            res.status(404).send({ error: 'Album not found' });
            return;
        }

        await album.deleteOne();
        res.send({ message: 'Album deleted successfully' });
    } catch (e) {
        next(e);
    }
});

albumsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res, next) => {
    const albumId = req.params.id;
    try {

        if (!mongoose.isValidObjectId(albumId)) {
            res.status(400).send({ error: 'Invalid album ID' });
            return;
        }

        const album = await Album.findById(albumId);

        if (!album) {
            res.status(404).send({ error: 'Album not found' });
            return;
        }

        album.isPublished = !album.isPublished;
        await album.save();

        res.send({ message: 'Album publication status updated'});
    } catch (e) {
        next(e);
    }
})

export default albumsRouter;