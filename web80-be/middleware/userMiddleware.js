import userModel from '../model/user.Schema.js';
import jwt from 'jsonwebtoken'

const userMiddleware = {
    checkValidUser: async (req, res, next) => {
        const { email, password } = req.body;
        if (!email) throw new Error('Email is missing!')
        if (!password) throw new Error('Password is missing!')
        const existEmail = await userModel.findOne({ email })
        if (existEmail){
            throw new Error('Email already existed!')
        }
        else{
            next()
        }
    },
    verifyToken: async (req, res, next) => {
        try {
            const auth = req.headers['authorization'];
            if(auth){
                const token = auth.split(' ')[1];

                jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
                    if(err) {
                        return res.status(401).json({message: 'Access token is invalid'})
                    } else{
                        req.user = decoded;
                        next()
                    }
                })
            }
        } catch (error) {
            res.status(401).json({message: 'Access token is missing'})
        }
    }
}

export default userMiddleware;