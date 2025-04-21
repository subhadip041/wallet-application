const express = require('express')
const router = express.Router();
const { signupTypecheck } = require('../../types/type')
const { userInfo, account } = require('../../db/db')
const bcrypt = require('bcryptjs')

router.post('/',async (req,res)=>{
try {

    const signUpPayload = req.body;
    const payloadCheck = signupTypecheck.safeParse(signUpPayload)
    if(!payloadCheck.success){
       return res.status(400).json({msg:"Bad Request"})
    }

    const userExistance =  await userInfo.findOne({username:signUpPayload.username})
    if(userExistance){
        return res.status(409).json({msg:"Conflict"})
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(signUpPayload.password, salt); 

   const newUser = await userInfo.create({
    username: signUpPayload.username,
    password: hashPassword,
    firstname: signUpPayload.firstname,
    lastname:signUpPayload.lastname

})

await account.create({
    userId: newUser._id,
    balance: Math.floor(Math.random() * 10000)
  })
  
return res.status(201).json({msg:"Created"})

    
} catch (error) {
    
return res.status(500).json({ msg: "Internal server error" });
    
}
    

})

module.exports = router