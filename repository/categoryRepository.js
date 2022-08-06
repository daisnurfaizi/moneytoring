class categoryRepository{
    constructor(){
        this.db = require('../models');
    }

    async createNewCategory(category){
        const create = await this.db.Categories.create({
            user_id: category.user_id,
            category_name: category.category_name,
            icon: category.icon,
        },{
            fields: ['user_id','category_name','icon']
        });
        return create;
    }
    async updateCategory(category){
        const update = await this.db.Categories.update({
            category_name: category.category_name,
            icon: category.icon,
        },{
            where: {
                id: category.id,   
            },
        }
        );
        return update;
    }
    async deleteCategory(id){
        const deleteCategory = await this.db.Categories.destroy({
            where: {
                id: id
            }
        });
        return deleteCategory;
    }
    async getCategorybyname(name,user_id){
        // return [name,user_id];
        // return await this.db.query('SELECT a.category_name,a.icon FROM categories a inner join users b on b.id=a.user_id WHERE a.category_name = like "%'+name+'%" AND b.user_id = "'+user_id+'"');
        const categories = await this.db.sequelize.query('SELECT a.* FROM Categories a inner join Users b on b.id=a.user_id WHERE  b.id =:id AND a.category_name like :name',{ 
            replacements: { id: user_id, name: '%'+name+'%' },
            type: this.db.sequelize.QueryTypes.SELECT
        });
        // array 2 dimensi to 1 dimensi

        return categories;

    }

    async getCategorybyuser(user_id){
        const categories = await this.db.sequelize.query('SELECT a.* FROM Categories a inner join Users b on b.id=a.user_id WHERE  b.id =:id',{ 
            replacements: { id: user_id },
            type: this.db.sequelize.QueryTypes.SELECT
        });
        // array 2 dimensi to 1 dimensi

        return categories;

    }

    async DeleteCategory(id){
        const deleteCategory = await this.db.Categories.destroy({
            where: {
                id: id
            }
        });
        return deleteCategory;
    }
}

module.exports = categoryRepository;