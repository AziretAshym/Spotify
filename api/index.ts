import express from 'express';
import * as mongoose from "mongoose";
import MongoDb from "./mongoDb";
import artistsRouter from "./routes/artists";
import albumsRouter from "./routes/albums";
import tracksRouter from "./routes/tracks";
import usersRouter from "./routes/users";
import tracksHistoryRouter from "./routes/tracksHistory";
import cors from "cors";



const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());
app.use(express.static('public'));


app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/users', usersRouter);
app.use('/track_history', tracksHistoryRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/spotify');
    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
    process.on('exit', () => {
        MongoDb.disconnect();
    })

};

run().catch((e) => console.error(e));
