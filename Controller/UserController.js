const Users = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repository/userRepository');
const responseJson = require('../helper/responseJsonHelper');
const getUser = async(req,res)=>{
    try{
        let UserRepository = new userRepository();
        let user = await UserRepository.getUserByUsername(req.username);
        return res.status(200).json(responseJson(201, 'User Found',user));
    } catch(err){
        return res.json({message:err});
    }
}

 const Login = async(req,res)=>{
    // console.log(req.body);
    // res.status(401).json({message:'Invalid Credentials'});    
    try{
        let UserRepository = new userRepository();
        let user = await UserRepository.getUserByUsername(req.body.username);
        // console.log(user);
        // res.status(401).json(user[0].username);
        const match = await bcrypt.compare(req.body.password,user[0].password);
        if(!match){
            return res.status(401).json({message:'Invalid Credentials'});
        }
        const userID= user[0].id;
        const username = user[0].username;
        const name = user[0].name;
        const email = user[0].email;
        const image = user[0].image;
        const accessToken = jwt.sign({userID,name,username,email,image},process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:'1h'
        });
        // console.log(accessToken);
        const refreshToken = jwt.sign({userID,name,username,email,image},process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:'1d'
        });
        await UserRepository.updateRefreshToken(refreshToken,userID);
        let data = {
            accessToken:accessToken,
            refreshToken:refreshToken
        }
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.status(200).json(responseJson(201, 'User Found',data));
    }catch(exception){
        return res.json({message:exception});
    }
}

const Logout = async(req,res)=>{
    // const refreshToken = req.cookies.refreshToken;
    
    const UserRepository = new userRepository();
    const user = await UserRepository.getUserByUsername(req.username);
    
    if(!user){
        return res.sendStatus(204).json({message:'User not found'});
    }
    await UserRepository.deleteRefreshToken(user[0].id);
    res.clearCookie('refreshToken');
    return res.sendStatus(200).json({message:'Logout Successfully'});
}

module.exports = {
    getUser,
    Login,
    Logout
}