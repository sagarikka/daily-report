const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const passport = require("passport");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const cors=require("cors");
const user=require("./models/User");
const notes=require("./models/note");
const newsApi=require("./routes/newsApi");
const authAPI=require("./routes/authAPI");
const noteApi=require("./routes/noteApi");
const testApi=require("./routes/test");

const app=express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

mongoose.connect("mongodb+srv://sagarikasl446:"+process.env.MONGO_PASSWORD+"@sagarika.cpdxozy.mongodb.net/daily_report")
.then((x) => {
    console.log("connected to mongoose database");
})
.catch((err)=>{
    console.log("error while connecting to database");
});

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET_KEY;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    user.findOne({_id: jwt_payload.identifier}) 
    .then((user) => {
        if (user) {
          console.log('user found', user);
          return done(null, user);
        } else {
          console.log('user not found');
          return done(null, false);
        }
      })
      .catch((err) => {
        console.log('error in finding the user:', err);
        return done(err, false);
      });
}));


app.use("/auth",authAPI);
app.use("/news",newsApi);
app.use("/notes",noteApi);
app.use("/",testApi)
app.use((err, req, res, next) => {
    console.log('User:', req.user); 
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
    next();
  });
  
app.listen(3300,()=>{
    console.log("app is listening on port 3300");
})