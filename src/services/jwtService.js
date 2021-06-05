// Two functions:

// creating a token 
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const expiry = Number(process.env.TOKEN_EXPIRY);

exports.createToken = (user) => {
    try {
        let token = jwt.sign({
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }, secret, {expiresIn: expiry})
        return token
    } catch(err) {
        console.log(err)
        return null
    }
}

// verifying a token
exports.decodeToken = (token) =>{
    try{
        let decodedToken = jwt.verify(token, secret);
        return decodedToken
    } catch(error) {
        console.log(error);
        return null;
    }
}




// jwt.verify(token, secret, (err, decodedToken) => {
//     if(err) return res.status(500).json({err});
//     // check if valid
//     if(!decodedToken){
//         return res.status(401).json({message: "invalid authorization token. please login"})
//     }
//     // allow user to continue with request
//     console.log(decodedToken)
//     req.user = decodedToken;
//     next()
// })