import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
    },
    yearOfIssue: Number,
    image: {
        type: String,
        default: null,
    },
});

const Album = mongoose.model("Album", AlbumSchema);
export default Album;