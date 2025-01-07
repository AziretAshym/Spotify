import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;