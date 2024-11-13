require("dotenv").config();
const jwt =require("jsonwebtoken")
exports.getToken =async(user)=>{
    const token =jwt.sign({identifier:user._id},process.env.PASSPORT_SECRET_KEY,{
        expiresIn:"30d"
    });
    console.log(token);
    return token;
}
module.exports=exports;