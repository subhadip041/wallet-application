// const connectDB = require('../../config/db')
// const db = connectDB()
// const createAccountModel = require('../../models/account.models')
// const Account = createAccountModel(db)
const Account = require('../../models/account.models')

const balance = async (req,res)=>{
    try {
   const balanceDetail =   await Account.findOne({userId: req.user.id})
    res.status(200).json({balance: balanceDetail.balance})
} catch (error) {
    return res.status(403).json({});
} 

}

module.exports = balance