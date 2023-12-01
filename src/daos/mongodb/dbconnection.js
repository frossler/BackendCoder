import { connect } from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/ecommerce";
const MONGO_ATLAS_URL = "mongodb+srv://dbroot:admin@cluster0.4rndajy.mongodb.net/ecommerce?retryWrites=true&w=majority"

export const initMongoDB = async () => {
    try {
        await connect(MONGO_URL);
        console.log(" >>> Connected ✔💚 OK  to MongoDB");
    } catch (error) {
        console.log(error);
    };
};