const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const saltRounds = 10;

const userSchema = mongoose.Schema({

    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//when modifing any password this function will encrypt it with bcrypt
userSchema.pre('save', function( next ){
    var user = this

    if(user.isModified('password')){

        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)

                user.password = hash
                next()
            })
        })

    }else {
        next ()
    }
})

//to compare password and return true if they match
userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err)
        cb(null, isMatch)
    })
}

//to generate token for the user_id and save it on token key to the mongo database
userSchema.methods.generateToken = function(cb){
    var user = this
    //user._id is made by mongodb to identify every query 
    var token = jwt.sign(user._id.toHexString(), 'secret')

    //user.token is the property of our user object above
    user.token = token
    //to save the token propery to the mongo database
    user.save(function (err, user){
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this

    // decode is the user._id for specific user related to secret word
    jwt.verify(token, 'secret', function(err, decode){
        user.findOne({"_id": decode, "token": token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema)

module.exports = { User }