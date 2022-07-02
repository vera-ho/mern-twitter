import express from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import { db } from "../../config/keys.js";
import passport from "passport";

export const router = express.Router();

router.get("/test", (req, res) => res.json({
    msg: "This is the user's route"
}));

router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email })
        .then( user => {
            if(user) {
                return res.status(400).json({ email: "A user has already registered with this address" })
            } else {
                const newUser = new User({
                    handle: req.body.handle,
                    email: req.body.email,
                    password: req.body.password
                })
                
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = { id: user.id, handle: user.handle };
                                jwt.sign( payload, 
                                    db.secretOrKey, 
                                    { expiresIn: 3600 }, 
                                    (err, token) => {
                                        res.json({
                                            success: true,
                                            token: "Bearer " + token
                                        })
                                })
                            })
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then( user =>  {
            if(!user) {
                return res.status(404).json({ email: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then( isMatch => {
                    if(isMatch) {
                        const payload = { id: user.id, handle: user.handle };

                        jwt.sign(
                            payload,
                            db.secretOrKey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                })
                            }
                        )
                        // res.json({ msg: 'Success' });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' })
                    }
                })
        })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ 
        id: req.user.id,
        handle: req.user.handle,
        email: req.user.email,
        // msg: 'Success' 
    });
})

