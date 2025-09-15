import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken'
import passport from 'passport';
import session from 'express-session';
import './utils/passport.js'

const app = express();

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())



app.use('/api/auth',authRoutes);



app.listen(process.env.PORT || 5000,()=>{
    console.log(`Listening on port: ${process.env.PORT || 5000}`)
})