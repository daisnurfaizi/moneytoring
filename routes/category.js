let express = require('express');
let router = express.Router();
const Validator = require('fastest-validator');
const responseJson = require('../helper/responseJsonHelper');
const upload = require('../helper/upload');
const db = require('../models');
const Categories = require('../models');
const validate = new Validator();
// create category

router.post('/create', async(req, res, next)=> {
    const schema = {
        user_id: 'string|required',
        category_name: 'string|required',
        icon: 'string|optional',
    };
    if(schema.icon != null){
        schema.icon = 'string|image|max:10000|optional';
        // upload 
        // const upload = require('../helper/upload');
        const uploader = upload.categoryPict.single('icon');
        uploader(req, res, async(err)=> {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message: err
                });
            }
            const image = req.file.filename;
            const data = {
                user_id: req.body.user_id,
                category_name: req.body.category_name,
                icon: image
            };
            const validation = validate.validate(data, schema);
            console.log(validation);
            if(validation){
                // transaction
                const transaction = await db.sequelize.transaction();
                try{
                    const category = await db.Categories.create(data, {transaction});
                    await transaction.commit();
                    return res.status(200).json(responseJson(200, 'Success',));
                }
                catch(err){
                    await transaction.rollback();
                    return res.status(500).json(responseJson(500, err,));
                }
            }
            else{
                return res.status(400).json(responseJson(400, 'Invalid data',));
            }
        }
        );
    }
});
// get all categories by userId
router.get('/getCategories/:userId', async(req, res, next)=> {
    const userId = req.params.userId;
    // console.log(userId);
    const categories = await db.Categories.findAll({
        where: {
            user_id: userId
        }
    });
    console.log(categories);
    if(categories){
        // transform data categories
        const data = categories.map(category => {
            return {
                // id: category.id,
                // userId: category.user_id,
                category_name: category.category_name,
                icon: 'public/images/profilepict/' + category.icon,
            }
        }
        ); 
        return res.status(200).json(responseJson(200, 'Success', data));
    }
    else{
        return res.status(400).json(responseJson(400, 'No data found',));
    }
    
}
);
// update category by userId and categoryId
router.put('/update/:userId/:categoryId', async(req, res, next)=> {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    const schema = {
        category_name: 'string|required',
        icon: 'string|optional',
    };
    const data = {
        category_name: req.body.category_name,
        icon: req.body.icon,
    };
    const validation = validate.validate(data, schema);
    if(validation){
        const category = await db.Categories.findOne({
            where: {
                id: categoryId,
                user_id: userId
            }
        });
        if(category){
            console.log(category);
            // transaction
            const transaction = await db.sequelize.transaction();
            try{
                await db.Categories.update(data, {
                    where: {
                        id: categoryId,
                        user_id: userId
                    }
                }, {transaction});
                await transaction.commit();
                return res.status(200).json(responseJson(200, 'Success',));
            }
            catch(err){
                await transaction.rollback();
                return res.status(500).json(responseJson(500, err,));
            }
        }
        else{
            return res.status(400).json(responseJson(400, 'No data found',));
        }
    }
    else{
        return res.status(400).json(responseJson(400, 'Invalid data',));
    }
}
);



module.exports = router;
