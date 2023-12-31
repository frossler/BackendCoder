import fs from 'fs';

export default class ProductDaoFS {
    constructor(filePath) {
        this.path = filePath;
    };
    //    Methods
    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productsJSON);
            } else {
                return [];
            }
        } catch (error) {
            console.error(error);
        }
    };
    async getProductsByLimit(limit){
        try {
            const products = await this.getAll();
            console.log(products);
            if(!limit || limit >= products.length) return products;
            else return products.slice(0, limit);
        } catch (error) {
            console.log(error);
        }
    };
    async isProductCodeUnique(code) {
        try {
            const products = await this.getAll();
            const foundProduct = products.find(product => product.code === code);

            if (foundProduct) {
                console.error(`ERROR: Product with code '${code}' already exists`);
                return false;
            }

            return true;
        } catch (error) {
            console.error('ERROR: Failed to check if product code is unique:', error);
            return false;
        }
    };
    async create(product) {
        try {
            const mandatoryKeys = ['title', 'description', 'code', 'price', 'status', 'stock', 'category'];
            const missingKeys = mandatoryKeys.filter((key) => !product.hasOwnProperty(key));
    
            if (missingKeys.length > 0) {
                console.error('ERROR: Product is missing mandatory keys:', missingKeys);
                return false;
            }
    
            const isUnique = await this.isProductCodeUnique(product.code); // Check if product code is unique
    
            if (!isUnique) {
                console.error('ERROR: Product code is not unique');
                return false;
            }
    
            const products = await this.getAll();
    
            const lastProduct = products[products.length - 1];
            const newId = lastProduct ? lastProduct.id + 1 : 1;
            product.id = newId;
            products.push(product);
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log('SUCCESS: Product added and persisted successfully');
            return true;
        } catch (error) {
            console.error('ERROR: Failed to add the product:', error);
            return false;
        }
    };
    async getById(id) {
        const products = await this.getAll();
        const product = products.find((p) => p.id === id);
        if (product) {
            console.log(`SUCCESS: Product Matching >>> ID: ${id}\n`, product);
            return product;
        } else {
            console.error(`ERROR: Can't find Product with ID: ${id}`);
            return null;
        }
    };
    async update(id, updatedProduct) {
        // console.log(id)
        // console.log(updatedProduct)
        try {
            const products = await this.getAll();
    
            const index = products.findIndex((product) => product.id === id);
            // console.log(index)
    
            if (index === -1) {
                console.error(`ERROR: Product with ID ${id} not found`);
                throw new Error('Product not found');
            }
    
            const updatedProductWithoutId = { ...updatedProduct };
            delete updatedProductWithoutId.id;
            // console.log(updatedProductWithoutId);
    
            const isUnique = await this.isProductCodeUnique(updatedProduct.code);
            // console.log(isUnique)
    
            if (!isUnique) {
                console.error('ERROR: Product code is not unique');
                return false;
            } else {
                updatedProductWithoutId.id = id;
                products[index] = updatedProductWithoutId;
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                console.log("SUCCESS >>> Updated Product >>> "+ updatedProductWithoutId.title);
                return true;
            };

        } catch (error) {
            console.error('ERROR: Failed to update the product: ', error);
            return false;
        }
    };
    async delete(id) {
        try {
            const products = await this.getAll();
    
            const index = products.findIndex((product) => product.id === id);
    
            if (index === -1) {
                console.error(`ERROR: Product with ID ${id} not found`);
                throw new Error('Product not found');
            }
    
            products.splice(index, 1);
    
            await fs.promises.writeFile(this.path, JSON.stringify(products));
    
            console.log(`SUCCESS: Product with ID ${id} deleted`);
            return true;
        } catch (error) {
            console.error('ERROR: Failed to delete the product:', error);
            return false;
        }
    };
}
