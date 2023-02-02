const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const cors = require('cors');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');
const Post = require('../models/Post');

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use('/uploads', express.static(__dirname + '/uploads'));

router.post('/Post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length-1];
    const newPath = path+'.'+extension;
   fs.renameSync(path, newPath);
  
   const {title, summary, content} = req.body;
   const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
   });
   res.json(postDoc);
});

module.exports = router;