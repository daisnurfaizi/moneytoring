const Transaction = require('../models');
class transactionService{
    constructor(transactionRepository){
        this.transactionRepository = transactionRepository;
    }

    async createTransaction(req,res){
        const transactionDataBody = {
            user_id: req.body.userId,
            product_id: req.body.productId,
            quantity: req.body.quantity,
            total_price: req.body.totalPrice,
            status: req.body.status,
        }
        const transaction = await this.transactionRepository.createTransaction(transactionDataBody);
        if(transaction){
            return res.status(200).json(transaction);
        }
        return res.status(500).json({message: "Failed to create transaction"});
    }

    async createTransactionDetail(req,res){
        req.body.forEach(async(element) => {
            const transactionDetailDataBody = {
                transaction_id: element.transaction_id,
                product_id: element.product_id,
                quantity: element.quantity,
                total_price: element.total_price,
                status: element.status,
            }
            let transaction = Transaction.sequelize.transaction();
            try{
                const insert = await this.transactionRepository.createTransactionDetail(transactionDetailDataBody,transaction);
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        message: err.message
                    });
                }
                await transaction.commit();
                return res.status(200).json(responseJson('success', 'Create Transaction Detail Success..'));      
            }catch(err){
                await transaction.rollback();
                return res.status(500).json({
                    message: err.message
                });
            }
        });
    }       
}