const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
router.get('/',async (req,res)=>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});
router.get('/:postid',async (req,res)=>{
    try{
        const posts = await Post.find({_id:req.params.postid});
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }
});

router.post('/',(req,res)=>{
    const post = new Post({
        name: req.body.name,
        description: req.body.description,
        totalLevels: req.body.totalLevels,
        approvals: req.body.approvals,
        approvers: req.body.approvers
    });
    post.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err=>{
        res.json({message:err});
    })
})
router.get('/remove/:id', async (req,res)=>{
    try{
       const posts = await Post.remove({_id:req.params.id});
       res.json(posts);
    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;