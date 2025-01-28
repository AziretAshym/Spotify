import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    image: {
        type: String,
        default: null,
    },
    info: {
        type: String,
        default: null,
    },
    isPublished: {
        type: Boolean,
        default: false,
        required: true,
    }
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;