const express = require('express');
const router = express.Router();
const EventCtrl = require('../controllers/eventControllers');
const {authenticateUser, checkIfAdmin} = require('../middlewares/authentication')

// POST to /events to create a new event
router.post('/events', authenticateUser, EventCtrl.createNewEvent)

// GET request to /events to fetch all events
router.get('/events', authenticateUser, EventCtrl.fetchEvents)

// GET request to /events/:id to fetch specific event
router.get('/events/:id', authenticateUser, EventCtrl.fetchSingleEvent)

// PUT request to /events/:id to update specific event
router.put('/events/:id', authenticateUser, checkIfAdmin, EventCtrl.updateSingleEvent)

// DELETE request to /events/:id to dete a single event
router.delete('/events/:id', authenticateUser, checkIfAdmin, EventCtrl.deleteSingleEvent)



module.exports = router;