const jwt = require('jsonwebtoken');

const verifyToken = async(req,res,next)=>{

    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    // if(token == null) return res.sendStatus(401);
    // // console.log(token);
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    //     if(err) return res.sendStatus(403);
    //     req.username = decoded.username;
    //     next();
    // })
    // console.log(req.headers);
    // const authHeader = req.headers["authorization"];
    
    // verify the token
    const token = req.headers['authorization'];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.username = decoded.username;
        next();
    })
        
    
    
        // return res.status(403).json({message:'Access Denied'});
    
}
module.exports = verifyToken;