import { connect } from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/coderhouse";
const MONGO_ATLAS_URL = "mongodb+srv://dbroot:admin@cluster0.4rndajy.mongodb.net/coderhouse?retryWrites=true&w=majority"

// export const initMongoDB = async () => {
    try {
        await connect(MONGO_URL);
        console.log("OK >>> Connected to MongoDB");
    } catch (error) {
        console.log(error);
    };
// };