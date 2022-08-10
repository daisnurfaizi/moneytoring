const productRepository = require("../repository/productRepository");
const productService = require("../service/productService");
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
}
const Search = async (req, res) => {
    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let getProducts = await productServices.SearchProduct(req,res);
    return getProducts;
}

const UpdateStatus = async (req, res) => {
    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let updateStatus = await productServices.updateStatus(req,res);
    return updateStatus;
}

const updateProduct = async (req, res) => {
    let productRepo = new productRepository();
    let productServices = new productService(productRepo);
    let productupdate = await productServices.updateProduct(req,res);
    return productupdate;
}
module.exports = {
    CreateProduct,
    getAllProduct,
    Search,
    UpdateStatus,
    updateProduct
}