const router =require("express").Router();
const passport=require("passport");
const notes=require("../models/note");
const jwt=require("jsonwebtoken");

router.post("/note",passport.authenticate("jwt",{session:false}),async(req,res)=>{
    console.log('Authentication middleware hit');
    const currentUser=req.user;
    console.log('User from passport:', req.user);
    
    const { note } = req.body;
    console.log('Received note:', note);
try{
    if(!note){
        return res.status("400").json({message:"please enter note"})
    }
    const noteData={note,noteUser:currentUser._id};
    const createdNote=await notes.create(noteData);
    return res.status(201).json(createdNote);
}
catch(error){
    console.log("error:",error)
    return res.status(500).json({error:"internal server error"});
}  
});

module.exports=router;