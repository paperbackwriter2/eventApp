const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "superSECUREsecret";
const expiry = 3600;

exports.registerNewUser = (req, res) => {
    // fetch user details from req body
    // check if a user with this email exists
    User.findOne({email: req.body.email}, (err, existingUser) => {
        if(err) {
            return res.status(500).json({err})
        } 
        if (existingUser) {
            //
            return res.status(500).json({existingUser});
            return res.status(400).json({message: "user with this email already exists"})
        }
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, (err, newUser) => {
            if(err) {
                return res.status(500).json({err})
            }
            // hash user's password
            bcrypt.genSalt(10, (err, salt) => {
                if(err){
                    return res.status(500).json({err})
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).json({err})
                    }
                    //
                    // return res.status(500).json({hashedPassword})
                    // save password to db
                    newUser.password = hashedPassword;
                    newUser.save((err, savedUser) => {
                        if (err) {
                            return res.status(500).json({err})
                    
                        }

                        // create jwt for user
                        jwt.sign(
                            {
                                id: newUser._id,
                                email: newUser.email,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                role: newUser.role
                            }, secret, ({expiresIn: expiry}, (err, token) => {
                                if (err) {
                                    return res.status(500).json({err})
                                }
                            return res.status(200).json({
                                message: "user registration successful",
                                token
                            })
                            })
                        )
                    })
                })
            })
            })
        })
    }

    // create a new user (if does not exist)

    // hash user's password
    // save password to database
    // create jwt for user
    // send token to user

exports.loginUser = (req, res) => {
    // check if user exists
    User.findOne({email: req.body.email}, (err, foundUser) => {
        if(err) {
            return res.status(500).json({err})
        }
        if(!foundUser) {
            return res.status(401).json({message: "incorrect email"})
        } 
        let match = bcrypt.compareSync(req.body.password, foundUser.password);
        if(!match) {
            return res.status(401).json({message: "incorrect password"})
        } 
        // create a token
        jwt.sign({
            id: foundUser._id,
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            role: foundUser.role
        }, secret, {
        expiresIn: expiry
    }, (err, token) => {
        if(err) {
            return res.status(500).json({err})
        }
        return res.status(200).json({
            message: "user logged in",
            token
        })
    })
    // check if password is correct
    // send token
})
}