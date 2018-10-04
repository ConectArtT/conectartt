const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const bcryptSalt = 10;
const User = require("../../models/User");
const uploadCloud = require("../../config/cloudinary.js");


router.get("/signup", (req, res, next) => {
    res.render("auth/signup", {
        errorMessage: ""
    });
    if (req.session.currentUser) {
        res.redirect("/profile");
    }
})

router.post("/signup", uploadCloud.single('photo'), (req, res, next) => {
    const nameInput = req.body.name;
    const emailInput = req.body.email;
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;
    const bioInput = req.body.bio;
    const ageInput = req.body.age;
    const socialInput = req.body.social;
    const imgPathInput = req.file.url;
    const imgNameInput = req.file.originalname;
    const webpageInput = req.body.webpage;
    const rolesInput = req.body.roles;
    const genderInput = req.body.gender;
    const languagesInput = req.body.languages;

    if (emailInput === "" || passwordInput === "" || usernameInput === "" || nameInput === "" || imgPathInput === "") {
        res.render("auth/signup", {
            errorMessage: "Please fill all fields."
        });
        return;
    }

    User.findOne({
        email: emailInput
    }, "_id", (err, existingUser) => {
        if (err) {
            next(err);
            return;
        }

        if (existingUser !== null) {
            res.render("auth/signup", {
                errorMessage: `The email ${emailInput} is already in use.`
            });
            return;
        }
        User.findOne({
            username: usernameInput
        }, "_id", (err, existingUser) => {
            if (err) {
                next(err);
                return;
            }

            if (existingUser !== null) {
                res.render("auth/signup", {
                    errorMessage: `The username ${usernameInput} is already in use.`
                });
                return;
            }
        });

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashedPass = bcrypt.hashSync(passwordInput, salt);
        const userSubmission = {
            name: nameInput,
            username: usernameInput,
            email: emailInput,
            password: hashedPass,
            bio: bioInput,
            imgName: imgNameInput,
            imgPath: imgPathInput,
            age: ageInput,
            social: socialInput,
            webpage: webpageInput,
            roles: rolesInput,
            gender: genderInput,
            languages: languagesInput,
        };

        const theUser = new User(userSubmission);

        theUser.save(err => {
            if (err) {
                res.render("auth/signup", {
                    errorMessage: "Something went wrong. Try again later."
                });
                return;
            }

            res.redirect("/");
        });
    });
});


module.exports = router;