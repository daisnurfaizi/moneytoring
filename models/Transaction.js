module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define(
        'Transaction',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.STRING,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                
            },
            buyer_name:{
                type: DataTypes.STRING,
                allowNull: false
            },
            date: {
                type: DataTypes.STRING,
                allowNull: false,
                
            },
            fee: {
                type: DataTypes.DOUBLE,
                allowNull: false,
                
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            discount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            total_price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
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
            tableName: 'Transaction',
        }
    );    
    return Transaction;
}