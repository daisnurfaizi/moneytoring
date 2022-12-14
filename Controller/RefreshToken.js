const Users = require('../models/Users');
const jwt = require("jsonwebtoken");

const refreshToken = async(req,res)=>{
    try{
        const refreshToken = req.cookies.refreshToken;
        // const authToken = req.headers.authorization;
        if(!refreshToken) return res.sedStatus(401);
        const user = await Users.findAll({
            where:{
                refreshToken:refreshToken
            }
        });
        if(!user) return res.sendStatus(403);
        const userID = user[0].id;
        const name = user[0].name;
        const username = user[0].username;
        const email = user[0].email;
        const image = user[0].image;
        const accessToken = jwt.sign({userID,name,username,email,image},process.env.ACCESS_TOKEN_SECRET,
        );
        res.cookie('accessToken',accessToken,{httpOnly:true});
       return res.json({accessToken});
    }
    catch(err){
        return res.json({message:err});
    }
}

module.exports = refreshToken;