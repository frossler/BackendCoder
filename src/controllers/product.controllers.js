// MongoDB uses

import ProductManager from "../managers/mdb-product.manager.js";

const productManager = new ProductManager();

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productManager.getAll();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    };
};
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productManager.getById(id);
        if (!product) res.json({msg: 'Product not found'});
        res.json(product);
    } catch (error) {
        next(error);
    };
};
export const createProduct = async (req, res, next) => {
    try {
        const product = req.body;
        const createdProduct = await productManager.create(product);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    };
};
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productManager.update(id, req.body);
        if (!updatedProduct) res.json({msg: 'Product not found'});
        res.json(updatedProduct);
    } catch (error) {
        next(error);
    };
};
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productManager.delete(id);
        if (!deletedProduct) res.json({msg: 'Product not found'});
        res.json(deletedProduct);
    } catch (error) {
        next(error);
    };
};