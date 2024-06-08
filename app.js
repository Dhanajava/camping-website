var express        =require("express"),
    bodyparser     =require("body-parser"),
    mongoose       =require("mongoose"),
    passport       =require("passport"),
    flash          =require("connect-flash"),
    LocalStrategy  =require("passport-local"),
    methodOverride =require("method-override"),
    // comment        =require("./models/comment"),
    // campground     =require("./models/campground"),
    user           =require("./models/user"),
    seedDB         =require("./seed")
  

  
   var commentRoutes    =require("./routes/comments"),
       campgroundRoutes =require("./routes/campground"),
       indexRoutes      =require("./routes/index")

var app            =express();
mongoose.connect("mongodb+srv://dhanasneka010:BzjHXhN3ojf1SosK@cluster0.zmlm2dn.mongodb.net/yelpcamp");
app.set("view engine", "ejs");
require('dotenv').config()
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("./public"))
//seedDB();

app.use(require("express-session")({
  secret:"Rusty Wins Again",
  resave: false,
  saveUninitialized:false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
 res.locals.currentuser=req.user;

 next();
});



app.use("/campground/:id/comment",commentRoutes);
app.use("/campground",campgroundRoutes);
app.use(indexRoutes);


app.listen(process.env.PORT,()=>{
    console.log("Server is Working",process.env.PORT)
})
