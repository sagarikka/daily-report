const mongoose =require("mongoose");
const {Schema}=mongoose;
const post=new Schema({
      title:{
        type:String,
        required:true,
      },
      category:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true
      },
      thumbnail:{
        type:String,
        required:false
      },
      author:{
          type:mongoose.Types.ObjectId,
          ref:"user"
      }
});
const postModel=mongoose.model("post",post);
module.exports=postModel;