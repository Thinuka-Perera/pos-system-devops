const jwt = require('jsonwebtoken');

const authMiddleware = (req,resp,next) =>{
    try{
        const authHeader = req.headers['authorization'];
        console.log(authHeader)
        if(!authHeader){
            return resp.status(401).json({message:'Authentication Heder is missing'})
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            return resp.status(401).json({message:'token is missing'})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECERET);
        req.userEmail = decoded.email;
        next();

    }catch (e) {
        console.log(e)
        resp.status(401).json({'message':'Invalid Or Token is Expire'});
    }
}

module.exports = authMiddleware