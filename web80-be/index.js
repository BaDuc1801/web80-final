import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import movieRouter from './router/movieRouter.js';
import userRouter from './router/userRouter.js';

await mongoose.connect('mongodb+srv://minhduc180104:minhduc180104@learnmongo.zli6q.mongodb.net/web80?retryWrites=true&w=majority&appName=LearnMongo') 

const app = express();
app.use(express.json());
app.use(cors());

app.use('/movies', movieRouter)
app.use('/users', userRouter)

app.listen(8080, () => {
    console.log("server is running!")
})