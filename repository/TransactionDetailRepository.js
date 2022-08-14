class TransactionDetails{
    constructor(){
        this.db = require('../models');
    }

    async createTransactionDetail(transactionDetail){
        const create = await this.db.TransactionDetails.create({
            transactionId: transactionDetail.transactionId,
            productId: transactionDetail.productId,
            buyingPrice: transactionDetail.buyingPrice,
            sellingPrice: transactionDetail.sellingPrice,
            quantity: transactionDetail.quantity,
    },{
        fields: [
                'transactionId',
                'productId',
                'buyingPrice',
                'sellingPrice',
                'quantity']
    });
    return create;
    }
}
module.exports = TransactionDetails;