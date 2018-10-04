const express = require("express");
const router = express.Router();

router.get("/logout", (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect("/");
        return;
    }

    req.session.destroy(err => {
        if (err) {
            next(err);
            return;
        }

        res.redirect("/");
    });
});

module.exports = router;