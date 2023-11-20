import { initMongoDB } from "./dbconnect.js";
import { UserModel } from "./dbschema.js";

const dbquery = async () => {
    try {
        await initMongoDB();
        const query1 = await UserModel.find();
        console.log(query1);
        console.log('--------------------------------');
        const query2 = await UserModel.findOne({firstname: 'John'});
        console.log(query2);
    } catch (error) {
        console.error(error);
    }
};

dbquery();
