const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
// const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

router.post('/api/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        // sendWelcomeEmail(user.email, user.name)
        const token = await user.createAuthToken()
        await user.save()
        res.status(201).send({ user, token })
    }catch(e) {
        res.status(400).send(e)
    }
})

router.post('/api/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.createAuthToken()
        await user.save()
        res.cookie("x_auth", token)
        .status(200)
        .json({
            loginSuccess: true,
            user, 
            token
        })
    }catch(e){
        res.status(400).send()
    }
})

router.get('/api/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send({ logoutSuccess: true })
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()

    } catch (e) {
        res.status(500).send()
    }
})

//get all users (NEW)
router.get('/api/users/all', async (req, res) => {
    const users = await User.find({})
    res.send(users)
})

//read my profile
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})


router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body) //take all keys and put them into an array
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({ error: 'invalid updates!' })

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save() //use these 3 lines not the commented one for using middleware for pre-save command
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user) return res.status(404).send()
        await req.user.remove()
        // sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)/)){
            cb(new Error('please upload an image!'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer //req.file ==> the image is accessible here
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})


router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png') //set the expected coming type to jpg
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router