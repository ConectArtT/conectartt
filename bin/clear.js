require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");
const Message = require("../models/Message");
const Rate = require("../models/Rate");

mongoose
    .connect(process.env.DBURL, {
        useNewUrlParser: true
    })
    .then(() => {
        User.collection.drop()
        Message.collection.drop()
        Rate.collection.drop()
            .then(() => {
                console.log("All Clear");
                mongoose.disconnect();
            })
    });