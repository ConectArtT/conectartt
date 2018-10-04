const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require("../models/User")

router.get('/message', (req, res) => {
    res.render('./profile');
})
router.post('/message/:username', (req, res) => {
    let messageInput = req.body.message
    let toUsr = req.params.username
    let fromUsr = req.session.currentUser

    User.findOne({
        username: toUsr
    }).then(user => {
        const newMessage = {
            message: messageInput,
            to: user,
            from: fromUsr
        }

        const msg = new Message(newMessage);
        msg.save(err => {
            if (err) {
                res.render("profile/main", {
                    errorMessage: "Something went wrong. Try again later."
                });
                return;
            }

            res.redirect("/");
        });
    });


});
module.exports = router;