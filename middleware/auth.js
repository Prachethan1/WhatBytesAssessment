const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if(!token){
        return res.status(400).json({error: "Access denied"});
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = verified;
        // console.log("Decoded JWT:", verified);
        req.user = { userId: verified.id, email: verified.email };
        next();
    }
    catch(err){
        res.status(400).json({error : "Invalid token"});
    }
}

module.exports = authMiddleware;