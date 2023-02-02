const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const secret = "kjsehfuwehr7ewe2iwllqla9wklsmlajsi";

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.post('/Login', async (req,res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passwordOK = bcrypt.compareSync(password, userDoc.password);
    if(passwordOK) {
        // User logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username
            });
        });
    } else{
        res.status(400).json('Incorrect Credentials');
    }
});

module.exports =  router;