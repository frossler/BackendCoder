import { initMongoDB } from "./dbconnect.js";
import { UserModel } from "./dbschema.js";

const createUser = async (user) => {
    await UserModel.create(user);
};
const test = async (user) => {
    try {
        await initMongoDB();

        const newUser = {
            firstname: "Zinedine",
            lastname: "Franchescoli",
            age: 54,
        };
        await createUser(newUser);
        console.log('User Created');
        
    } catch (error) {
        console.error(error);
    };
};

test();