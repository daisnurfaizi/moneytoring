const Users = require('../models');
const bcrypt = require('bcrypt');

const userRepository = require('../repository/userRepository');
const userService = require('../service/userService');
const LoginService = require('../service/LoginService');
const getUser = async(req,res)=>{
    try{
        let UserRepository = new userRepository();
        let user = await UserRepository.getUserByUsername(req.username);
        return res.status(200).json(responseJson(201, 'User Found',user));
    } catch(err){
        return res.json({message:err});
    }
}
const Resgister = async(req,res)=>{
    let UserRepository = new userRepository();
    let UserService = new userService(UserRepository);
    let Register = await UserService.Registeruser(req,res);
    return Register;
}

 const Login = async(req,res)=>{
    // return res.status(200).json(req.body);
    let UserRepository = new userRepository();
    let login = new LoginService(UserRepository);
    let loginUser = await login.login(req,res);
    return loginUser;    
    
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
    Resgister,  
    getUser,
    Login,
    Logout
}