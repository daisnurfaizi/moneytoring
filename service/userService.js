const User = require('../models');
class userService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getUser(id) {
        return await this.userRepository.getUser(id);
    }
    async getUsers() {
        return await this.userRepository.getUsers();
    }
    async createUser(user) {
        let transaction = await User.sequelize.transaction();
        try {
            const create = await this.userRepository.createUser(user, transaction);
            await transaction.commit();
            return create;
        }
        catch (err) {
            await transaction.rollback();
            return err;
        }
        // return await this.userRepository.createUser(user);
    }
    async updateUser(user) {
        return await this.userRepository.updateUser(user);
    }
    async deleteUser(id) {
        return await this.userRepository.deleteUser(id);
    }
}
module.exports = userService;