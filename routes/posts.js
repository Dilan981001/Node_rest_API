const router = require("express").Router();
const Post = require("../models/Post");

//create post
router.post("/", async (req,res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update post 
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can only update your own post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//delete post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can only delete your own post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//like a post
router.put("/:id/like",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("The post has been liked");
        }else{
            await post.updateOne({$pull:{likes: req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//get a post
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);

    }catch(err){
        res.status(500).json(err);
    }
})

//get timeline posts

module.exports = router;