import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

import userRoute from "./routes/userRoute.js";
import postRouter from "./routes/postRouter.js";
import cookieParser from 'cookie-parser';
import notesRouter from "./routes/notesRouter.js";
import {connectLocalDB} from "./db/db.js";



const mongoURI = process.env.mongoURI


const app = express()

app.use(cookieParser());


app.use(express.json())


app.use(cors({
    origin: 'https://notes-app-frontend-teal.vercel.app', // or frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.get("/",(req,res)=>{
    res.send("Hellooooooooooooooooooooooooo")
})

app.use('/api/users',userRoute)
app.use('/api/posts',postRouter)
app.use('/api/notes',notesRouter)

// app.use('/api/notes',notesRouter)


//connectLocalDB()
app.listen(5000,()=>{

    console.log('App is running on port 5000')
})
mongoose.connect(mongoURI).then(()=>{
    console.log('App is connected to database')
}).catch((e)=>{
    console.log(e)
})

// mongoose.connect(mongoURI)
//     .then(() => {
//         console.log('App is connected to database');
//
//         app.listen(5000, () => {
//             console.log('App is running on port 5000');
//         });
//     })
//     .catch((e) => {
//         console.error('Error connecting to MongoDB:', e);
//     });
