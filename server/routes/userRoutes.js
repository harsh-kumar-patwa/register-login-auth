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
    try {
        const user = await User.findOne({ email: req.body.email});
        if(!user){
            return res.send({ 
                success:false,
                message: "User not found, please register" 
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.send({ 
                success:false,
                message: "Invalid password, retry with correct one" 
            });
        }
        return res.send({ 
            success:true,
            message: "Login successful" 
        });
    }
    catch (error) {
        return res.json({ error });
    }
});


module.exports = router;