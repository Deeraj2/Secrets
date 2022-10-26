import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js';
import noteRoutes from './routes/note.js';

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/user', userRoutes);
app.use('/notes', noteRoutes);

mongoose.connect("mongodb://localhost:27017/NoteDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


app.listen('4000', ()=>{
    console.log("Server is running in 4000...")
})