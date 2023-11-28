import { Schema, model } from "mongoose";

export const chatCollection = "messages";

export const chatSchema = new Schema({
    username: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
});

export const ChatModel = model(
    chatCollection, 
    chatSchema
);
