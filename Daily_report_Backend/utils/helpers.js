require("dotenv").config();
exports={};
const jwt =require("jsonwebtoken")
exports.getToken =async(user)=>{
    const token =jwt.sign({identifier:user._id},process.env.PASSPORT_SECRET_KEY);
    return token;
}
module.exports=exports;