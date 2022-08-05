const productRepository = require("../repository/productRepository");
const productService = require("../service/productService");
const responseJson = require("../helper/responseJsonHelper");

const CreateProduct = async (req, res) => {

    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let createNewProduct = await productServices.createProduct(req,res);
    return createNewProduct;
}

const getAllProduct = async (req, res) => {
    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let getProducts = await productServices.getAllProductsByUserId(req,res);
    return getProducts;

    // return res.status(200).json(responseJson(201,'success',req.query.id));
}

module.exports = {
    CreateProduct,
    getAllProduct
}