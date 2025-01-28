import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistsRouter.get('/:id', async (req, res, next) => {
    try {
        const artistId = req.params.id;
        const artist = await Artist.findById(artistId);

        if (!artist) {
            res.status(404).send({ error: "Artist not found" });
            return;
        }

        res.send(artist);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
    try {
        const { name, info, isPublished } = req.body;

        const newArtist = {
            name,
            image: req.file ? `images/${req.file.filename}` : null,
            info: info || null,
            isPublished
        };

        const newArtistData = new Artist(newArtist);
        await newArtistData.save();
        res.send(newArtistData);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            const ValidationError = Object.keys(e.errors).map(key => ({
                field: key,
                message: e.errors[key].message
            }));
            res.status(400).send({error: ValidationError});
        }
        next(e);
    }
});

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const artistId = req.params.id;

        if (!mongoose.isValidObjectId(artistId)) {
            res.status(400).send({ error: 'Invalid artist ID' });
            return;
        }

        const artist = await Artist.findById(artistId);

        if (!artist) {
            res.status(404).send({ error: 'Artist not found' });
            return;
        }

        await artist.deleteOne();
        res.send({ message: 'Artist deleted successfully' });
    } catch (e) {
        next(e);
    }
});




export default artistsRouter;