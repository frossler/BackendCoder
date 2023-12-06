import { ProductsModel } from "./models/product.model.js";
import { CartModel } from "./models/cart.model.js";

export default class ProductDaoMongoDB {

    // // AGGR PIPELINEs 
    async aggregationCategory(category) {
        try {
            return await ProductsModel.aggregate([
                // Stage 1
                {
                    $match: { category: category },
                },
                // Stage 2
                {
                    $sort: {
                        price: 1,
                    },
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    async aggregationPrice(sort) {
        try {
            let sortOrder = sort === "asc" ? 1 : -1;

            return await ProductsModel.aggregate([
                {
                    $sort: {
                        price: sortOrder,
                    },
                },
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    // // QUERYs
    async getProductByCategory(category) {
        try {
            const response = await ProductsModel.find({ category: category });
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    // // ADD TO CART
    async addProductToCart(cartId, productId) {
        try {
            const cart = await CartModel.findById(cartId);
            const existingProduct = await CartModel.findOne({
                _id: cartId,
                "products.product": productId,
            });

            if (existingProduct) {
                const response = await CartModel.findOneAndUpdate(
                    {
                        _id: cartId,
                        "products.product": productId,
                    },
                    {
                        $inc: {
                            "products.$.quantity": 1,
                        },
                    },
                    { new: true }
                );
                return response;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
        }
    };


    // // CRUD
    async getAll(page = 1, limit = 10) {
        try {
            const response = await ProductsModel.paginate({}, {page, limit}); // You can filter in the 1st one, in this case I get them all. 
            return response;
        } catch (error) {
            console.error(error);
            throw new Error('Error getAll');
        };
    };
    async getAllView() {
              try {
                const products = await ProductsModel.find({});
                return products;
            } catch (error) {
                console.error(error);
                throw new Error('Error getAllView');
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
