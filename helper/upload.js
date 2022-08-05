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

const uploadProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/productpict')
    },
    filename: function (req, file, cb) {
        // get the file extension
        const ext = file.originalname.split('.').pop();
        cb(null, Date.now()+'.'+ext)

    }
});

const uploadCategory = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/categorypict')
    },filename: function (req, file, cb) {
        // get the file extension
        const ext = file.originalname.split('.').pop();
        cb(null, Date.now()+'.'+ext)

    }
});

const upload = multer({ storage: storage });
const productPict = multer({ storage: uploadProduct });
const categoryPict = multer({ storage: uploadCategory });
module.exports = {
    upload,
    productPict,
    categoryPict
}