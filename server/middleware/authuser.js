const isLoggedIn = (req, res, next) =>{
    if(req.isAuthenticated()){
        req.flash("success",`Welcome ${req.user.username}`)
        return res.render('profile',{username:req.user.username,useremail:req.user.email,active:"active"})
    }
    req.flash('error',"User not authenticated")
    res.redirect('/login')
}

module.exports = isLoggedIn