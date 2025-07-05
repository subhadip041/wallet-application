const express = require('express');
const router = express.Router();
const signupRoute = require('../controllers/auth.signup.controller')
const signinRoute = require('../controllers/auth.signin.controller')
const bulkUserRoute = require('../controllers/bulk.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const balanceRouter =  require('../controllers/account/balance.controller')
const transferRoute = require('../controllers/account/transfer.controller')


router.post('/signup',signupRoute)
router.post('/signin',signinRoute)
router.get('/bulk',authMiddleware,bulkUserRoute)
router.get('/account/balance',authMiddleware,balanceRouter)
router.post('/account/transfer',authMiddleware,transferRoute)



module.exports = router