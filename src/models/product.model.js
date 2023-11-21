import { Schema, model } from "mongoose"; 

const productCollectionName = "product";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

export const ProductsModel = model(
    productCollectionName,
    productSchema
);