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

    async updateProduct(product){
        const update = await this.db.Products.update({
            category_id: product.category_id,
            product_name: product.product_name,
            image: product.image,
            buying_price: product.buying_price,
            selling_price: product.selling_price,
            stock: product.stock,
        },{
            where: {
                id: product.id,
            }
        });
        return update;
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
        // join with category
        return await this.db.sequelize.query(`
        SELECT a.id,a.product_name,c.category_name,a.image,
        a.buying_price,a.selling_price,a.stock,a.status
        FROM Products a
        INNER JOIN Users b on a.user_id = b.id
        INNER JOIN Categories c on a.category_id = c.id WHERE a.user_id =:id`,{
            replacements: {
                id: id
            },
            type: this.db.sequelize.QueryTypes.SELECT
        });
    }
    
    async SearchProduct(search, id){
        // join with category
        return await this.db.sequelize.query(`
        SELECT a.id,a.product_name,c.category_name,a.image,
        a.buying_price,a.selling_price,a.stock,a.status
        FROM Products a
        INNER JOIN Users b on a.user_id = b.id
        INNER JOIN Categories c on a.category_id = c.id WHERE a.product_name LIKE '%${search}%' OR
        c.category_name LIKE '%${search}%'  OR a.stock LIKE '%${search}%' 
        OR a.buying_price LIKE '%${search}%'  OR a.selling_price LIKE '%${search}%'
         AND a.user_id =:id`,{
            replacements: {
                id: id
            },
            type: this.db.sequelize.QueryTypes.SELECT
        });
    }
    
    async nonActiveProduct(id){
        return await this.db.Products.update({
            status: 0
        },{
            where: {
                id: id
            }
        });
    }

    async activeProduct(id){
        return await this.db.Products.update({
            status: 1
        },{
            where: {
                id: id
            }
        });
    }

    async checkStatusActive(id){
        return await this.db.Products.findOne({
            where: {
                id: id,
                status: 1
            }
        });
    }
    
    async checkStock(id){
        return await this.db.Products.findOne({
            where: {
                id: id,
            }
        });
    }

    async minusStock(id, stock){
        return await this.db.sequelize.query(`
        UPDATE Products SET stock = stock - ${stock} WHERE id = ${id}`,{
            type: this.db.sequelize.QueryTypes.UPDATE
        });
    }

    async plusStock(id, stock){
        return await this.db.sequelize.query(`
        UPDATE Products SET stock = stock + ${stock} WHERE id = ${id}`,{
            type: this.db.sequelize.QueryTypes.UPDATE
        });
    }
}

module.exports = productRepository;