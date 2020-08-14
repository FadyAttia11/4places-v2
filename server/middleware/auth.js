const { User } = require('../models/user')

let auth = (req, res, next) => {
    let token = req.cookies.x_auth

    User.findByToken(token, (err, user) => {
        if(err) throw err
        if(!user) return res.json({
            isAuth: false,
            error: true
        })

        //change it to the token in the cookies
        req.token = token
        //change it to the user related to cookies' token -- the return of the above function
        req.user = user
        next()
    })
}

module.exports = { auth }