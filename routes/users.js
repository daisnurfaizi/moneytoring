var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');
const responseJson = require('../helper/responseJsonHelper');
const upload = require('../helper/upload');
const db = require('../models');
const Users = require('../models');
const UserService  = require('../service/userService');
const UserRepository = require('../repository/userRepository');
const UserController = require('../Controller/UserController');
const verifyToken = require('../middleware/VerifyToken');
const refreshToken  = require('../Controller/RefreshToken');




const v = new Validator();


/* GET users listing. */
router.get('/', verifyToken,UserController.getUser);
router.post('/login',UserController.Login);
router.get('/token',refreshToken)
router.delete('/logout',verifyToken,UserController.Logout);

router.get('/test', function(req, res, next) {
  res.send(process.env.Host);
}
);

router.post('/create', async(req, res, next)=> {
  let userRepository = new UserRepository(); 
  let userservice = new UserService(userRepository);
  let createUser = await userservice.createUser(req,res,next);
  return createUser;
//   const schema = {
//     name: 'string',
//     username: 'string|unique:Users',
//     email: 'string|email|optional',
//     password: 'string',
//     image: 'string|optional',
//   };
//   if(schema.image != null){
//     schema.image = 'string|image|max:1000|optional';
//     // upload 
//     const upload = require('../helper/upload');
//     const uploader = upload.single('image');
//     uploader(req, res, async(err)=> {
//       // console.log(req.body);
//       if(err){
//         console.log(err);
//         return res.status(500).json({
//           message: err.message
//         });
//       }
//       const image = req.file.filename;
//       const data = {
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         image: image
//       };
//       const validate = v.validate(data, schema);
//       if(validate){
//         let user = await userservice.createUser(data);
//         return res.status(200).json(user);
//       }else{
//         return res.status(400).json(responseJson(false, 'Validation error', validate));
//       }
//     },
//     );
// }
// else{
//   const data = {
//     name: req.body.name,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//   };
//   const validate = v.validate(data, schema);
//   if(validate){
//     let user = await userservice.createUser(data);
//     if(user){
//       return res.status(200).json(responseJson(true, 'User Successfully Created'));
//     }
//   }else{
//     return res.status(400).json(responseJson(false, 'Validation error', validate));
//   }
// }
}
);
// get user by id
router.get('/:id', async(req, res, next)=> {
  const user = await db.Users.findOne({
    where: {
      id: req.params.id
    }
  });
  if(user){
    const data = {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      Image: 'public/images/profilepict/'+user.image
    }; 
    return res.status(200).json(responseJson(201, 'User Found',data));
  }
  else{
    return res.status(400).json(responseJson(400, 'User Not Found'));
  }
}
);
// update user by id
router.put('/update/:id', async(req, res, next)=> {
  const user = await db.Users.findOne({
    where: {
      id: req.params.id
    }
  });
  const upload = upload;
  const uploader = upload.single('image');
      
  // update image
});
  

module.exports = router;
