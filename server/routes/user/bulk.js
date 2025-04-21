const express = require('express')
const router = express.Router()
const { authMiddleware } = require('../../middleware/authmiddleware')
const { userInfo } = require('../../db/db')

router.get("/",authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await userInfo.find({
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
})

module.exports = router