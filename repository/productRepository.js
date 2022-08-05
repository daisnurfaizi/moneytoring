class productRepository{
    constructor(){
        this.db = require('../models');
    }

    async getProduct(id){
        return await this.db.Products.findOne({
            where: {
                id: id
            },
        });
    }

    async getProducts(){
        // find where
        const product = await this.db.Products.findAll();
        return JSON.stringify(product);
    }

    async createProduct(product){
        // console.log(product);
        const create = await this.db.Products.create({
            user_id: product.user_id,
            category_id: product.category_id,
            product_name: product.product_name,
            image: product.image,
            buying_price: product.buying_price,
            selling_price: product.selling_price,
            stock: product.stock,
        },{
            fields: ['user_id', 'category_id', 'product_name', 'image', 'buying_price', 'selling_price', 'stock']
        });
        return create;
    }

    async updateProduct(product, id){
        const update = await this.db.Products.update({
            user_id: product.user_id,
            category_id: product.category_id,
            product_name: product.product_name,
            image: product.image,
            buying_price: product.buying_price,
            selling_price: product.selling_price,
            stock: product.stock,
        },{
            where: {
                id: id
            }
        });
        return update;
    }

    async reduceStock(id, stock){
        const reduce = await this.db.Products.update({
            stock: stock
        },{
            where: {
                id: id
            }
        });
        return reduce;
    }

    // find product by id
    async findProductById(id){
        return await this.db.Products.findOne({
            where: {
                id: id
            }
        });
    }

    async deleteProduct(id){
        return await this.db.Products.destroy({
            where: {
                id: id
            }
        });
    }

    async getAllProductByUserId(id){
        return await this.db.Products.findAll({
            where: {
                user_id: id
            }
        });
    }
}

module.exports = productRepository;