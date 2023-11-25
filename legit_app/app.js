var express = require("express"), 
    mongoose = require("mongoose"), 
    passport = require("passport"), 
    bodyParser = require("body-parser"), 
    MongoStore = require('connect-mongo'),
    LocalStrategy = require('passport-local').Strategy;

mongoose.connect("mongodb://localhost:27017").then(() => console.log("Connected")).catch(e => console.error(e))
const db = mongoose.connection;
const User = require("./models/user"); 
const authRoutes = require('./auth');
const forumRoutes = require('./forum');

let app = express(); 

app.use(require("express-session")({ 
    secret: "Rusty is a dog", 
    resave: true, 
    name: "sessid",
    store: new MongoStore({ mongoUrl: db.client.s.url })
})); 

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if ( process.env.COOP )
{
    app.use(function(req, res, next) {
        res.header("Cross-Origin-Opener-Policy", "same-origin");
        next();
    });
}

app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(forumRoutes);
app.use(authRoutes);

var port = process.env.PORT || 3000; 
app.listen(port, function () { 
    console.log("Listening on port " + port); 
}); 