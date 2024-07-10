const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        
        const newUser = new User(req.body);
        await newUser.save();

    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/login", async (req, res) => {
  
});


module.exports = router;