const Transaction = require('../models');
const responseJson = require('../helper/responseJsonHelper');
// const Product = require('../service/productService');
class transactionService{
    constructor(transactionRepository){
        this.transactionRepository = transactionRepository;
    }

    async createTransaction(req,res){
        console.log(req.body);
        const transactionDataBody = {
            id: "TRS"+Math.floor(+new Date() / 1000),
            user_id: req.body.user_id,
            buyer_name: req.body.buyer_name,
            date: req.body.date,
            // product_id: req.body.productId,
            fee: req.body.fee,
            quantity: req.body.quantity,
            discount: req.body.discount,
            total_price: req.body.total_price,
            // status: req.body.status,
            products: req.body.products,
        }

        let transaction = await Transaction.sequelize.transaction();
        try{
            const transactionData = await this.transactionRepository.createNewTransaction(transactionDataBody, transaction);
            // let products = transactionDataBody.products;
            // products.forEach(async(element) => {
            //     const transactionDetailDataBody = {
            //         id: "TRD"+Math.floor(+new Date() / 1000),
            //         transaction_id: transactionData.id,
            //         product_id: element.product_id,
            //         quantity: element.quantity,
            //         price: element.price,
            //         discount: element.discount,
            //         total_price: element.total_price,
            //     }
            //     const transactionDetailData = await this.transactionRepository.createTransactionDetail(transactionDetailDataBody, transaction);
            //     if(err){
            //         throw err;
            //     }
            // });
            // const reduceProduct = await Product.reduceProduct(req,res,req.body.productId, req.body.quantity);
            await transaction.commit();
            return res.status(200).json(responseJson.response('success', "Success Create Transaction"));
        }
        catch(err){
            await transaction.rollback();
            return res.status(500).json(responseJson.responseFail(500, err,));
        }
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

module.exports = transactionService;