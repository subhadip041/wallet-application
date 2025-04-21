const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const jwtKey = process.env.JWT_KEY

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
       return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtKey)

        if(decoded.userId){
            req.userId = decoded.userId;
            next();   
        }
             
    } catch (error) {
        return res.status(403).json({});
    }

}

module.exports = {authMiddleware}