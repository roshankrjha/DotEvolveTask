const express = require('express');
const router = express.Router()

const {home,getSignup,getLogin,signupUser,loginUser,getProfile,logoutUser} = require('../controllers/userController')
router.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
  
router.route('/').get(home)
router.route('/profile').get(getProfile)
router.route('/signup').get(getSignup).post(signupUser)
router.route('/login').get(getLogin).post(loginUser)
router.route('/logout').get(logoutUser)

module.exports = router