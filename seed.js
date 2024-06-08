var mongoose=require("mongoose");
var campground=require("./models/campground");
var comment=require("./models/comment");

var data=[
    {
        name:"sunset",
        image:"https://tse1.mm.bing.net/th?id=OIP.1MEfbACZ_TE5FlSCo2bdKAHaE7&pid=Api&P=0&h=180" 
    },

    {
        name:"cloud in camp",
        image:"https://tse1.mm.bing.net/th?id=OIP.Mr9pcY8eQloDQRa-TLDaGwHaFj&pid=Api&P=0&h=180"
     },

     {
        name:"beracce camp",
        image:"https://tse3.mm.bing.net/th?id=OIP._burPXhf7ypFs27GQ4OyKQHaE8&pid=Api&P=0&h=180"   
     },

]

function seedDb(){
    campground.deleteMany({})
        .then(()=>{
            console.log("removed campground")
            data.forEach(function(seed){
                campground.create(seed)
                .then((a)=>{ 
                    console.log("added campground");
                    comment.create(
                        {
                           text:"This has been a Greate Place i Have Ever Seen",
                           author:"Home" 
                        })
                          .then((x)=> {a.comment.push(x);
                                       a.save();
                                       console.log("added a new comment")})
                         .catch(()=>console.log("wrong in comment")); 
        
                          
                        })
                .catch(()=>console.log("Nothing Added"));
         }); 
        })
        .catch(()=>console.log("Something Went Wrong"));    
 }

module.exports =seedDb;
