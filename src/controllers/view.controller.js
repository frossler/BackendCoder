import * as service from "../services/product.services.js";
import * as chatService from "../services/chat.services.js";

export const renderHome = async (req, res, next) => {
    try {
        const products = await service.getAll();
        // // FS
        // res.render("home", { products });
        // // MONGO
        const productsMongo = products.map((product) =>
            Object.assign({}, product.toJSON())
        );
        res.render("home", { products: productsMongo });
    } catch (error) {
        next(error.message);
    }
};

export const renderRealTimeProducts = async (req, res, next) => {
    try {
        const products = await service.getAll();
        const productsMongo = products.map((product) =>
        Object.assign({}, product.toJSON())
        );
        res.render("realtimeproducts", { products: productsMongo });
        // console.log(products);
        
    } catch (error) {
        next(error.message);
    }
};

export const renderChat = async (req, res, next) => {
    try {
        const messages = await chatService.getMessages();
        res.render("chat", { messages });
    } catch (error) {
        next(error.message);
    }
};