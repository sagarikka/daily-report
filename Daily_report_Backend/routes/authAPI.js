const express =require("express")
const router=express.Router();
const bcrypt=require("bcrypt");
const {getToken}=require("../utils/helpers");
const user=require("../models/User");
const post=require("../models/post");
const passport=require("passport")

router.post("/signup",async(req,res)=>{
    const {userName,email,password}=req.body;
   try{ 
    if(!userName.trim() && !email.trim() && !password.trim()){
        return res.status(400).json({message:"please enter data"});
    }
    if(userName.length>12 ){
      return res.status(400).json({message:"usename should be of 12 character"})
    }
    //check if the user already exist
    const founduser=await user.findOne({userName},{timeout:30000});
    if(founduser){
        console.log(founduser);
        return res.status(400).json({message:"user already exist"});
    }

    // Check if password is strong (at least 8 characters, contains a number and a letter)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
        return res.status(400).json({message:"Password must be at least 8 characters long and contain at least one letter and one number"});
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
    res.status(500).json({ message: "Internal server error" });
}   
});

//login route
router.post("/login",async(req,res)=>{
    const {userName,password}=req.body;
try{
    //find the user
    const founduser=await user.findOne({userName}).maxTimeMS(30000);

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
    res.status(500).json({ message: "Internal server error" });
}
   
})

//get the data of all author with number of post they have made
router.get("/authors",async(req,res)=>{
    try{
        const authors=await user.find().select("-password").sort("userName").maxTimeMS(30000);

        //post made by each author
        const authorsWithPostCount=await Promise.all(
            authors.map(async(author) => {
                    const postCount =await post.countDocuments({author:author._id});
                    return{
                        id:author._id ,

                        userName:author.userName,
                        email:author.email,
                        profile:author.profile,
                        postCount:postCount,
                    };
                
            })
        )
        res.status(200).json(authorsWithPostCount);
    }
    catch(error){
        console.log("error in finding authors:",error);
        res.status(500).json({ message: "Internal server error" });
    }
    
});
 
//get the user by users id
router.get("/author/:authorid",async(req,res) => {
  const {authorid}=req.params;
  try{
    const author=await user.findById(authorid);
    if(!author){
      return res.status(400).json({message:"User doesn't exist"});
    }
  }
  catch(error){
    console.log("error in getting the author by author id: ",error);
    return res.status(500).json({message:"Internal server error!"})
  }
})

//get the users profile picture and username
router.get("/userprofile", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userProfile = {
      id:user._id,
      userName: user.userName,
      email: user.email,
      profile: user.profile,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error retrieving current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Update user's profile picture and username
router.put("/profile", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { userName, profilePicture} = req.body;
   const User=req.user;
   console.log("user",User);
  try {
    // Find the current user
    const foundUser = await user.findById(User._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    if (userName) foundUser.userName = userName;
    if (profilePicture) foundUser.profile = profilePicture; // Assuming you use 'profile' for the profile picture

    const updatedUser = await foundUser.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports=router;