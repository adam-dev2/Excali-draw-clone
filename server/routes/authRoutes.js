import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'http://localhost:5173/login'}),(req,res)=>{
    res.redirect('http://localhost:5173/dashboard');
})


router.get('/user',(req,res) => {
    if(req.user) {
        return res.status(200).json(req.user);
    }else {
        return res.status(401).json({message:'Not authenticated'});
    }
})

router.post('/logout',async(req,res) =>{
    req.logout();
    res.json({message:'Logged out successfully'});
})

module.exports = router;