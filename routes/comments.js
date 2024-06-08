var express=require("express");
var router=express.Router({mergeParams:true});

var comment        =require("../models/comment");
var campground     = require("../models/campground");
const { findByIdAndUpdate } = require("../models/user");
var middleware=require("../middleware/middleindex")

router.get("/new",middleware.isLoggedIn,function(req,res){
    campground.findById(req.params.id)
    .then((a)=>{
    res.render("comment new",{campground:a})
  })
    .catch(()=>console.log("Comments New Was Wrong"))
  });
  
  router.post("/",middleware.isLoggedIn,function(req,res){
    campground.findById(req.params.id)
    .then((a)=>{
      comment.create(req.body.comment)
      .then((b)=>{
        b.author.id=req.user._id;
        b.author.username=req.user.username;
        b.save();
        a.comment.push(b);
        a.save();
        res.redirect('/campground/'+ a._id);
      })
      .catch((b)=>console.log(b,"ERROR"))
    })
    .catch(()=>res.redirect("/campground"))
  });
 //COMMENT EDIT ROUTE
  router.get("/:comment_id/edit",middleware.commentowner,function(req,res){
    comment.findById(req.params.comment_id)
    .then((a)=>res.render("commentedit",{campground_id:req.params.id,comment:a}))
    .catch(()=>res.redirect("back"))
   
  });
  //COMMENT UPDATE ROUTE
  router.put("/:comment_id",middleware.commentowner,function(req,res){
   comment.findByIdAndUpdate(req.params.comment_id,req.body.comment)
   .then((a)=>res.redirect("/campground/"+req.params.id))
   .catch(()=>res.redirect("back"))
  });

  //COMMENT DELETE
     router.delete("/:comment_id",middleware.commentowner,function(req,res){
       comment.findByIdAndDelete(req.params.comment_id)
        .then(()=>res.redirect("/campground/"+req.params.id))
        .catch(()=>res.redirect("back"))
     });  



  module.exports=router;