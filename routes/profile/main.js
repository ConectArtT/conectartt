const express = require("express");
const router = express.Router();
const Message = require('../../models/Message');
const Rate = require('../../models/Rate');

router.get("/profile", (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect("/");
        return;
    }
    Message.find({
            to: req.session.currentUser._id
        })
        .then(messages => {
            console.log(messages)
            res.render("profile/main", {
                messages
            })
        })
        .catch(err => {
            next();
            return err;
        })

});

module.exports = router;