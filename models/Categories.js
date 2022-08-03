module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define(
        'Categories',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
            category_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            icon:{
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'Categories',
        },
    );    
    return Categories;
}