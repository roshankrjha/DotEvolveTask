require('dotenv').config()
const express = require('express')
const app = express()

const connectDB = require('./server/db/connect')
const User = require('./server/models/user')
const bodyParser = require('body-parser')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')
const expressSession = require('express-session')
const userRoute = require('./server/routes/user')
const flash = require('connect-flash')

// Set Properties
app.set('view engine', 'ejs')

// Middleware
app.use(bodyParser.urlencoded({ extended:true}))
app.use(express.static('public'))
app.use(flash())
app.use(expressSession({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// Routes
app.use('/',userRoute)

// Server setup
const port = process.env.PORT || 5000
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
           console.log(`Server is running on ${port}`)
        })
    } catch (error) {
        console.error(error)
    }
}

startServer()