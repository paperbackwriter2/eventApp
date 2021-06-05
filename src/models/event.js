const mongoose = require('mongoose');

// CREATE SCHEMA
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['business', 'casual', 'party', 'general']
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String
    }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event;