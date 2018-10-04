const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/search', (req, res) => {
    res.render("search")
})


router.post('/search', (req, res, next) => {
    let queryInput = req.body.search
    if (queryInput == "") {
        res.render("search");
    } else {
        User.find({
                $or: [{
                        roles: {
                            $regex: queryInput,
                            $options: "$i"
                        },
                    },
                    {
                        name: {
                            $regex: queryInput,
                            $options: "$i"
                        },
                    },
                    {
                        username: {
                            $regex: queryInput,
                            $options: "$i"
                        },
                    }
                ]
            })
            .then(searchresults => {
                res.render("search", {
                    searchresults
                });
            })
            .catch(err => {
                next();
                return err;
            })
    }
})


module.exports = router;