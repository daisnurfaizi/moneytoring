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
router.get('/getallproduct',verifyToken,Product.getAllProduct);
router.get('/search',verifyToken,Product.Search);
router.put('/update', verifyToken,Product.updateProduct);
router.put('/updatestatus', verifyToken,Product.UpdateStatus);
module.exports = router;

