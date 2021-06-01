const express = require('express');
const router = express.Router();
const EventCtrl = require('../controllers/eventControllers');
console.log(EventCtrl)

// POST to /events to create a new event
router.post('/events', EventCtrl.createNewEvent)

// GET request to /events to fetch all events
router.get('/events', EventCtrl.fetchEvents)

// GET request to /events/:id to fetch specific event
router.get('/events/:id', EventCtrl.fetchSingleEvent)

// PUT request to /events/:id to update specific event
router.put('/events/:id', EventCtrl.updateSingleEvent)

// DELETE request to /events/:id to dete a single event
router.delete('/events/:id', EventCtrl.deleteSingleEvent)

module.exports = router;