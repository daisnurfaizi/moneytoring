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
const ProfileUser = require('../Controller/ProfileController');




const v = new Validator();


/* GET users listing. */
router.get('/', verifyToken,UserController.getUser);
router.post('/login',UserController.Login);
router.get('/token',refreshToken)
router.delete('/logout',verifyToken,UserController.Logout);
router.post('/register',UserController.Resgister);
router.get('/profile',verifyToken,ProfileUser.ProfileUser)
router.post('/profileupdate',verifyToken,ProfileUser.ProfileUpdate)

router.get('/test', function(req, res, next) {
  res.send(process.env.Host);
});
module.exports = router;
