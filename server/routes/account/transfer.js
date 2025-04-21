const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../../middleware/authmiddleware')
const { account } = require('../../db/db')
const mongoose = require('mongoose')
router.get('/',(req,res)=>{
    res.json({msg:"from transfer"})
})


router.post("/", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const fromAccount = await account.findOne({ userId: req.userId }).session(session);

    if (!fromAccount || fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});



module.exports = router