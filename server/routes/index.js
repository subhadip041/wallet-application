const express = require('express')
const router = express.Router();
const userRouter = require('./user/user')
const accountRouter = require('./account/account')

router.use('/user',userRouter)
router.use('/account',accountRouter)

module.exports = router