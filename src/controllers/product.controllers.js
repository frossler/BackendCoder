import * as service from "../services/product.services.js"; 

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    };
};
export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const objToFind = await service.getById(id);
        if (!objToFind) res.status(404).json({msg: 'ERROR:> Provided ID not found'});
        else res.status(200).json(objToFind);
    } catch (error) {
        next(error);
    };
};
export const create = async (req, res, next) => {
    try {
        const newObj = req.body;
        const objCreated = await service.create(newObj);
        if (!objCreated) res.status(404).json({msg: 'ERROR:> Was not able to create new registry'}); 
        else res.status(200).json(objCreated);
    } catch (error) {
        next(error);
    };
};
export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.update(id, req.body);
        if (!response) res.status(404).json({msg: 'ERROR:> Was not able to update registry'});
        else res.status(200).json(response);
    } catch (error) {
        next(error);
    };
};
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await service.remove(id);
        if (!deletedProduct) res.status(404).json({msg: 'ERROR:> Provided ID does not match and cannot be removed'});
        else res.status(200).json({msg: 'ID match. Delete successful.'});
    } catch (error) {
        next(error);
    };
};