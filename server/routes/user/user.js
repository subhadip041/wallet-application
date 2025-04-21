const express = require('express')
const router = express.Router();
const signupRouter = require('./signup')
const signinRouter = require('./signin')
const bulkUserRouter = require('./bulk')
const updateRouter = require('./update')

router.use('/signup',signupRouter)
router.use('/signin',signinRouter)
router.use('/bulk',bulkUserRouter)
router.use('/update',updateRouter)




module.exports = router