const TransactionRepository = require('../repository/TransactionRepository');
const transactionService = require('../service/transactionService');

const createNewTransaction = async (req, res) => {
    let transactionRepo = new TransactionRepository();
    let transactionServices = new transactionService(transactionRepo);
    let createNewTransaction = await transactionServices.createTransaction(req, res);
    return createNewTransaction;
}

module.exports = {
    createNewTransaction    
}