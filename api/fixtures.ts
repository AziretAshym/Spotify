import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";
import User from "./models/User";
import {randomUUID} from "crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collections were not present');
    }

    await User.create(
        {
            username: "test",
            password: "test",
            role: "admin",
            token: randomUUID()
        },
         {
            username: "test1",
            password: "test1",
            role: "user",
            token: randomUUID()
        },
    )

    const [twoPac, notoriousBig] = await Artist.create(
        {
            name: "2Pac",
            image: "fixtures/2pac.jpg",
            info: "Rap",
            isPublished: true
        },
        {
            name: "The Notorious B.I.G.",
            image: "fixtures/notorious.jpg",
            info: "Hip-Hop",
            isPublished: true
        }
    );

    const [All_Eyez_on_Me, Loyal_to_the_Game, Ready_to_Die, Greatest_Hits] = await Album.create(
        {
            title: "All Eyez on Me",
            artist: twoPac._id,
            yearOfIssue: 1996,
            image: "fixtures/all_eyez_on_me.jpg",
            isPublished: true,
        },
        {
            title: "Loyal to the Game",
            artist: twoPac._id,
            yearOfIssue: 2004,
            image: "fixtures/loyal_to_the_game.jpg",
            isPublished: true
        },
        {
            title: "Ready to Die",
            artist: notoriousBig._id,
            yearOfIssue: 1994,
            image: "fixtures/readytodie.jpeg",
            isPublished: true
        },
        {
            title: "Greatest Hits",
            artist: notoriousBig._id,
            yearOfIssue: 2007,
            image: "fixtures/greatest_hits.jpg",
            isPublished: true
        },
    );



    await Track.create(
        {
            title: "Soldier Like Me (Return of the Soulja)",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 1,
            isPublished: true
        },
        {
            title: "The Uppercut",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 2,
            isPublished: true
        },
        {
            title: "Out on Bail",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 3,
            isPublished: true
        },
        {
            title: "Black Cotton",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 4,
            isPublished: true
        },
        {
            title: "Loyal to the Game",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 5,
            isPublished: true
        },

        {
            title: "Picture Me Rollin",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 1,
            isPublished: true
        },
        {
            title: "Can’t C Me",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 2,
            isPublished: true
        },
        {
            title: "No More Pain",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 3,
            isPublished: true
        },
        {
            title: "Only God Can Judge Me",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 4,
            isPublished: true
        },
        {
            title: "All Eyez on Me",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 5,
            isPublished: true
        },

        {
            title: "Gimme The Loot",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 1,
            isPublished: true
        },
        {
            title: "Warning",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 2,
            isPublished: true
        },
        {
            title: "Ready To Die",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 3,
            isPublished: true
        },
        {
            title: "The What",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 4,
            isPublished: true
        },
        {
            title: "Respect",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 5,
            isPublished: true
        },

        {
            title: "Juicy",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 1,
            isPublished: true
        },
        {
            title: "Big Poppa",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 2,
            isPublished: true
        },
        {
            title: "Warning",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 3,
            isPublished: true
        },
        {
            title: "Unbelievable",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 4,
            isPublished: true
        },
        {
            title: "Niggas Bleed",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 5,
            isPublished: true
        },
    );
    await mongoose.disconnect();
};

run().catch(console.error);
