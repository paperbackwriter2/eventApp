// SET UP DATABASE

// const mongoose = require('mongoose')

// const url = 'mongodb+srv://laurel:mernstack@cluster0.mm9cx.mongodb.net/EventsDB?retryWrites=true&w=majority'
// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }

// module.exports = function() {
//     mongoose.connect(url,connectionParams)
//         .then( () => {
//             console.log('Connected to database ')
//         })
//         .catch( (err) => {
//             console.error(`Error connecting to the database. \n${err}`);
//         })
//     };

// SETUP MONGOOSE
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/eventapp';

module.exports = function() {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('database connection successful')
        }       
    });
}




// const url = 'mongodb+srv://laurel:<password>@cluster0.mm9cx.mongodb.net/EventsDB?retryWrites=true&w=majority'
// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }

// module.exports = function() {
//     mongoose.connect(url,connectionParams)
//         .then( () => {
//             console.log('Connected to database ')
//         })
//         .catch( (err) => {
//             console.error(`Error connecting to the database. \n${err}`);
//         })
//     };
