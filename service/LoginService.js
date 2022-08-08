const User = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseJson = require('../helper/responseJsonHelper');


class LoginService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    
    async login(req, res) {
        // return res.status(200).json(req.body);
        try{
            let user = await this.userRepository.getUserByUsername(req.body.username);
            // console.log(user);
            const match = await bcrypt.compare(req.body.password,user[0].password);
            
            if(!match){
                return res.status(401).json({message:'Invalid Credentials'});
            }
            const userID= user[0].id;
            const username = user[0].username;
            const name = user[0].name;
            const email = user[0].email;
            const image = user[0].image;
            // return res.status(401).json({
            //     Userid : userID,
            //     username : username,
            //     name : name,
            //     email : email,
            //     image : image
            // });
            const accessToken = jwt.sign({userID,name,username,email,image},process.env.ACCESS_TOKEN_SECRET,);
            
            // console.log(accessToken);
            const refreshToken = jwt.sign({userID,name,username,email,image},process.env.REFRESH_TOKEN_SECRET,);
            // return res.status(200).json({
            //     refreshToken : refreshToken,
            // });
            await this.userRepository.updateRefreshToken(refreshToken,userID);
            
            let data = {
                accessToken:accessToken,
                refreshToken:refreshToken
            }
            // return res.status(200).json(data);
            res.cookie('refreshToken', refreshToken,{
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            return res.status(200).json(responseJson.response(201, 'success',data));
        }catch(exception){
            return res.json({message:exception});
        }
    }

    async checkToken(TokenHeader, Tokenuser) {
        if(TokenHeader === Tokenuser){
            return true;
        }
        return responseJson.responseFail('unauthorized','you are not authorized');
    }
}

module.exports = LoginService;