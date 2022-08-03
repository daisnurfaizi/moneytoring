const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'Users',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING
            },
            username: {
                type: DataTypes.STRING,
                unique: true
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            password: {
                type: DataTypes.STRING
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
            hooks: {
                beforeCreate(Users) {
                    // hash the password before creating a user
                    Users.password = bcrypt.hashSync(
                        Users.password,
                        bcrypt.genSaltSync(10),
                        null
                    );

                }
            },
            tableName: 'Users',
        },
    );    
    return Users;
}

