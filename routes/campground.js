var express=require("express");
var router=express.Router();
var campground=require("../models/campground");
var middleware=require("../middleware/middleindex")

router.get("/",(req,res)=>{
    campground.find({})
    .then((a)=>{
    res.render("campground",{campground:a,currentuser:req.user})
    })
    .catch(()=> console.log("Something Went Wrong"))
   });
   router.post("/",middleware.isLoggedIn,(req,res)=>{
       var name=req.body.name;
       var price=req.body.price;
       var image=req.body.image;
       var author={
        id:req.user._id,
        username:req.user.username
       }
       var newCampground={name:name,price:price,image:image,author:author};
       campground.create(newCampground)
       .then(()=>res.redirect("/campground"))
       .catch(()=>console.log("New Campground Was Worng"))
    // campground.push(newCampground);
    // res.redirect("/campground");
   });
   router.get("/new",middleware.isLoggedIn,(req,res)=>{
     res.render("new");
   });
   
   router.get("/:id",function(req,res){
     console.log(req.params.id)
     campground.findById(req.params.id).populate("comment").exec()
          .then((a)=> {
           res.render("show",{campground:a})             
     })
     .catch((b)=>console.log(b,"Find By ID Was Wrong"))
    
     });

     router.get("/:id/edit",middleware.checkowner,function(req,res){
       campground.findById(req.params.id)
        .then((a)=>{
         res.render("edit",{campground:a})
       })
        //.catch(()=>res.redirect("/campground"))
        });
    //CAMPGROUND UPDATE ROUTES
    router.put("/:id",middleware.checkowner,function(req,res){
      console.log("body",req.body.campground)
      campground.findByIdAndUpdate(req.params.id,req.body.campground)
      .then(()=>res.redirect("/campground/"+req.params.id))
      .catch(()=>res.redirect("/campground"))
    });

    //DESTROY ROUTES
     router.delete("/:id",middleware.checkowner,function(req,res){
      campground.findByIdAndDelete(req.params.id)
      .then(()=>res.redirect("/campground"))
      .catch(()=>res.redirect("/campground"))
     });



     module.exports=router;