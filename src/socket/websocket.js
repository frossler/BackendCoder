import { Server } from 'socket.io';
import * as productServices from "../services/product.services.js";
import * as chatServices from "../services/chat.services.js";
// Websocket

const serverSocketIO = (httpServer) => {

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
        console.log(`🟢 - New User Connected > SID#: ${socket.id}`);
        socketServer.emit("arrayProducts", await productServices.getAllView());
    socket.on("disconnect", () => {
        console.log(`🔴 - User has disconnected > SID#: ${socket.id}`);       
    });
    
    // REAL TIME PROD VIEW AND CREATE GUI // need to add delete as well. 
    socket.on("newProduct", async (product) => {
        try {
            await productServices.create(product);
            socketServer.emit("arrayProducts", await productServices.getAllView());
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
};

export default serverSocketIO;