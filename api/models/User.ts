import mongoose from "mongoose";
import {UserFields} from "../types";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    console.log(salt);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;
    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model("User", UserSchema);

export default User;