
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        useremail: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

const users = mongoose.model("Users", userSchema);

module.exports = users;