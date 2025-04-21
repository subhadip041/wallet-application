const express = require('express')
const router = express.Router();
const { authMiddleware } = require('../../middleware/authmiddleware')
const { updateTypecheck } = require('../../types/type')
const { userInfo } = require('../../db/db')
const bcrypt = require('bcryptjs')


router.put('/',authMiddleware,async (req,res)=>{
     

    try {
        const updatePayload = req.body;
     const updatepayloadCheck = updateTypecheck.safeParse(updatePayload)

     if(!updatepayloadCheck.success){
        return res.status(400).json({msg:"Bad Request"})
     }
    await userInfo.findOneAndUpdate({_id:req.userId},{firstname: req.body.firstname, lastname: req.body.lastname})


    res.status(200).json({
        message: "Updated successfully"
    })
        
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
})
module.exports = router