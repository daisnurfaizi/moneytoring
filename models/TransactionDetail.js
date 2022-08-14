module.exports = (sequelize, DataTypes) => {
    const TransactionDetails = sequelize.define(
        'TransactionDetails',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
              },
              transactionId: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                  model: 'Transactions',
                  key: 'id'
                }
              },
              productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'Products',
                  key: 'id'
                }
              },
              buyingPrice: {
                type: DataTypes.DOUBLE,
                allowNull: false
              },
              sellingPrice: {
                type: DataTypes.DOUBLE,
                allowNull: false
              },
              quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
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
    });
    return TransactionDetails;
}