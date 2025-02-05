import express from "express";
import mongoose from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";
import {OAuth2Client} from "google-auth-library";
import config from "../config";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post("/google", async (req, res, next) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credentials,
            audience: config.google.clientId,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            res.status(400).send({error: "Invalid credentials. Google login error."});
            return;
        }

        const email = payload.email;
        const id = payload.sub;
        const displayName = payload.name;

        if (!email) {
            res.status(400).send({error: "No enough user data to continue."});
            return;
        }

        let user = await User.findOne({googleId: id});

        if (!user) {
            user = new User({
                username: email,
                password: crypto.randomUUID(),
                googleId: id,
                displayName,
            });
        }
        user.generateToken();
        await user.save();
        res.send({message: "Login successfully.", user});
    } catch (e) {
        next(e);
    }
})

usersRouter.post('/register', async (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    try {
        user.generateToken();
        await user.save();
        res.send({user, message: "User registered successfully"});
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
             res.status(400).send(error);
             return;
        }
        next(error);
    }
});


usersRouter.post('/session', async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: 'User not found'});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Password does not match'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: "Username and password is correct", user});
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

usersRouter.delete('/session', auth, async (req, res, next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;

    try {
        const user = await User.findOne({_id: userFromAuth._id});
        if (user) {
            user.generateToken();
            await user.save();
            res.send({ message: "User logout successfully" });
        }
    } catch (e) {
        next(e);
    }
})

export default usersRouter;