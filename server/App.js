const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./models/user')
const config = require('./config/key')
const { auth } = require('./middleware/auth')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())


//connecting to mongodb function
mongoose.connect(config.mongoURI,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useFindAndModify: false
}).then(() => console.log('DB connected'))
.catch(err => console.log(err))


//signup function
app.post('/api/users/signup', (req, res) => {
    const user = new User(req.body)

    user.save((err, userData) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

//login function
app.post('/api/users/login', (req, res) => {
    //find the email
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) 
        return res.json ({
            loginSuccess: false,
            message: "Auth failed, email not found"
        })

        //compare password --here we will make comparePassword function in the user model
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
                return res.json ({ loginSuccess: false, message: "wrong password"})
            }
        })

        //generate Token
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err)
            res.cookie("x_auth", user.token)
                .status(200)
                .json({
                    loginSuccess: true,
                })
        })
    })
})

//Authentication Middleware function
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    })
})

//Logout function
app.get('/api/users/logout', auth, (req,res) =>{
    //for the id in model equals to our id ==> make the token empty so we log out
    // note: we must use auth midware to be able to use req.user which is assigned in it
    User.findByIdAndUpdate({_id: req.user._id}, {token: ""}, (err, doc) =>{
        if(err) return res.json ({ success: false, err })
        return res.status(200).send({
            success: true
        }) 
    })
})

app.get('/', (req, res) =>{
    res.json({ "hello": "i am happy that it works !" })
})


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server running at ${port}`)
})
