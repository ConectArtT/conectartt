const express = require('express');
const router  = express.Router();
const Rate = require('../models/Rate');

router.get('/newRate', (req, res) => {
    res.render('rate');
})
router.post('/newRate', (req, res) => {
    if (!req.session.currentUser) {
        res.redirect("/");
        return;
    }

    let {
        opinion,
        rate,
        to
    } = req.body;

    let from = req.session.currentUser._id;

    Rate.create({
            opinion,
            rate,
            from,
            to
        })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log(err));
})

router.get('/edit/:id', (req, res) => {
    Rate.findById(req.params.id)
        .then(rate => res.render('messages/edit', {
            rate
        }))
        .catch(err => console.log(err));
})

router.get('/delete/:id', (req, res) => {
    Rate.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/rates'))
        .catch(err => console.log(err));
})

router.get('/', (req, res, next) => {
    Rate.find()
        .then(rate => {
            res.render("rates", {
                rates
            });
        })
        .catch(err => {
            next();
            return err;
        })
});


module.exports = router;