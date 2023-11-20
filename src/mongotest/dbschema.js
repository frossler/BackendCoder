import { Schema , model } from "mongoose";

const userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    age: { type: Number, required: true },
});

export const UserModel = model('users', userSchema);


