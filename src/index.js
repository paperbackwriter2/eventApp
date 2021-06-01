const express = require('express');
const app = express();
const port = 4000;
const dbSetup = require('./database/setup.js')
const eventRoutes = require('./routes/eventRoutes')

app.use(express.json())

// SETUP DB
dbSetup()

app.use(eventRoutes)

app.listen(port, () => console.log(`app listening on port ${port}`));


