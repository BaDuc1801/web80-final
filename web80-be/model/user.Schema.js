import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    },
})

const userModel = mongoose.model('users', userSchema);

export default userModel;