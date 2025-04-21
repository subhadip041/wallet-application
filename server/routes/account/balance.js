const express = require('express')
const router = express.Router()
const { account }= require('../../db/db')
const { authMiddleware } = require('../../middleware/authmiddleware')


router.get('/',authMiddleware,async (req,res)=>{
try {
   const accountDetail =   await account.findOne({userId: req.userId})
    res.status(200).json({balance: accountDetail.balance})
} catch (error) {
    return res.status(403).json({});
}

})



module.exports = router