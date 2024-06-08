const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true},
        picture: { type: String, required: true, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
        token: { type: String, required: true}
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

module.exports = User