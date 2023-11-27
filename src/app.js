import express from 'express';
import morgan from 'morgan';
import handlebars from "express-handlebars";

import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/carts.router.js';
import chatRouter from './routes/chat.router.js';
import viewRouter from './routes/view.router.js';

import  __dirname  from './utils.js';
import { Server } from 'socket.io';
import { initMongoDB } from './daos/mongodb/dbconnection.js';
import { errorHandler } from './middlewares/errorHandler.js';

import * as productServices from "./services/product.services.js";
import * as chatServices from "./services/chat.services.js";
////////////////////////////////////////////////////////////////////////

// Express
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));

// Routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/chats', chatRouter);
app.use('/', viewRouter);
// HBS
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middlwares
app.use(errorHandler);

// Server Instance
const httpServer = app.listen(PORT, () => console.log(` >>> Server Running 🚀 on port # ${PORT}`));

// Persistence
const persistence = "MONGO";
if (persistence === "MONGO") await initMongoDB();

// Websocket
export const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    console.log(`🟢 New User Connected ${socket.id}`);
    socket.on("disconnect", () => {
        console.log("🔴 User Disconnected");
    });

    // REAL TIME PRODUCTS
    socketServer.emit("arrayProducts", await productServices.getAll());
    socket.on("newProduct", async (product) => {
        try {
            const newProduct = await productServices.create(product);
            socketServer.emit("productAdded", newProduct);

            const products = await productServices.getAll();
            socketServer.emit("arrayProducts", products);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    });

    // CHAT
    socketServer.emit("messages", await chatServices.getMessages());
    socket.on("newUser", (user) => {
        console.log(`🔰 ${user} has logged in`);
    });
    socket.on("chat:message", async (msg) => {
        await chatServices.createMessage(msg);
        socketServer.emit("messages", await chatServices.getMessages());
    });
    socket.on("newUser", (user) => {
        socket.broadcast.emit("newUser", user);
    });
    socket.on("chat:typing", (user) => {
        socket.broadcast.emit("chat:typing", user);
    });
});