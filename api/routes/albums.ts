import express from "express";
import mongoose from "mongoose";
import Artist from "../models/Artist";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import Track from "../models/Track";

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

albumsRouter.post("/", imagesUpload.single('image'), async (req, res, next) => {
    const { title, artist, yearOfIssue } = req.body;

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


export default albumsRouter;