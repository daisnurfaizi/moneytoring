const userRepository = require("../repository/userRepository")
const userService = require("../service/userService")

const ProfileUser= async(req, res) => {
    let userProfileRepository = new userRepository();
    let userProfileServices = new userService(userProfileRepository);
    let userProfile = await userProfileServices.GetProfileUser(req, res);
    return userProfile;
}

const ProfileUpdate = async(req, res) => {
    let userProfileRepository = new userRepository();
    let userProfileServices = new userService(userProfileRepository);
    let userProfile = await userProfileServices.ProfileUpdate(req, res);
    return userProfile;
}
module.exports = {
    ProfileUser,
    ProfileUpdate
}