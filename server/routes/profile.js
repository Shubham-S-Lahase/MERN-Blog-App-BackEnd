const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const secret = "kjsehfuwehr7ewe2iwllqla9wklsmlajsi";

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

router.get('/Profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

module.exports = router;