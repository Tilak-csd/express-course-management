// Middleware for handling auth
const jwt = require('jsonwebtoken')
const jwt_password = "tilakapp"

function adminMiddleware(req, res, next) {
    // Implement admin auth logic

    const Header_auth = req.headers['authorization']
    if(!Header_auth){
        return res.status(401).json({
            message : "Authorization Header missing"
        })
    }
    const token = Header_auth.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message : "Token Missing"
        })
    }
    try{
        const verified = jwt.verify(token, jwt_password)
        next()
    }catch(err){
        return res.status(400).json({
            message: "User Not Found"
        })
    }
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;