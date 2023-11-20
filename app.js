var express = require("express"), 
    mongoose = require("mongoose"), 
    passport = require("passport"), 
    bodyParser = require("body-parser"), 
    MongoStore = require('connect-mongo')

mongoose.connect("mongodb://localhost:27017").then(() => console.log("Connected")).catch(e => console.error(e))
const db = mongoose.connection;
const User = require("./models/user"); 
const authRoutes = require('./auth');
const forumRoutes = require('./forum');
let app = express(); 

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(forumRoutes);
app.use(authRoutes);
app.use(require("express-session")({ 
    secret: "Rusty is a dog", 
    resave: true, 
    name: "sessid",
    store: new MongoStore({ mongoUrl: db.client.s.url })
})); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(passport.session());

var port = process.env.PORT || 3000; 
app.listen(port, function () { 
    console.log("Server Has Started!"); 
}); 