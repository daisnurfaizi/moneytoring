var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/VerifyToken');
const Transaction = require('../Controller/TransactionController');
router.post('/transaction', verifyToken,Transaction.createNewTransaction);
module.exports = router;