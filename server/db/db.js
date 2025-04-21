const mongoose = require('mongoose')
const { string, Schema } = require('zod')
const dotenv = require('dotenv')
dotenv.config()
const dbUrl = process.env.USER_DB

mongoose.connect(dbUrl)
.then(()=>{
    console.log('db connected')
})
.catch((err)=>{console.log(err)})

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        require: true
    },
    password: {
        type : String,
        require: true
        },
    firstname: {
        type : String,
        require: true
    },
    lastname: {
        type : String,
        require: true
    }

    
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userInfo',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
    

})

const userInfo = mongoose.model('userInfo',userSchema)
const account = mongoose.model('account',accountSchema)


module.exports = {userInfo, account}