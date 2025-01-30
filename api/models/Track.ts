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
    number: Number,
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    }
});

TrackSchema.pre("save", async function (next) {
    const track = this;

    if (track.number) {
        next();
        return;
    }

    try {
        const lastTrack = await mongoose.model("Track").findOne({ album: track.album }).sort({ number: -1 });
        track.number = lastTrack ? lastTrack.number + 1 : 1;
        next();
    } catch (e) {
        next(e as Error);
    }
});

const Track = mongoose.model("Track", TrackSchema);
export default Track;