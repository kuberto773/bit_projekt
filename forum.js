const path = require('path')
const Comment = require("./models/comment");
const express=require('express')
const router=express.Router()

router.get('/forum', isLoggedIn, function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'forum.html'));
});

router.post('/forum/post', isLoggedIn, async (req, res) => {
    try {
        const newComment = {
            text: req.body.comment,
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
    res.json({ message: 'You are not authenticated' });
} 

module.exports=router;