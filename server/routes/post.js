const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const secret = "kjsehfuwehr7ewe2iwllqla9wklsmlajsi";
const Post = require('../models/Post');
const { route } = require("./register");
const router = express.Router();
router.use(express.json());
router.use(cookieParser());


router.post('/Post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname,filename,path} = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length-1];
    const newName = 'uploads/'+filename+'.'+extension;
//     console.log(newName);
    const newPath = path+'.'+extension;
   fs.renameSync(path, newPath);
   const {token} = req.cookies;
   jwt.verify(token, secret, {}, async (err, info) => {
     if (err) throw err;
     const {title, summary, content} = req.body;
     const postDoc = await Post.create({
          title,
          summary,
          content,
          cover: newName,
          author: info.id,
     });
     res.json(postDoc);
     // res.json({files:req.file});
 });
});

router.get('/get-post', async (req,res) => {
    res.json(await Post.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20)
    );
});

router.get('/post/:id', async (req,res) => {
     const {id} = req.params;
    const postDoc = await Post.findById(id)
    .populate('author', ['username']);
    res.json(postDoc);
})

module.exports = router;