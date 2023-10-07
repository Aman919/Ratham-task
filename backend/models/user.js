import mongoose from "mongoose"

const user = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["student", "dean"]
    },
    token: {
        type: String,
    }
});

export const User = mongoose.model('User', user);