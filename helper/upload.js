const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/profilepict')
    },
    filename: function (req, file, cb) {
        // get the file extension
        const ext = file.originalname.split('.').pop();        
        cb(null, Date.now()+'.'+ext)
    }
}
);

const upload = multer({ storage: storage });
module.exports = upload;