module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
        'Products',
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
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Categories',
                    key: 'id'
                }
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            buying_price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            selling_price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            status:{
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        },
        {
            tableName: 'Products',
        }
    );    
    return Products;
}