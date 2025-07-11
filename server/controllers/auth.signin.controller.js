const {signupinPayloadCheck } = require('../types/auth.types')
// const createUserModel = require('../models/auth.models')
// const connectDB = require('../config/db')
// const db = connectDB()
// const User = createUserModel(db)
const User = require('../models/auth.models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

const signinPayload = async (req,res)=>{

    const signinLoad = req.body
    const payloadCheck = signupinPayloadCheck.safeParse(signinLoad)

    if(!payloadCheck.success){
        return res.status(400).json({msg:"Bad Request"})
    }
    try {
    const existingUser = await User.findOne({ username: signinLoad.username });
    if (!existingUser) {
      return res.status(409).json({ msg: "User not exists" });       
    }


    const isMatch = await bcrypt.compare(signinLoad.password, existingUser.password);
    
    if(!isMatch){
      return res.status(409).json({ msg: "wrong password" })
    }
    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // res.status(201).json({
    //   msg: "Login successfully",
    //   token: token
    // });


    res.status(201).json({
      msg: "Login successfully",
      user: {
        id: existingUser._id,
        username: existingUser.username,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname
      },
      token: token
    });

     
    } catch (error) {
        res.status(400).json({
             msg: "error"
    })

}

}

module.exports = signinPayload
