var comment        =require("../models/comment");
var campground     = require("../models/campground");

var middlewareObj={};


middlewareObj.checkowner=function checkowner(req,res,next){
        if(req.isAuthenticated()){
           campground.findById(req.params.id)
           .then((a)=>{
             if(a.author.id.equals(req.user._id)){
              next();
             }else{
                res.redirect("back");
             }
           })
           .catch(()=>res.redirect("back"))
         }else{
          res.redirect("back");
         }
      }


middlewareObj.commentowner=function commentowner(req,res,next){
    if(req.isAuthenticated()){
       comment.findById(req.params.comment_id)
       .then((a)=>{
         if(a.author.id.equals(req.user._id)){
          next();
         }else{
            res.redirect("back");
         }
       })
       .catch(()=>res.redirect("back"))
     }else{
      res.redirect("back");
     }
  }

   middlewareObj.isLoggedIn=function(req,res,next){
   if(req.isAuthenticated()){
       return next();
   }
   res.redirect("/login");
}


module.exports=middlewareObj;