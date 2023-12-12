import { UserModel } from "./models/user.model.js";

export default class UserMongoDB {
async create(user) {
    try {
        return await UserModel.create(user);
    } catch (error) {
        console.error(error);
        throw new Error('Error create');
    };
};
};