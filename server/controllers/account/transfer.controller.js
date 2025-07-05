const mongoose = require('mongoose')
// const connectDB = require('../../config/db')
// const db = connectDB()
// const createAccountModel = require('../../models/account.models')
// const Account = createAccountModel(db)
const Account = require('../../models/account.models')

const transferBalance = async (req,res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;
    
    const fromAccount = await Account.findOne({ userId: req.user.id }).session(session);
    if(!fromAccount ||  fromAccount.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account or Insufficient balance"
        });
    }


    const toAccount = await Account.findOne({ userId: to }).session(session)

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }


    await Account.updateOne({ userId: req.user.id }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
}

module.exports = transferBalance