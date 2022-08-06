
class userRepository {

    constructor() {
        this.db = require('../models');
    }
    async getUser(id) {
        return await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    }

    async getUserByUsername(username) {
        return await this.db.Users.findAll({
            where: {
                username: username,
                
            }
        });
    }

    async updateProfile(userDataBody, res) {
        return await this.db.Users.update({
            name: userDataBody.name,
            email: userDataBody.email,
            password: userDataBody.password,
            image: userDataBody.image,
        }, {
            where: {
                username: userDataBody.username
            }
        });
    }
    async updateRefreshToken(refreshToken, id) {
        return await this.db.Users.update({
            refreshToken: refreshToken
        }, {
            where: {
                id: id
            }
        });
    }

    async deleteRefreshToken(id) {
        return await this.db.Users.update({
            refreshToken: null
        }, {
            where: {
                id: id
            }
        });
    }
    async getUsers() {
        return await this.db.query('SELECT * FROM users');
    }
   async createUser(user) {
            const create = await this.db.Users.create(user);
            return create;
    }
    async updateUser(user) {
        return await this.db.query('UPDATE users SET ? WHERE id = ?', [user, user.id]);
    }
    async deleteUser(id) {
        return await this.db.query('DELETE FROM users WHERE id = ?', [id]);
    }

}
module.exports = userRepository;