const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
         return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
        id: decoded.id,
        username: decoded.username
    }
    next()

      } catch (error) {
         return res.status(401).json({ msg: 'Unauthorized: Invalid or expired token' });
      }

}

module.exports = authMiddleware