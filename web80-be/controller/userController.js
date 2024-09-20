import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import userModel from "../model/user.Schema.js";
dotenv.config();

const userController = {
    getUsers: async (req, res) => {
        const listUser = await userModel.find();
        res.status(200).send(listUser)
    },

    register: async (req, res) => {
        try {
            const { email, password, username } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const saveuser = await userModel.create({
                username,
                email,
                password: hashedPassword,
            })
            res.status(201).send(saveuser)
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email })
            const compare = bcrypt.compareSync(password, user.password);
            if (!compare) {
                throw new Error('Email or password is invalid!');
            }
            const token = jwt.sign({
                userId: user._id,
                username: user.username,
                email: user.email,
            }, process.env.SECRETKEY, { expiresIn: 60 * 10 })
            res.status(200).send({
                message: "Login successful",
                accessToken: token,
                userId: user._id,
                username: user.username,
                email: user.email,
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    },

    logout : (req, res) => {
        res.status(200).json({ message: 'Logout successful' });
    }
}

export default userController;