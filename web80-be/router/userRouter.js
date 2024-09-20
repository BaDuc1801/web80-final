import express from 'express'
import userController from '../controller/userController.js';
import userMiddleware from '../middleware/userMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/register',userMiddleware.checkValidUser, userController.register);
userRouter.post('/login',userController.login);
userRouter.post('/logout', userMiddleware.verifyToken, userController.logout);

export default userRouter