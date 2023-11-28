import { ProductsModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    async getAll() {
        try {
            const products = await ProductsModel.find({});
            return products;
        } catch (error) {
            console.error(error);
        };
    };
    async getById(id) {
        try {
            const product = await ProductsModel.findById(id);
            return product;
        } catch (error) {
            console.error(error);
        };
    };
    async getProductsByLimit(limit) {
        try {
            const response = await ProductsModel.find({}).limit(limit);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error('Error retrieving products by limit');
        }
    }
    async create(product) {
        try {
            return await ProductsModel.create(product);
        } catch (error) {
            console.error(error);
        };
    };
    async update(id, product) {
        try {
            return await ProductsModel.findByIdAndUpdate(id, product, { new: true });
        } catch (error) {
            console.error(error);
        };
    };
    async delete(id) { 
        try {
            const response = await ProductsModel.findByIdAndDelete(id);
            return response
        } catch (error) {
            console.error(error);
        };
    };
};
