const jwt = require("jsonwebtoken")

function verifyToken(req, res, next){
    const authHeader = req.header.authorization
    if(!authHeader){
        res.sendStatus(401)
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token, "secret_key", (err, user) => {
        if(err){
            return res.sendStatus(401)
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken