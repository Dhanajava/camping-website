var mongoose=require("mongoose");
var campground=new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    },
    comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]
  });
  
module.exports =mongoose.model("Campground",campground);
  