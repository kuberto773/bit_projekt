const User = require("./models/user"); 
const path = require('path')
const express = require('express')
const router = express.Router()
const passport = require("passport")

router.get("/register", function (req, res) { 
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
}); 
  
router.post("/register", async (req, res) => { 
    User.register(
        new User({ 
        username: req.body.username 
        }), req.body.password, function (err, msg) {
            if (err) {
                res.send(err);
            } else {
                res.sendFile(path.join(__dirname, 'public', 'register_success.html'));
            }
        }
    )
}); 
  
router.get("/login", function (req, res) { 
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
}); 

router.post('/login', passport.authenticate('local', { 
    failureRedirect: '/login-failure', 
    successRedirect: '/forum'
  }), (err, req, res, next) => {
    if (err) next(err);
  });

router.get('/login-failure', (req, res, next) => {
    console.log(req.session);
    res.send('Login Attempt Failed.');
});

router.get("/logout", function (req, res) { 
    req.logout(function(err) { 
        if (err) { return next(err); } 
        res.redirect('/'); 
      }); 
}); 

module.exports=router;