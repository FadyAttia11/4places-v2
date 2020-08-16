const express = require('express')
const Place = require('../models/place')
const auth = require('../middleware/auth')
const router = new express.Router()


//create new place
router.post('/api/places', auth, async (req, res) => {
    const place = new Place({
        ...req.body,
        ownerID: req.user._id,
        ownerName: req.user.name
    })
    try {
        await place.save()
        res.status(201).send(place)
    }catch(e){
        res.status(400).send(e)
    }
})

//get all places (NEW)
router.get('/api/places/all', async (req, res) => {
    const places = await Place.find({})
    res.send(places)
})

router.post('/api/places/find', async (req, res) => {
    const places = await Place.find({
        keywords: req.body.searchValue
    })
    res.send(places)
})

//get all places for a specific user by his id (NEW)
router.get('/api/places/all/:id', async (req, res) => {
    const _id = req.params.id //user id (NOT place id)
    const places = await Place.find({ ownerID: _id })
    res.send(places)
})

//GET /places?completed=true
//GET /places?limit=10&skip=20
//GET /places?sortBy=createdAt:desc
router.get('/api/places',auth, async (req, res) => {
    const match = {}
    const sort = {}

    //make the query boolean instead of string then make the match completed like it
    if(req.query.completed) match.completed = req.query.completed === 'true'

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        const places = await Place.find({ ownerID: req.user._id }) //first approach
        // await req.user.populate({
        //     path: 'places',
        //     match, //used for filtering (like showing only the false or true places)
        //     options: { //used for paginating (limiting data for single page)
        //         limit: parseInt(req.query.limit), //for limit the data for single page
        //         skip: parseInt(req.query.skip), //for showing the 2nd or 3rd pages
        //         sort
        //     }
        // }).execPopulate() //second approach
        // res.send(req.user.places)
        res.send(places)
    }catch(e){
        res.status(500).send()
    }
})


router.get('/places/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const place = await Place.findOne({ _id, ownerID: req.user._id })
        if(!place) return res.status(404).send()
        res.send(place)
    }catch(e){
        res.status(500).send()
    }
})

router.patch('/places/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body) //take all keys and put them into an array
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) return res.status(400).send({ error: 'invalid updates!' })

    const _id = req.params.id

    try {
        const place = await Place.findOne({ _id, ownerID: req.user._id })
        if(!place) return res.status(404).send()

        updates.forEach((update) => place[update] = req.body[update])
        await place.save() //use these 3 lines not the commented one for using middleware for pre-save command
        // const place = await Place.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
        
        res.send(place)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/places/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const place = await Place.findOneAndDelete({ _id, ownerID: req.user._id })
        if(!place) return res.status(404).send()

        res.send(place)
    }catch(e){
        res.status(500).send()
    }
})


//delete all places for all users (for development only) (NEW)
router.delete('/api/places/all', async (req, res) => {
    await Place.deleteMany({})
    res.send()
})


module.exports = router