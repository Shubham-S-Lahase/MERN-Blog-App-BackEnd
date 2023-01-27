const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);

const router = express.Router();
router.use(express.json());

router.post('/Register', async (req,res) => {
  const {username, password} = req.body;
  try{
    const userDoc = await User.create({
      username, 
      password:bcrypt.hashSync(password, salt)
    });
    res.json(userDoc);
  } catch(err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports =  router;

