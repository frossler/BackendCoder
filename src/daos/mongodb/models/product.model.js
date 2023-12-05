import { Schema, model } from "mongoose"; 
import mongoosePaginate from "mongoose-paginate-v2";

// "Table"
const productCollectionName = "products";

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    thumbnails: {
        type: Array,
        required: true
    }
});

productSchema.plugin(mongoosePaginate);

export const ProductsModel = model(
    productCollectionName,
    productSchema
);