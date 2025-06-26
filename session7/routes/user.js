const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const { route } = require("./products")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    const hashed = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({ email: req.body.email, password: hashed })
    const saved = await newUser.save()
    res.json(saved)
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) 
        return res.status(401).send("Invalid credentials");
    const token = jwt.sign({ id: user._id}, "secret_key", {expireIn: "3h"})
    res.json({token})
})

module.exports = router