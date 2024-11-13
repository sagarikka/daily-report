const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const cors=require("cors");
const user=require("./models/User");
const newsApi=require("./routes/newsApi");
const authAPI=require("./routes/authAPI");
const postApi=require("./routes/postApi");
const testApi=require("./routes/test");
const router = require("express").Router();

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

var opts = {
  jwtFromRequest :ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey : process.env.PASSPORT_SECRET_KEY,
  expiresIn: "30d"
}
passport.use(new JwtStrategy({...opts}, function (jwt_payload, done) {
  user.findOne({ _id: jwt_payload.identifier }) // Use correct key here
    .then((user) => {
      if (user) {
        console.log('User found:', user);
        return done(null, user);
      } else {
        console.log('User not found');
        return done(null, false);
      }
    })
    .catch((err) => {
      console.error('Error in finding user:', err);
      return done(err, false);
    });
}));



app.use("/auth",authAPI);
app.use("/news",newsApi);
app.use("/posts",postApi);
app.use("/",router.get('/profile', passport.authenticate('jwt', { session: false }),
function(req, res) {
    res.send(req.user);
}
))
app.use((err, req, res, next) => {
  console.log('User:', req.user); 
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3300,()=>{
    console.log("app is listening on port 3300");
})
