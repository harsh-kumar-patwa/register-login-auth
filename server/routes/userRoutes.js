const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({email: req.body.email});
        if(userExists) {
            return res.send({
                success:false,
                message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);
        await newUser.save();
        return res.send({
            success:true,
            message: "User registered successfully"
        })

    } catch (error) {
        return res.send({ 
            success:false,
            message: "Somethings went wrong, please try again later"
        });
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
        const validPassword = await bcrypt.compare(req.body.password, user.password,);
        if(!validPassword){
            return res.send({ 
                success:false,
                message: "Invalid password, retry with correct one" 
            });
        }

        const token = jwt.sign({userId:user.id}, process.env.JWT_SECRET);
        
        return res.send({ 
            success:true,
            message: "Login successful" ,
            token: token,
        });
    }
    catch (error) {
        return res.json({ error });
    }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select("-password");
        res.send({
            success: true,
            message: "You are authenticated",
            data: user
        });
    }catch(error){
        res.send({
            success: false,
            message: "not authorised"
        });
    }
});


module.exports = router;