import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongoDB();

// File Enrties Import MISC
import fs from "fs";
import __dirname from "../utils.js";

const entriesFile = JSON.parse(fs.readFileSync(__dirname + "/daos/filesystem/data/entries.json", "utf8"));
export const createFileEntries = async () => {
    try {
        const newEnrtry = await productDao.create(entriesFile);
        if (!newEnrtry) return false;
        return { message: "File processed successfully"};
    } catch (error) {
        console.error(error);
    }
};

// // PIPELINEs
export const aggregationCategory = async (category) => {
    try {
        return await productDao.aggregationCategory(category);
    } catch (error) {
        console.log(error);
    }
};

export const aggregationPrice = async (sort) => {
    try {
        return await productDao.aggregationPrice(sort);
    } catch (error) {
        console.log(error);
    }
};

// // QUERYS
export const getProductByCategory = async (category) => {
    try {
        return await productDao.getProductByCategory(category);
    } catch (error) {
        console.log(error);
    }
};

// // ADD TO CART
export const addProductToCart = async (cartId, productId) => {
    try {
        const exists = await productDao.getProductsById(productId);
        const newProduct = await productDao.addProductToCart(cartId, productId);
        if (!exists) throw new Error("Product not found");
        return newProduct;
    } catch (error) {
        console.log(error);
    }
};

// // CRUD
export const getAll = async (page, limit) => {
    try {
        return await productDao.getAll(page, limit);
    } catch (error) {
        console.error(error);
    };
};
export const getAllView = async () => {
    try {
        return await productDao.getAllView();
    } catch (error) {
        console.error(error);
    };
};

export const getById = async (id) => {
    try {
        const product = await productDao.getById(id);
        if (!product) return null;
        else return product;
    } catch (error) {
        console.error(error);
    };
};
export const getByLimit = async (limit) => {
    try {
        const products = await productDao.getByLimit(limit);
        return products;
    } catch (error) {
        console.log(error);
        throw new Error('Error retrieving products by limit');
  }
};
export const create = async (obj) => {
    try {
        const newProduct = await productDao.create(obj);
        if (!newProduct) return null;
        else return newProduct;
    } catch (error) {
        console.error(error);
    };
};
export const update = async (id, obj) => {
    try {
        const updatedProduct = await productDao.update(id, obj);
        if (!updatedProduct) return null;
        else return updatedProduct;
    } catch (error) {
        console.error(error);
    };
};
export const remove = async (id) => {
    try {
        const toDeleteProduct = await productDao.delete(id);
        if (!toDeleteProduct) return null;
        else return toDeleteProduct;
    } catch (error) {
        console.error(error);       
    };
};