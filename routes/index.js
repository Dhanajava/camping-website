var express   =require("express");
var app            =express();
var router    =express.Router();
var passport  =require("passport");
var user      =require("../models/user");
var flash     =require("connect-flash");

router.get("/",(req,res)=>{
    res.render("landing");
   });
   
   router.get("/register",function(req,res){
     res.render("register")
   });
   
   router.post("/register",function(req,res){
     var newuser=new user({username:req.body.username});
      user.register(newuser,req.body.password)
       .then((all)=>{
         passport.authenticate("local")(req,res,function(){
         res.redirect("/campground");
       });
     })
   .catch(()=>res.render("register"))
   });
   
   router.get("/login",function(req,res){
     res.render("login");
   });
   
   router.post("/login",passport.authenticate("local",{
       successRedirect:"/campground",
       failureRedirect:"/login"
   })
   ,function(req,res){
   });
   
   router.get("/logout",function(req,res){
     req.logout(function(err) {
       if (err) { return next(err); }
      //  req.flash("success","Logged You Out!!");
       res.redirect('/campground');
     });
   });

   module.exports=router;