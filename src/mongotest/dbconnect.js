import { connect } from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/coderhouse";

export const initMongoDB = async ()=> {
    try {
        await connect(MONGO_URL);
        console.log('Mongo DB Connection Established');
    } catch (error) {
        console.log(error);
    };
};

initMongoDB();



