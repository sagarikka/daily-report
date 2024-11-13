const router =require("express").Router();
const passport=require("passport");
const post=require("../models/post");
const jwt=require("jsonwebtoken");

router.post("/post",passport.authenticate("jwt", { session: false }), async (req, res) => {
    console.log('Authentication middleware hit');
    console.log('User from passport:', req.user);

    const { title, category, description, thumbnail } = req.body;
    
    try {
        if (!title || !category || !description) {
            return res.status(400).json({ message: "please enter required data" });
        }
        const postData = { 
          title, 
          category, 
          description, 
          author: req.user._id 
      };

      if (thumbnail) {
          postData.thumbnail = thumbnail;
      }

      const createdPost = await post.create(postData);
        return res.status(201).json(createdPost);
    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/allpost",async(req,res) => {
    try{
        const allPost=await post.find().populate('author');
        return res.status(200).json(allPost);
    }
    catch(error){
        console.log("error finding all posts: ",error);
        res.status(500).json({ message: "Internal server error" });
    }
})


router.get("/posts/author/:authorId", async (req, res) => {
    const { authorId } = req.params;
    try {
      // Find all posts by the author using the author ID
      const posts = await post.find({ author: authorId }).populate("author");
      res.status(200).json(posts);
    } catch (error) {
      console.log("Error in finding posts by author ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/post/:postId", async (req, res) => {
    const { postId } = req.params;
  
    try {
      // Find the post by post ID
      const posts= await post.findById(postId).populate("author");
  
      res.status(200).json(posts);
    } catch (error) {
      console.log("Error in finding post by post ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/posts/:postcategory",async (req,res) => {
    const {postcategory}=req.params;
    try{
      const categoryPost=await post.find({category:postcategory}).populate("author");
      if(!categoryPost){
        return res.status(400).json({message:`there is no post of ${category} category`})
      }
      return res.status(200).json(categoryPost);
    }
    catch(error){
      console.log("error during finding post by category",error);
      return res.status(500).json({message:"Internal server error"});
    }
  })

  router.put("/edit/:id",passport.authenticate("jwt",{session:false}),async(req,res) => {
    const {id}=req.params;
    const {title,category,description,thumbnail}=req.body;
    try{
      const postDetail=await post.findById(id);
      if (!postDetail) {
        return res.status(400).json({ message: "Post not found" }); // Return 404 if post is not found
      }
      if(title) postDetail.title=title;
      if(category) postDetail.category=category;
      if(description) postDetail.description=description;
      if(thumbnail) postDetail.thumbnail=thumbnail;
      const updatedPost=await postDetail.save();
      return res.status(200).json(updatedPost);
    }
    catch(error){
      console.log("error while editing post",error);
      return res.status(500).json({message:"Internal server error"})
    }
  })

  router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedPost = await post.findByIdAndDelete(id); // Use findByIdAndDelete
  
      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" }); // If post doesn't exist, return 404
      }
  
      return res.status(200).json({ message: "Post successfully deleted", post: deletedPost }); // Return success message and the deleted post
    } catch (error) {
      console.error("Error deleting the post:", error);
      return res.status(500).json({ message: "Internal server error" }); // Return error message if something goes wrong
    }
  });
module.exports=router;