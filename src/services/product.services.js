import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
    try {
        return await productDao.getAll();
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

// word delete is reserver and can't be used with foo
export const remove = async () => {
    try {
        const toDeleteProduct = await productDao.delete(id, obj);
        if (!toDeleteProduct) return null;
        else return toDeleteProduct;
    } catch (error) {
        
    };
};