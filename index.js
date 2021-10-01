const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const addData = require("./routes/data");
const User = require("./models/user");

const passport    = require("passport")
const LocalStrategy = require("passport-local")
const appData = require('./routes/data');
 const adminRouter = require('./routes/admin');
const bcrypt = require('bcrypt')

var cookieParser = require('cookie-parser')



dotenv.config();

mongoose.connect(
  process.env.TinyTrip_URL,
  { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(express.json());
app.use(cookieParser())

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));
// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "anything",
  resave: false,
  saveUninitialized: false
}));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//Admin Bro ************



app.use(addData);
app.use('/admin',adminRouter);


app.listen(3000, () => {
  console.log("Backend server is running!");
});





