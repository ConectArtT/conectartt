const express = require("express");
const router = express.Router();
const User = require('../../models/User');

router.get('/:username', (req, res) => {
    let user = req.params.username
    User.findOne({
            username: user
        })
        .then(watchedUser => {
            res.render("./profile/user", {
                watchedUser
            });
        })
        .catch(err => {
            next();
            return err;
        })
})

module.exports = router;