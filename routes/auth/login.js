const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../../models/User")

router.get("/login", (req, res, next) => {
    res.render("auth/login", {
        errorMessage: ""
    });
    if (req.session.currentUser) {
        res.redirect("/profile");
    }
});


router.post("/login", (req, res, next) => {
    const credentials = req.body.credentials;
    const passwordInput = req.body.password;

    if (credentials === "" || passwordInput === "") {
        res.render("auth/login", {
            errorMessage: "Enter email/username and password to log in."
        });
        return;
    }
    User.findOne({
        $or: [{
            email: credentials
        }, {
            username: credentials
        }]
    }, (err, nUser) => {
        if (err || nUser === null) {
            res.render("auth/login", {
                errorMessage: `Invalid Email/Username or Password.`
            });
            return;
        }
        if (!bcrypt.compareSync(passwordInput, nUser.password)) {
            res.render("auth/login", {
                errorMessage: "Invalid Email/Username or Password."
            });
            return;
        }

        req.session.currentUser = nUser;
        res.redirect("/");
    });
});

module.exports = router;