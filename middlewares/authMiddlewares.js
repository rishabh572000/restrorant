const JWT = require("jsonwebtoken")

module.exports = async (req, res, next) =>{
    try{
        const token = req.headers['authorization'].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRETE, (error, decoded)=>{
           if(error){
            return res.status(401).send({
                status:false,
                message:'Un-Authorized user',
                error
            })
           } 
           req.body.userId=decoded.id;
           next()
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            status:false,
            message:'Error in validation',
            error:err
        })
    }
}