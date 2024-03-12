const router = require("express").Router();
const { User, Post } = require("../../models");
const bcrypt = require("bcrypt");
express = require("express");
//bring in withAuth middleware
const withAuth = require("../../utils/auth");


// Create a new user
router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
            
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



// User login with email and password verification
router.post("/login", async (req, res) => {
    try {
        console.log(req.body);
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            console.log("no user found");
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, userData.password)
      

        if (!validPassword) {
            console.log("password incorrect");
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in" });
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Logout user
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(400).end();
    }
});

module.exports = router;
