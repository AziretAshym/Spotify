import mongoose, {Model} from "mongoose";
import {UserFields} from "../types";
import bcrypt from "bcrypt";

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
}

type UserModel = Model<UserFields, {}, UserMethods>

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<UserFields, UserModel, UserMethods>({
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

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
}

UserSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model("User", UserSchema);

export default User;