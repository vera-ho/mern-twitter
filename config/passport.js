import { Strategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
// import { key } from "./keys.js";
import key from "../config/keys.js";
import User from "../models/User.js";

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = key.default.secretOrKey;

export const passport = (passport) => {
    passport.use(new Strategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then( user => {
                if(user) {
                    return done(null, user);
                }
                return done(null, false);
            }).catch( err => console.log(err));
        // console.log(jwt_payload);
        // done();
    }));
};
