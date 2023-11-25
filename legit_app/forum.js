const path = require('path')
const Comment = require("./models/comment");
const express=require('express')
const router=express.Router()


router.get("/", function (req, res) { 
    res.redirect("/forum");
}); 

router.get('/forum', isLoggedIn, function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});

router.post('/forum/post', isLoggedIn, async (req, res) => {
    try {
        let comment = req.body.comment

        if ( req.body.rel_protection )
        {
            comment = comment.replace(/opener/g, "noreferrer noopener");
        }
        console.log(comment)
        let newComment = {
            text: comment,
            author: req.user.username, 
        };
        await Comment.create(newComment);
        res.redirect('/forum');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/forum/comments', isLoggedIn, async (req, res) => {
    try {
        const comments = await Comment.find({}, 'text author').exec();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function isLoggedIn(req, res, next) { 
    if (req.isAuthenticated()) return next(); 
    res.sendFile(path.join(__dirname, 'public', 'authentication_error.html'));
} 

module.exports=router;