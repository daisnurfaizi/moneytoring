const User = require('../models');
const upload = require('../helper/upload');
const responseJson = require('../helper/responseJsonHelper');
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
    async createUser(req,res,next) {
        const uploader = upload.single('image');
        uploader(req, res, async(err)=> {
            const image = req.file.filename;
            const userDataBody = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                image: image,
            }
            let transaction = await User.sequelize.transaction();
            let user = await this.userRepository.createUser(userDataBody, transaction);
            if(user){
                return res.status(200).json(responseJson('success', 'User Successfully Created'));
            }
            else{
                return res.status(400).json(responseJson('error', 'User Failed to Create'));
            }
        }
        ); 
        return uploader;
    }
    async updateUser(user) {
        return await this.userRepository.updateUser(user);
    }
    async deleteUser(id) {
        return await this.userRepository.deleteUser(id);
    }
}
module.exports = userService;