import { Strategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import { db } from "./keys.js";
import User from "../models/User.js";

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = db.secretOrKey;

export const passport = (passport) => {
    passport.use(new Strategy(options, (jwt_payload, done) => {
        console.log(jwt_payload);
        done();
    }));
};
