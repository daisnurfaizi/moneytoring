const Categories = require('../models');
const upload = require('../helper/upload');
const UserRepo = require('../repository/userRepository');
const responseJson = require('../helper/responseJsonHelper');

class categoryService{
    constructor(categoryRepository){
        this.categoryRepository = categoryRepository;
        this.user = new UserRepo();
    }
    
    async createCategory(req, res){
        
       let userData = await this.user.getUserByUsername(req.username);
        // console.log(userData[0].id);
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
                user_id: userData[0].id,
                category_name: req.body.category_name,
                icon: image
            };
            
                // transaction
                const transaction = await Categories.sequelize.transaction();
                try{
                    const category = await this.categoryRepository.createNewCategory(data, transaction);
                    await transaction.commit();
                    return res.status(200).json(responseJson(200, 'Success',category));
                }
                catch(err){
                    await transaction.rollback();
                    return res.status(500).json(responseJson(500, err,));
                }
            }
        );
        return uploader;
    }

    async updateCategory(req, res){
        let userData = await this.user.getUserByUsername(req.username);
        
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
                id: req.body.category_id,
                category_name: req.body.category_name,
                icon: image
            };
            const transaction = await Categories.sequelize.transaction();
            try{
                const category = await this.categoryRepository.updateCategory(data, transaction);
                await transaction.commit();
                return res.status(200).json(responseJson(200, 'Success Update',));
            }
            catch(err){
                await transaction.rollback();
                return res.status(500).json(responseJson(500, err,));
            }
        }
        );
        return uploader;
    }

    async seacrhCategory(req, res){
        let userData = await this.user.getUserByUsername(req.username);
        console.log(userData[0].id);
        const categories = await this.categoryRepository.getCategorybyname(req.query.search, userData[0].id);
        // return res.status(200).json(responseJson(200, 'Success',req.query.search));
        
        const dataCategory = categories.map(category => {
            return {
                id: category.id,
                category_name: category.category_name,
                icon: process.env.Host+"/images/categorypict/"+category.icon,
            }
        });
        return res.status(200).json(responseJson(200, 'Success',dataCategory));
        // return res.status(200).json(responseJson(200, 'Success',categories));
    }

    async UserCategory(req, res){
        let userData = await this.user.getUserByUsername(req.username);
        const categories = await this.categoryRepository.getCategorybyuser(userData[0].id);
        const dataCategory = categories.map(category => {
            return {
                id: category.id,
                category_name: category.category_name,
                icon: process.env.Host+"/images/categorypict/"+category.icon,
            }
        });
        return res.status(200).json(responseJson(200, 'Success',dataCategory));
    }

    async deleteCategory(req, res){
        const transaction = await Categories.sequelize.transaction();
        try{
            const category = await this.categoryRepository.DeleteCategory(req.query.category_id, transaction);
            await transaction.commit();
            return res.status(200).json(responseJson(200, 'Success Delete Category',));
        }
        catch(err){
            await transaction.rollback();
            return res.status(500).json(responseJson(500, err,));
        }
    }
}

module.exports = categoryService;