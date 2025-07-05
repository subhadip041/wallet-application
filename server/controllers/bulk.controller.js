// const createUserModel = require('../models/auth.models')
// const connectDB = require('../config/db')
// const db = connectDB()
// const User = createUserModel(db)

const User = require('../models/auth.models')

const bulkUser = async (req,res)=>{

     const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstname: {
                '$regex' : filter, 
                '$options' : 'i'
            }
        }, {
            lastname: {
                '$regex' : filter, 
                '$options' : 'i'
            }
        }]
    })
   
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstname,
            lastName: user.lastname,
            _id: user._id
        }))
    })
}

module.exports = bulkUser

