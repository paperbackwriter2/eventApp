const Event = require('../models/event');
const request = require('request');
const axios = require('axios');


exports.createNewEvent = function(req, res) {
    // retrieve new event details from req body
    // get a photo from API which corresponds to event type
    let imageURL = ''
    request(`https://imagegen.herokuapp.com/?category=${req.body.category}`, { json: true }, (err, response, body) => {
    if (err) { 
        return console.log(err); 
    }
    imageURL = body.image;
    Event.create({
        title: req.body.title,
        category: req.body.category,
        cost: req.body.cost,
        image: imageURL
    }, (err, newEvent) => {
    if (err) {
        return res.status(500).json({message: err})
    } else {
        return res.status(200).json({message: "new event created", newEvent})
    }
    })
    });
} 

exports.fetchEvents = (req, res) => {
    // check req.query for filters
     let conditions = {};
 if (req.query.category) {
     conditions.category = req.query.category
    }
    // if there are filters, use them in Model.find query
    // fetch all events
    Event.find(conditions, (err, events) => {
        if (err) {
        return res.status(500).json({message: err})
        } else {
            return res.status(200).json({events})
        }
    }) 
}    

exports.fetchSingleEvent = (req, res) => {
    Event.findOne( {_id: req.params.id}, (err, event) => {
        if (err) {
            return res.status(500).json({message: err})
        } else if (!event) {
            return res.status(404).json({message: "event not found"})
        } else {
            return res.status(200).json({ event })
        }
    })
}

exports.updateSingleEvent = (req, res) => {
    Event.findOneAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        category: req.body.category,
        cost: req.body.cost
        }, (err, event) => {
        if (err) {
            return res.status(500).json({message: err}) 
        } else if (!event) {
            return res.status(404).json({message: "event not found"})
        } else {
            event.save((err, savedEvent) => {
                if (err) {
                    return res.status(400).json({message: err})
                } else {
                    return res.status(200).json({message: "event updated successfully"})
                }
            })
        }
    })
}

exports.deleteSingleEvent = (req, res) => {
    Event.findByIdAndDelete(req.params.id, (err, event) => {
        if (err) {
            return res.status(500).json({message: err}) 
        } else if (!event) {
            return res.status(404).json({message: "event not found"})
        } else {
            return res.status(200).json({message: "event deleted successfully"})
        }
    })
} 



// exports.createNewEvent = function(req, res) {
//     // retrieve new event details from req body
//     // get a photo from API which corresponds to event type
//     let imageURL = ''
//     request(`https://imagegen.herokuapp.com/?category=${req.body.category}`, { json: true }, (err, res, body) => {
//     if (err) { 
//         return console.log(err); 
//     }
//     imageURL = body.image;
//     });

//     Event.create({
//         title: req.body.title,
//         category: req.body.category,
//         cost: req.body.cost,
//         image: imageURL
//     }, (err, newEvent) => {
//         if (err) {
//             return res.status(500).json({message: err})
//         } else {
//             return res.status(200).json({message: "new event created", newEvent})
//         }
//     })
// } 