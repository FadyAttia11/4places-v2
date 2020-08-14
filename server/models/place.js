const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, //define type as an ID
        required: true,
        ref: 'User' //show all the user data with the same ID in owner objectID ==> refenence one user
    }
}, {
    timestamps: true
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place