import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from './routes/authRouter.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 5000;

const app = express();




// app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET' 
}));

app.get('/', function(req, res) {
  res.render('pages/auth');
});



app.use(cors(
  {
    // credentials:true,
    // origin: process.env.CLIENT_URL
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  }
));
app.use(cookieParser())
dotenv.config();
app.use(express.json());
app.use('/api',authRoutes)
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running in port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });




