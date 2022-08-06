// const product = require('../repository/productRepository');
const upload = require('../helper/upload');
const Product = require('../models');
const responseJson = require('../helper/responseJsonHelper');
const UserRepo = require('../repository/userRepository');


class productService{
    constructor(producRepository){
        this.productRepository = producRepository;
        this.user = new UserRepo();

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
    async createProduct(req,res){
        // console.log(product);
        const uploader = upload.productPict.single('image');
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
    async updateProduct(req,res){
        const uploader = upload.upload.single('image');
        uploader(req, res, async(err)=> {
            const image = req.file.filename;
            const productDataBody = {
                id: req.body.product_id,
                category_id: req.body.category_id,
                product_name: req.body.product_name,
                image: image,
                buying_price: req.body.buying_price,
                selling_price: req.body.selling_price,
                stock: req.body.stock,
            }
            let transaction = await Product.sequelize.transaction();
            try{
                const update = await this.productRepository.updateProduct(productDataBody, transaction);
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

    
   async getAllProductsByUserId(req,res){
        
        let userData = await this.user.getUserByUsername(req.username);
        const data = await this.productRepository.getAllProductByUserId(userData[0].id);
        if(data){
            console.log(data);
            const productData = data.map(product => {
                return {
                    id: product.id,
                    product_name: product.product_name,
                    category_name: product.category_name,
                    image: process.env.Host+"/images/productpict/"+product.image,
                    buying_price: product.buying_price,
                    selling_price: product.selling_price,
                    stock: product.stock,
                }
            }
            );
            return res.status(200).json(responseJson('success', 'Get All Product By User Id Success..', productData));
        }
        
        return res.status(200).json(data);
    }

    async SearchProduct(req,res){
        let userData = await this.user.getUserByUsername(req.username);
        const data = await this.productRepository.SearchProduct(req.query.search, userData[0].id);
        if(data){
            console.log(data);
            const productData = data.map(product => {
                return {
                    id: product.id,
                    product_name: product.product_name,
                    category_name: product.category_name,
                    image: process.env.Host+"/images/productpict/"+product.image,
                    buying_price: product.buying_price,
                    selling_price: product.selling_price,
                    stock: product.stock,
                }
            }
            );
            return res.status(200).json(responseJson('success', 'Get All Product By User Id Success..', productData));
        }
        
        return res.status(200).json(data);
    }
    async updateStatus (req,res){
        let transaction = await Product.sequelize.transaction();
        try{
            let checkstatus = await this.productRepository.checkStatusActive(req.query.product); 
            console.log(checkstatus);
            if(checkstatus){
                await this.productRepository.nonActiveProduct(req.query.product, transaction);
                await transaction.commit();
                return res.status(200).json(responseJson('success', 'Product Non Active Success..'));
            }
            else{
                await this.productRepository.activeProduct(req.query.product, transaction);
                await transaction.commit();
                return res.status(200).json(responseJson('success', 'Product Active Success..'));
            }      
         }
        catch(err){
            await transaction.rollback();
            return res.status(500).json({
                message: err.message
            });
        }
    }
    
}

module.exports = productService;