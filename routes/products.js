let express = require('express');
let router = express.Router();
const Validator = require('fastest-validator');
const response = require('../helper/responseJsonHelper');
const responseJson = require('../helper/responseJsonHelper');
const url = require('url');
const querystring = require('querystring');
const upload = require('../helper/upload');
const db = require('../models');
const Products = require('../models');
const productRepository = require('../repository/productRepository');
const productService = require('../service/productService');
const verifyToken = require('../middleware/VerifyToken');
const  Product  = require('../Controller/ProductController');
const validate = new Validator();


router.post('/create',verifyToken,Product.CreateProduct);
router.get('/getAllProduct',verifyToken,Product.getAllProduct);
router.put('/update/:idProduct', async(req, res, next)=> {
    // console.log(req.body);
    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let updateProduct = await productServices.updateProduct(req,res,next);
    return updateProduct;
});

router.get('/products', async(req, res, next)=> {
    // console.log(req.body);
    // return res.send("coba");
    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let getProducts = await productServices.getProducts(req,res,next);
    console.log(getProducts);
    return getProducts;
});
router.get('/product/:idProduct', async(req, res, next)=> {
    // console.log(req.body);
    // return res.send("coba");
    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let getProduct = await productServices.getProduct(req.params.idProduct);
    if(getProduct){
        return res.status(200).json(responseJson(201,'success',getProduct));
    }
    return res.status(404).json(responseJson(404,'not found',getProduct));
});
router.get('/products/user/', async(req, res, next)=> {
    
// return res.status(200).json(responseJson('201','success',req.query.userId));

    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let getProduct = await productServices.getAllProductsByUserId(req.query.userId);
    if(getProduct){
        return res.status(200).json(responseJson(201,'success',getProduct));
    }
    return res.status(404).json(responseJson(404,'not found',getProduct));
});
// router.post('/create', async(req, res, next)=> {
//     const schema = {
//         userId: 'required',
//         categoryId: 'required',
//         product_name: 'string|required',
//         image: 'string|optional',
//         buying_price: 'number|required',
//         selling_price: 'number|required',
//     };
//     if(schema.image != null){
//         schema.image = 'string|image|max:10000|optional';
//         // upload 
//         const upload = require('../helper/upload');
//         const uploader = upload.single('image');
//         uploader(req, res, async(err)=> {
//             if(err){
//                 console.log(err);
//                 return res.status(500).json({
//                     message: err
//                 });
//             }
//             const image = req.file.filename;
//             const data = {
//                 user_id: req.body.userId,
//                 category_id: req.body.categoryId,
//                 product_name: req.body.product_name,
//                 image: image,
//                 buying_price: req.body.buying_price,
//                 selling_price: req.body.selling_price,
//                 stock: req.body.stock,
//             };
//             const validation = validate.validate(data, schema);
//             if(validation){
//                 // transaction
//                 const transaction = await db.sequelize.transaction();
//                 try{
//                     const product = await db.Products.create(data, {transaction});
//                     await transaction.commit();
//                     return res.status(200).json(responseJson(200, 'Success',));
//                 }
//                 catch(err){
//                     await transaction.rollback();
//                     return res.status(500).json(responseJson(500, err,));
//                 }
//             }
//             else{
//                 return res.status(400).json(responseJson(400, 'Invalid data',));
//             }
//         }
//         );
//     }
// });
module.exports = router;

