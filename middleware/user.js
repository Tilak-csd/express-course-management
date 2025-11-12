const jwt = require('jsonwebtoken')
jwt_password = "tilakapp"

function userMiddleware(req, res, next) {

    const user_auth = req.headers['authorization']
    if(!user_auth){
       return res.status(404).json({
            message : "Header Authorization Not Found."
        })
    }
    const token = user_auth.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message : "Token Missing"
        })
    }
    
    try {
        const verified = jwt.verify(token, jwt_password)
        if (!verified) {
            return res.status(401).json({ message: "wrong Authorization" })
        }
        const username = verified.username
        req.username = username
        next()
         
    }
    catch (err) {
        console.log(err);
        res.status(404).json("Authorization code mistake")
        
    }
}

module.exports = userMiddleware;