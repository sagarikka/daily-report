const mongoose =require("mongoose");
const {Schema}=mongoose;
const Notes=new mongoose.Schema({
      note:{
        type:String,
        required:true,
      },
      noteUser:{
          type:mongoose.Types.ObjectId,
          ref:"user"
      }
});
const noteModel=mongoose.model("notes",Notes);
module.exports=noteModel;