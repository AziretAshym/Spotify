import express from "express";
import mongoose from "mongoose";
import User from "../models/User";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        await user.save();
        res.send(user);
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
            res.status(404).send({error: 'User not found'});
            return;
        }


        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: 'Password does not match'});
            return;
        }
        res.send({message: "Username and password is correct"});
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

export default usersRouter;