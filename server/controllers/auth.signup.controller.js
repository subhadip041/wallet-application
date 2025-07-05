const {signupPayloadCheck } = require('../types/auth.types')
const connectDB = require('../config/db')
// const createUserModel = require('../models/auth.models')
// const db = connectDB()
// const User = createUserModel(db)

const User = require('../models/auth.models')
const Account = require('../models/account.models')

// const createAccountModel = require('../models/account.models')
// const Account = createAccountModel(db)

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET




const signupPayload = async (req,res)=>{

    const signupLoad = req.body
    const payloadCheck = signupPayloadCheck.safeParse(signupLoad)

    if(!payloadCheck.success){
        return res.status(400).json({msg:"Bad Request"})
    }
    try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(409).json({ msg: "User already exists" });       
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(signupLoad.password, salt);
      
    const newUser = await User.create({
        username: signupLoad.username,
        password: hashedPassword ,
        firstname: signupLoad.firstName,
        lastname: signupLoad.lastName
    })
    const newAccount = await Account.create({
      userId: newUser._id,
      balance: Math.random()*10000
    })


    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        firstname: newUser.firstname,
        lastname: newUser.lastname
      },
      token: token
    });

     
    } catch (error) {
        res.status(400).json({
             msg: "error"
    })

}

}



module.exports = signupPayload
