const mongoose=require("mongoose");
const {Schema}=mongoose;
const User=new Schema({
    userName:{
       type:String,
       required:true,
    },
    email:{
       type:String,
       required:true,
    },
    password:{
       type:String,
       required:true,
    }
});
const UserModel=mongoose.model('user',User);
module.exports=UserModel;