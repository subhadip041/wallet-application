const express = require('express')
const router = express.Router();
const { signinTypecheck } = require('../../types/type')
const { userInfo } = require('../../db/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const jwtKey = process.env.JWT_KEY



router.post('/', async (req, res) => {

    try {

        const signInPayload = req.body;
        const payloadCheck = signinTypecheck.safeParse(signInPayload)
        if (!payloadCheck.success) {
            return res.status(400).json({ msg: "Bad Request" })
        }
        const userExist = await userInfo.findOne({ username: signInPayload.username })
        if (!userExist) {
            return res.status(404).json({ msg: "Not Found" })
        }

        const isMatch = await bcrypt.compare(signInPayload.password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Unauthorized" })
        }


        const token = jwt.sign(
            {
                userId: userExist._id,
                username: userExist.username
            },
            jwtKey,
            {
                expiresIn: '1h'
            }
        )

        return res.status(200).json({
            msg: "Login successful",
            "token": token
        });

    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }




})

module.exports = router