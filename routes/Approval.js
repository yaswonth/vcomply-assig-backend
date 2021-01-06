const express = require('express');

const router = express.Router();
const Post = require('../models/Post');
const { Schema } = require('mongoose');

function arr(data){
    if(data.approvaltype=="Sequential"){
        return [data.users[0].name];
    }else{
        var a = []
        for(var i=0;i<data.users.length;i++){
            a.push(data.users[i].name)
        }
        return a;
    }
}

router.post('/approve/sequential',async (req,res)=>{
    try{
        const posts = await Post.findById(req.body.id);
        var a = posts.approvers
        var b = a.includes(req.body.name)
        if(b==true){
            var ap = posts.approvals;
            var cl = posts.currentlevel;
            var cu = ap[cl-1].currentuser;
            var tot = ap[cl-1].totalusers;
            var totlev = posts.totalLevels;
            console.log(ap[cl-1].users[cu-1])
            ap[cl-1].users[cu-1]["action"] = "Approved";
            ap[cl-1].users[cu-1]["work"] = "Active";
            if(cu==tot){
               if(cl==totlev){
                ap[cl-1].users[cu-1]["work"] = "Executed";
                   const fina = await Post.updateOne({_id:req.body.id}, 
                                                      { $set:{ status:"Executed",approvals: ap, updatedDate: Date.now(), }});
                    res.json(fina);
               }else{
                   var k = arr(ap[cl])
                   cl=cl+1
                   const fina = await Post.updateOne({ _id: req.body.id},
                                                        { $set:{ currentlevel:cl,
                                                                 approvers: k,
                                                                 approvals: ap,
                                                                 updatedDate: Date.now(), } });
                    res.json(fina);
               }
            }else{
                ap[cl-1].currentuser = cu+1
                const fina = await Post.updateOne({_id:req.body.id}, {$set:{ approvers:[ap[cl-1].users[cu].name],
                                                                             updatedDate: Date.now(),
                                                                             approvals: ap }});
                res.json(fina);
            }
            

        }else{
            res.json({message: "Not Present."})
        }
    }catch(err){
        res.json({message: JSON.stringify(err)});
    }
});

router.post('/approve/round',async (req,res)=>{
    try{
        const posts = await Post.findById(req.body.id);
        var a = posts.approvers
        var b = a.includes(req.body.name)
        if(b==true){
            var ap = posts.approvals;
            var cl = posts.currentlevel;
            var tot = ap[cl-1].totalusers;
            var totlev = posts.totalLevels;
            var cu=0;
            for(var i=0;i < ap[cl-1].totalusers;i++){
                if(ap[cl-1].users[i].name==req.body.name){
                    cu=i+1;
                }
            }
            console.log(ap[cl-1].users[cu-1])
            ap[cl-1].users[cu-1]["action"] = "Approved";
            ap[cl-1].users[cu-1]["work"] = "Active";
            if(ap[cl-1].currentuser==tot){
                if(cl==totlev){
                    ap[cl-1].users[cu-1]["work"] = "Executed";
                    const fina = await Post.updateOne({_id:req.body.id}, 
                                                       { $set:{ status:"Executed",approvals: ap, updatedDate: Date.now(), }});
                     res.json(fina);
                }else{
                    var k = arr(ap[cl])
                    cl=cl+1
                    const fina = await Post.updateOne({ _id: req.body.id},
                                                         { $set:{ currentlevel:cl,
                                                                  approvers: k,
                                                                  approvals: ap,
                                                                  updatedDate: Date.now(), } });
                     res.json(fina);
                }
             }else{
                 ap[cl-1].currentuser = ap[cl-1].currentuser+1
                 var k =[]
                 for(var i=0;i<a.length;i++){
                     if(a[i]!=req.body.name){
                         k.push(a[i]);
                     }
                 }
                 const fina = await Post.updateOne({_id:req.body.id}, {$set:{ approvers:k,
                                                                              updatedDate: Date.now(),
                                                                              approvals: ap }});
                 res.json(fina);
             }



        }else{
            res.json({message: "Not Present."})
        }
    }catch(err){
        res.json({message: err});
    }
});

router.post('/approve/any',async (req,res)=>{
    try{
        const posts = await Post.findById(req.body.id);
        var a = posts.approvers
        var b = a.includes(req.body.name)
        if(b==true){
            var ap = posts.approvals;
            var cl = posts.currentlevel;
            var tot = ap[cl-1].totalusers;
            var totlev = posts.totalLevels;
            var cu=0;
            for(var i=0;i < ap[cl-1].totalusers;i++){
                if(ap[cl-1].users[i].name==req.body.name){
                    cu=i+1;
                }
            }
            console.log(ap[cl-1].users[cu-1])
            ap[cl-1].users[cu-1]["action"] = "Approved";
            ap[cl-1].users[cu-1]["work"] = "Active";
            if(cl==totlev){
                ap[cl-1].users[cu-1]["work"] = "Executed";
                const fina = await Post.updateOne({_id:req.body.id}, 
                                                   { $set:{ status:"Executed",approvals: ap, updatedDate: Date.now(), }});
                 res.json(fina);
            }else{
                var k = arr(ap[cl])
                cl=cl+1
                const fina = await Post.updateOne({ _id: req.body.id},
                                                     { $set:{ currentlevel:cl,
                                                              approvers: k,
                                                              approvals: ap,
                                                              updatedDate: Date.now(), } });
                 res.json(fina);
            }

        }else{
            res.json({message: "Not Present."})
        }
    }catch(err){
        res.json({message: err});
    }
});
router.post('/reject/sequential',async (req,res)=>{
    try{
        const posts = await Post.findById(req.body.id);
        var a = posts.approvers
        var b = a.includes(req.body.name)
        if(b==true){
            var ap = posts.approvals;
            var cl = posts.currentlevel;
            var cu = ap[cl-1].currentuser;
            var tot = ap[cl-1].totalusers;
            var totlev = posts.totalLevels;
            console.log(ap[cl-1].users[cu-1])
            ap[cl-1].users[cu-1]["action"] = "Rejected";
            ap[cl-1].users[cu-1]["work"] = "Terminated";
            const fina = await Post.updateOne({_id:req.body.id}, 
                { $set:{ status:"Terminated",approvals: ap, updatedDate: Date.now(), approvers:[] }});
            res.json(fina);


        }else{
            res.json({message: "Not Present."})
        }
    }catch(err){
        res.json({message: err});
    }
});

router.post('/reject/round',async (req,res)=>{
    try{
        const posts = await Post.findById(req.body.id);
        var a = posts.approvers
        var b = a.includes(req.body.name)
        if(b==true){
            var ap = posts.approvals;
            var cl = posts.currentlevel;
            var tot = ap[cl-1].totalusers;
            var totlev = posts.totalLevels;
            var cu=0;
            for(var i=0;i < ap[cl-1].totalusers;i++){
                if(ap[cl-1].users[i].name==req.body.name){
                    cu=i+1;
                }
            }
            console.log(ap[cl-1].users[cu-1])
            ap[cl-1].users[cu-1]["action"] = "Rejected";
            ap[cl-1].users[cu-1]["work"] = "Terminated";
            const fina = await Post.updateOne({_id:req.body.id}, 
                { $set:{ status:"Terminated",approvals: ap, updatedDate: Date.now(),  approvers:[]}});
            res.json(fina);


        }else{
            res.json({message: "Not Present."})
        }
    }catch(err){
        res.json({message: err});
    }
});

router.post('/reject/any',async (req,res)=>{
    try{
        const posts = await Post.findById(req.body.id);
        var a = posts.approvers
        var b = a.includes(req.body.name)
        if(b==true){
            var ap = posts.approvals;
            var cl = posts.currentlevel;
            var tot = ap[cl-1].totalusers;
            var totlev = posts.totalLevels;
            var cu=0;
            for(var i=0;i < ap[cl-1].totalusers;i++){
                if(ap[cl-1].users[i].name==req.body.name){
                    cu=i+1;
                }
            }
            console.log(ap[cl-1].users[cu-1])
            ap[cl-1].users[cu-1]["action"] = "Rejected";
            ap[cl-1].users[cu-1]["work"] = "Active";
            var k =[]
            for(var i=0;i<a.length;i++){
                if(a[i]!=req.body.name){
                         k.push(a[i]);
                }
            }
            if(k.length==0){
                ap[cl-1].users[cu-1]["work"] = "Terminated";
                const fina = await Post.updateOne({_id:req.body.id}, 
                    { $set:{ status:"Terminated",approvals: ap, updatedDate: Date.now(), approvers:k }});
                res.json(fina);
            }else{
                const fina = await Post.updateOne({_id:req.body.id}, {$set:{ approvers:k,
                    updatedDate: Date.now(),
                    approvals: ap }});
                res.json(fina);
            }


        }else{
            res.json({message: "Not Present."})
        }
    }catch(err){
        res.json({message: err});
    }
});

router.post('/remove',async (req,res)=>{
    try{
        const posts = await Post.findById(req.body.id);
        var a = posts.approvers
        var b = a.includes(req.body.name)
        if(b==true){
            var ap = posts.approvals;
            var cl = posts.currentlevel;
            var tot = ap[cl-1].totalusers;
            var totlev = posts.totalLevels;
            var cu=0;
            for(var i=0;i < ap[cl-1].totalusers;i++){
                if(ap[cl-1].users[i].name==req.body.name){
                    cu=i+1;
                }
            }
            console.log(ap[cl-1].users[cu-1])
            ap[cl-1].users[cu-1]["action"] = "Rejected and Removed from workflow";
            ap[cl-1].users[cu-1]["work"] = "Terminated";
            const fina = await Post.updateOne({_id:req.body.id}, 
                { $set:{ status:"Terminated",approvals: ap, updatedDate: Date.now(), }});
            res.json(fina);


        }else{
            res.json({message: "Not Present."})
        }
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;