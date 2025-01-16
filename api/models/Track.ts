import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
        required: true,
    },
    duration: String,
    number: {
        type: Number,
    }
});

TrackSchema.pre("save", async function (next) {
    const track = this;

    if (!track.isNew) {
        return next();
    }

    try {
        const lastTrack = await mongoose.model("Track").findOne({ album: track.album }).sort({ number: -1 });
        track.number = lastTrack ? lastTrack.number + 1 : lastTrack.number;
        next();
    } catch (e) {
        console.error(e);
    }
});

const Track = mongoose.model("Track", TrackSchema);
export default Track;