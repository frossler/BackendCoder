import * as service from "../services/product.services.js";

// Import Entries from JSON file
export const createFileController = async (req, res, next) => {
    try {
        const newEntries = await service.createFileEntries();
        if (!newEntries) throw new Error("ERROR >>> File validation failed");
        else res.status(200).json(newEntries);
    } catch (error) {
        next(error);
    };
};

// // PIPELINEs
export const aggregationCategory = async (req, res, next) => {
    try {
        const { category } = req.query;
        if (category === undefined) {
            const products = await service.getAll();
            return res.json(products);
        } else {
            const response = await service.aggregationCategory(category);
            res.json(response);
        }
    } catch (error) {
        next(error.message);
    }
};
export const aggregationPrice = async (req, res, next) => {
    try {
        const { sort } = req.query;
        if (sort === undefined) {
            const products = await service.getAll();
            return res.json(products);
        } else {
            const response = await service.aggregationPrice(sort);
            res.json(response);
        }
    } catch (error) {
        next(error.message);
    }
};

// // ADD TO CART
export const addProductToCart = async (req, res, next) => {
    try {
        const { cartId, productId } = req.params;
        const newProduct = await service.addProductToCart(cartId, productId);
        console.log(newProduct);
        if (!newProduct)
            res.status(404).json({ msg: "Error adding the product" });
        else res.status(200).json(newProduct);
    } catch (error) {
        next(error.message);
    }
};

// QUERYs
export const getByLimit = async (req, res, next) => {
    try {
        const { limit } = req.query;
        const response = await service.getByLimit(parseInt(limit));
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

// CRUD 
export const getAll = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const response = await service.getAll(page, limit);
        if (!response)
            res.status(404).json({ msg: "Error getting the products" });
        const next = response.hasNextPage
            ? `http://localhost:8080/api/products/all?page=${response.nextPage}`
            : null;
        const prev = response.hasPrevPage
            ? `http://localhost:8080/api/products/all?page=${response.prevPage}`
            : null;
        res.status(200).json({
            payload: response.docs,
            info: {
                count: response.totalDocs,
                totalPages: response.totalPages,
                hasNextPage: response.hasNextPage,
                hasPrevPage: response.hasPrevPage,
                page: response.page,
                nextPage: next,
                prevPage: prev,
            },
        });
    } catch (error) {
        next(error.message);
    }
};
export const getAllView = async (req, res, next) => {
    try {
        const response = await service.getAllView();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    };
};
export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const objToFind = await service.getById(id);
        if (!objToFind) res.status(404).json({msg: 'ERROR >>> Provided ID not found'});
        else res.status(200).json(objToFind);
    } catch (error) {
        next(error);
    };
};
export const create = async (req, res, next) => {
    try {
        const newObj = req.body;
        const objCreated = await service.create(newObj);
        if (!objCreated) res.status(404).json({msg: 'ERROR >>> Was not able to create new registry'}); 
        else res.status(200).json(objCreated);
    } catch (error) {
        next(error);
    };
};
export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.update(id, req.body);
        if (!response) res.status(404).json({msg: 'ERROR >>>  Was not able to update registry'});
        else res.status(200).json(response);
    } catch (error) {
        next(error);
    };
};
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await service.remove(id);
        if (!deletedProduct) res.status(404).json({msg: 'ERROR >>> Provided ID does not match and cannot be removed'});
        else res.status(200).json({msg: `ID match: // ${id} // Delete successful.`});
    } catch (error) {
        next(error);
    };
};