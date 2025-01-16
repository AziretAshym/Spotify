import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collections were not present');
    }

    const [twoPac, notoriousBig] = await Artist.create(
        {
            name: "2Pac",
            image: "fixtures/2pac.jpg",
            info: "Rap"
        },
        {
            name: "The Notorious B.I.G.",
            image: "fixtures/notorious.jpg",
            info: "Hip-Hop"
        }
    );

    const [All_Eyez_on_Me, Loyal_to_the_Game, Ready_to_Die, Greatest_Hits] = await Album.create(
        {
            title: "All Eyez on Me",
            artist: twoPac._id,
            yearOfIssue: 1996,
            image: ""
        },
        {
            title: "Loyal to the Game",
            artist: twoPac._id,
            yearOfIssue: 2004,
            image: "fixtures/loyal_to_the_game.jpg"
        },
        {
            title: "Ready to Die",
            artist: notoriousBig._id,
            yearOfIssue: 1994,
            image: "fixtures/readytodie.jpeg",
        },
        {
            title: "Greatest Hits",
            artist: notoriousBig._id,
            yearOfIssue: 2007,
            image: ""
        },
    );



    await Track.create(
        {
            title: "Soldier Like Me (Return of the Soulja)",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 1
        },
        {
            title: "The Uppercut",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 2
        },
        {
            title: "Out on Bail",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 3
        },
        {
            title: "Black Cotton",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 4
        },
        {
            title: "Loyal to the Game",
            album: Loyal_to_the_Game._id,
            duration: "99:99",
            number: 5
        },

        {
            title: "Picture Me Rollin",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 1
        },
        {
            title: "Can’t C Me",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 2
        },
        {
            title: "No More Pain",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 3
        },
        {
            title: "Only God Can Judge Me",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 4
        },
        {
            title: "All Eyez on Me",
            album: All_Eyez_on_Me._id,
            duration: "99:99",
            number: 5
        },

        {
            title: "Gimme The Loot",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 1
        },
        {
            title: "Warning",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 2
        },
        {
            title: "Ready To Die",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 3
        },
        {
            title: "The What",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 4
        },
        {
            title: "Respect",
            album: Ready_to_Die._id,
            duration: "99:99",
            number: 5
        },

        {
            title: "Juicy",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 1
        },
        {
            title: "Big Poppa",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 2
        },
        {
            title: "Warning",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 3
        },
        {
            title: "Unbelievable",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 4
        },
        {
            title: "Niggas Bleed",
            album: Greatest_Hits._id,
            duration: "99:99",
            number: 5
        },
    );
    await mongoose.disconnect();
};

run().catch(console.error);
