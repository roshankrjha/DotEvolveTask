const User = require('../models/user')
const passport = require('passport')
const isLoggedIn = require('../middleware/authuser')

const home = (req,res)=>{
    res.render('home',{active: "home"})
}
const getSignup = (req,res) => {
    res.render('signup',{active:"signup"})
}
const getLogin = (req,res) => {
    res.render('login',{active:"login"})
}
const signupUser = (req,res) => {
    User.register(new User({username: req.body.username, email: req.body.email}),req.body.password,(err,user)=>{
        if(err){
            req.flash('error','User already exists with the given username')
            return res.redirect('/signup');
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect('/profile')
        })
    })
}
const loginUser = (req, res,next)=>{
    passport.authenticate('local',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash:true,
        successFlash: true
    })(req,res,next)
    req.flash('error')
    req.flash('success',`Welcom Back ${req.body.username}`)
}
const getProfile = (req, res,next)=>{
    isLoggedIn(req,res,next)
}
const logoutUser = (req, res)=>{
    req.logout()
    req.flash('success','You have successfully logged out')
    res.redirect('/login')
}

module.exports = {
    getSignup,
    getLogin,
    signupUser,
    loginUser,
    getProfile,
    home,logoutUser
}