const express = require('express')
const router = express.Router()
const balanceRouter = require('./balance')
const transferRouter = require('./transfer')


router.use('/balance',balanceRouter)
router.use('/transfer',transferRouter)



module.exports = router