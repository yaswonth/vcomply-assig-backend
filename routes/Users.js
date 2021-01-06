const express = require('express');

const router = express.Router();
const Post = require('../models/Post');

router.get('/:name',async (req,res)=>{
     try{
        const posts = await Post.find({
            status:"Active",
            approvers: req.params.name
        })
         res.json(posts);
     }catch(err){
         res.json({message:err})
     }
});

module.exports = router;