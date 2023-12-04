import { ProductsModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    async getAll() {
        try {
            const products = await ProductsModel.find({});
            return products;
        } catch (error) {
            console.error(error);
            throw new Error('Error getAll');
        };
    };
    async getByCategory(cat) {
        try {
            const response = await ProductsModel.find({ category: cat });
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('Error getAByCategory');
        };
    };
    async getById(id) {
        try {
            const product = await ProductsModel.findById(id);
            return product;
        } catch (error) {
            console.error(error);
            throw new Error('Error getById');
        };
    };
    async getByLimit(limit) {
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
            throw new Error('Error create');
        };
    };
    async update(id, product) {
        try {
            return await ProductsModel.findByIdAndUpdate(id, product, { new: true });
        } catch (error) {
            console.error(error);
            throw new Error('Error update');
        };
    };
    async delete(id) { 
        try {
            const response = await ProductsModel.findByIdAndDelete(id);
            return response
        } catch (error) {
            console.error(error);
            throw new Error('Error delete');
        };
    };
};
