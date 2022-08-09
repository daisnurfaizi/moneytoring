const User = require('../models');
const upload = require('../helper/upload');
const responseJson = require('../helper/responseJsonHelper');
const bcrypt = require('bcrypt');
const Joi = require('joi');
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

    async GetProfileUser(req,res) {
        // return res.status(200).json(responseJson('success', 'User Successfully Created', req.username));
        let data =  await this.userRepository.getUserByUsername(req.username);
        if(data){
            const profileData = data.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    image: process.env.Host+"/images/profilepict/"+user.image,
                }

            });
            return res.status(200).json(responseJson.response('success', 'User Found', profileData));
        }
        else{
            return res.status(404).json(responseJson.responseFail(404, 'User Not Found'));
        }   
    }

    async ProfileUpdate(req,res) {

        const uploader = upload.upload.single('image');
        uploader(req, res, async(err)=> {
            const schema = Joi.object({
                name: Joi.string().required(),
                // username: Joi.string().required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            });
            const validation = schema.validate(req.body);
            if (validation.error) {
                return res.status(400).json(responseJson.responseFail('error', validation.error.details[0].message, validation.error.details[0].message));
            }
            const image = req.file.filename;
            const userDataBody = {
                name: req.body.name,
                username: req.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10),null),
                image: image,
            }
            
            let transaction = await User.sequelize.transaction();
            try{
                
                let user = await this.userRepository.updateProfile(userDataBody, transaction);
                if(user){
                    await transaction.commit();
                    return res.status(200).json(responseJson.response('success', 'User Successfully Updated'));
                }
                
            }catch(err){
                await transaction.rollback();
                return res.status(500).json(responseJson.responseFail('error', 'Something went wrong', err));
            }
        }
        ); 
        return uploader;
    }            


    async Registeruser(req,res) {

        const uploader = upload.upload.single('image');
        uploader(req, res, async(err)=> {

            const schema = Joi.object({
                name: Joi.string().min(3).max(8).required(),
                username: Joi.string().required(),
                password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            });
            const validation = schema.validate(req.body);
            if (validation.error) {
                return res.status(400).json(responseJson.responseFail('error', validation.error.details[0].message));
            }
            
            const image = req.file.filename;
            const userDataBody = {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                image: image,
            }
            try
            {
                let transaction = await User.sequelize.transaction();
                let user = await this.userRepository.createUser(userDataBody, transaction);
                if(user){
                    return res.status(200).json(responseJson.response('success', 'User Successfully Created'));
                }
                else{
                    return res.status(400).json(responseJson.responseFail('error','User Already Exist'));
                }
            }   
            catch(err)
            {
                return res.status(500).json(responseJson.responseFail('error', 'Something went wrong',err));
            }
        }
        ); 
        return uploader;
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
            try{
                let user = await this.userRepository.createUser(userDataBody, transaction);
                if(user){
                    await transaction.commit();
                    return res.status(200).json(responseJson.response('success', 'User Successfully Created'));
                }
            }catch(err){
                await transaction.rollback();
                return res.status(500).json(responseJson.responseFail('error', 'Something went wrong', err));
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