const mongoose = require("mongoose");

//User Schema (Class)
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", UserSchema);

//Exports User Class
module.exports = User;