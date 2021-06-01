// SET UP DATABASE

// const mongoose = require('mongoose')

// const url = 'mongodb+srv://laurel:mernstack@cluster0.mm9cx.mongodb.net/EventsDB?retryWrites=true&w=majority'
// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
// mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. \n${err}`);
//     })


const mongoose = require('mongoose')

const url = 'mongodb+srv://laurel:mernstack@cluster0.mm9cx.mongodb.net/EventsDB?retryWrites=true&w=majority'
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

module.exports = function() {
    mongoose.connect(url,connectionParams)
        .then( () => {
            console.log('Connected to database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })
    };