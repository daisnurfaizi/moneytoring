var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const CategoryController = require('../Controller/CategoryController');

// create category
router.post('/createCategory',verifyToken,CategoryController.CreateNewCategory);
router.get('/SeacrhCategory',verifyToken,CategoryController.seacrhCategory);
router.put('/update',verifyToken,CategoryController.updateCategory);
router.get('/',verifyToken,CategoryController.getCategorybyuser);
router.delete('/delete',verifyToken,CategoryController.deleteCategory);


module.exports = router;
