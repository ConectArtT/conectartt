const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    age: Number,
    bio: String,
    imgName: String,
    imgPath: String,
    social: Array,
    webpage: String,
    roles: Array,
    gender: String,
    languages: Array

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;