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
    },
    profile:{
      type:String,
      required:false
    }
});
const UserModel=mongoose.model('user',User);
module.exports=UserModel;