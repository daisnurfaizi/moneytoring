const Transaction = require('../models');
const TransactionDetails = require('../models');
const TransactionDetailRepository = require('../repository/TransactionDetailRepository');
const responseJson = require('../helper/responseJsonHelper');
const Product = require('../service/productService');
const ProductRepository = require('../repository/productRepository');
class transactionService{
    constructor(transactionRepository){
        // super();
        this.transactionRepository = transactionRepository;
        this.DetailTransaction = new TransactionDetailRepository();
        this.productRepository = new ProductRepository();
        this.productService = new Product(this.productRepository);
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
            let products = transactionDataBody.products;
            products.forEach(async(element) => {
                const transactionDetailDataBody = {
                    transactionId: transactionData.id,
                    productId: element.productId,
                    buyingPrice: element.buyingPrice,
                    sellingPrice: element.sellingPrice,
                    quantity: element.quantity,
                }
                const reduceProducts = await this.productService.reduceStock(element.productId, element.quantity, transaction);
                const DetailTransaction = await this.DetailTransaction.createTransactionDetail(transactionDetailDataBody,transaction);
            });
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