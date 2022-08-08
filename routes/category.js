var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const CategoryController = require('../Controller/CategoryController');

// create category
router.post('/createcategory',verifyToken,CategoryController.CreateNewCategory);
router.get('/seacrhcategory',verifyToken,CategoryController.seacrhCategory);
router.put('/update',verifyToken,CategoryController.updateCategory);
router.get('/',verifyToken,CategoryController.getCategorybyuser);
router.delete('/delete',verifyToken,CategoryController.deleteCategory);


module.exports = router;
