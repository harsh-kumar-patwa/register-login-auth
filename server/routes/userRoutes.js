const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({email: req.body.email});
        if(userExists) {
            return res.json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json({ newUser });

    } catch (error) {
        return res.json({ error });
    }
});

router.post("/login", async (req, res) => {
    
});


module.exports = router;