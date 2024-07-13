const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(verified){
            req.body.userId = verified.userId;
            next();
        }
        else{
            return res.send({
                success: false,
                message: "Authorization failed"
            });
        
        }
    }
    catch(error){
        console.log(error);
    }
}