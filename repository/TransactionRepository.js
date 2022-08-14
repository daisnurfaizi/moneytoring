class transactionRepository {
    constructor(){
        this.db = require('../models');
    }

    async createNewTransaction(transaction){
        const create = await this.db.Transaction.create({
            id: transaction.id,
            user_id: transaction.user_id,
            buyer_name: transaction.buyer_name,
            date: transaction.date,
            fee: transaction.fee,
            quantity: transaction.quantity,
            discount: transaction.discount,
            total_price: transaction.total_price,
        },{
            fields: [
                    'id',
                    'user_id',
                     'buyer_name',
                     'date',
                     'fee',
                     'quantity',
                     'discount',
                     'total_price']
        });
        return create;
    }

    
}

module.exports = transactionRepository;