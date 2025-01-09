import express from "express";
import mongoose from "mongoose";
import TrackHistory from "../models/TrackHistory";
import User from "../models/User";
import Track from "../models/Track";

const tracksHistoryRouter = express.Router();

tracksHistoryRouter.post('/', async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).send({ error: 'No token provided' });
        return;
    }

    const user = await User.findOne({ token });
    if (!user) {
        res.status(401).send({ error: 'Invalid token' });
        return;
    }

    const { track } = req.body;
    if (!track) {
        res.status(400).send({ error: 'Track ID must be provided' });
        return;
    }

    if (!mongoose.isValidObjectId(track)) {
        res.status(400).send({ error: 'Invalid track ID' });
        return;
    }

    try {
        const trackExists = await Track.findById(track);
        if (!trackExists) {
            res.status(404).send({ error: 'Track not found' });
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track,
            datetime: new Date().toISOString(),
        });

        await trackHistory.save();
        res.status(201).send(trackHistory);
    } catch (error) {
        next(error);
    }
});


export default tracksHistoryRouter;
