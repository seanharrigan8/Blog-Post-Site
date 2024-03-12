const router = require("express").Router();
const { User, Post } = require("../../models");

// Get all users and their associated posts
router.get("/", async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{ model: Post }],
        });
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a specific user by ID and their associated posts
router.get("/:id", async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: Post }],
        });

        if (!userData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new user
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
            // res.redirect('/dashboard');
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



// User login with email and password verification
router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password, please try again" });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, userData.password);
    

        if (!validPassword) {
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
