const express =require("express")
const router=express.Router();
const bcrypt=require("bcrypt");
const {getToken}=require("../utils/helpers");
const user=require("../models/User");

router.post("/signup",async(req,res)=>{
    const {userName,email,password}=req.body;
   try{ 
    //check if the user already exist
    const founduser=await user.findOne({userName});
    if(founduser){
        console.log(founduser);
        return res.status(400).json({message:"user already exist"});
    }

    // Check if password is strong (at least 8 characters, contains a number and a letter)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
        return res.status(450).json({message:"Password must be at least 8 characters long and contain at least one letter and one number"});
    };

    //hash the password
    const hashedPassword=await bcrypt.hash(password,10);
    const newUserData={userName,email,password:hashedPassword};

    //create a new user
    const newUser =await user.create(newUserData);
    console.log(newUser);
    //generate a token
    const token=await getToken(newUser);

    //add token to the existing user
    const userToReturn=newUser.toJSON();  //[...newuser.toJSON(),token] we cant do this cause toJSON return a object and we cant spread it inside an array
    userToReturn.token=token;

    //delete the password and return it to the user
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
}
catch(error){
    console.log(error);
    return res.json(300).json("internal server error");
}   
});

//login route
router.post("/login",async(req,res)=>{
    const {userName,password}=req.body;
try{
    //find the user
    const founduser=await user.findOne({userName});

    //if the user doesn't exist send a message
    if(!founduser){
        return res.status(450).json({message:"invalid userName"})
    }

    //compare the password by bcrypt.compare method and check whether its valid
    const isPasswordValid=await bcrypt.compare(password,founduser.password);
    if(!isPasswordValid){
        return res.status(450).json({message:"invalid pssword"});
    }

    //generate a token and add that to found user and delete the password
    const token=await getToken(founduser);
    const userToReturn=founduser.toJSON();
    userToReturn.token=token;
    delete userToReturn.password;

    //return the user
    return res.status(200).json(userToReturn);
}
catch(error){
    console.log("error in signin:",error);
    res.status(300).json("internal server error");
}
   
})
module.exports=router;