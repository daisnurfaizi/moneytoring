const product = require('../repository/productRepository');
const upload = require('../helper/upload');
const Product = require('../models');
const responseJson = require('../helper/responseJsonHelper');


class productService{
    constructor(producRepository){
        this.productRepository = producRepository;
    }
    async getProduct(id){
        let products = await this.productRepository.getProduct(id);
        if(products){
            const productData = {
                id: products.id,
                user_id: products.user_id,
                category_id: products.category_id,
                product_name: products.product_name,
                image: process.env.Host+"/images/profilepict/"+products.image,
                buying_price: products.buying_price,
                selling_price: products.selling_price,
                stock: products.stock,
            }
            return productData;
        }
        return null;
    }
    async getProducts(req,res,next){
        // random array
        let products =  this.productRepository.getProducts();
        const productData = products.map(product => {
            return {
                id: product.id,
                user_id: product.user_id,
                category_id: product.category_id,
                product_name: product.product_name,
                image: process.env.Host+"/images/profilepict/"+product.image,
                buying_price: product.buying_price,
                selling_price: product.selling_price,
                stock: product.stock,
            }
        }
        );
    return res.status(200).json(productData);
}
    async createProduct(req,res,next){
        // console.log(product);
        const uploader = upload.single('image');
        uploader(req, res, async(err)=> {
            
            const image = req.file.filename;
            const productDataBody = {
                user_id: req.body.userId,
                category_id: req.body.category_id,
                product_name: req.body.product_name,
                image: image,
                buying_price: req.body.buying_price,
                selling_price: req.body.selling_price,
                stock: req.body.stock,
            }
            // console.log(productDataBody);
            let transaction = await Product.sequelize.transaction();
            try{
                const create = await this.productRepository.createProduct(productDataBody, transaction);
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        message: err.message
                    });
                }
                await transaction.commit();
                return res.status(200).json(responseJson('success', 'Update Product Hass Success..'));
            } catch(err){
                await transaction.rollback();
                return res.status(500).json({
                    message: err.message
                });
            }
                
            });
            return uploader;
    }
    async updateProduct(req,res,next){
        const uploader = upload.single('image');
        uploader(req, res, async(err)=> {
            const image = req.file.filename;
            const productDataBody = {
                user_id: req.body.userId,
                category_id: req.body.category_id,
                product_name: req.body.product_name,
                image: image,
                buying_price: req.body.buying_price,
                selling_price: req.body.selling_price,
                stock: req.body.stock,
            }
            let transaction = await Product.sequelize.transaction();
            try{
                const update = await this.productRepository.updateProduct(productDataBody,req.params.idProduct, transaction);
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        message: err.message
                    });
                }
                await transaction.commit();
                return res.status(200).json(responseJson('success', 'Update Product Hass Success..'));
            }
            catch(err){
                await transaction.rollback();
                return res.status(500).json({
                    message: err.message
                });
            }
        });
        return uploader;
    }       

    // reduce stock
    async reduceStock(req,res,next,id,stok){
        let transaction = await Product.sequelize.transaction();
        try{
            const reduce = await this.productRepository.reduceStock(id, stok, transaction);
            if(err){
                console.log(err);
                return res.status(500).json({
                    message: err.message
                });
            }
            await transaction.commit();
            return res.status(200).json(reduce);
        }
        catch(err){
            await transaction.rollback();
            return res.status(500).json({
                message: err.message
            });
        }
    }

    getProducts(){
        return this.productRepository.getProduct();
    }

    getAllProductsByUserId(id){
        return this.productRepository.getAllProductsByUserId(id);
    }
}

module.exports = productService;