import { Strategy, ExtractJwt } from "passport-jwt";
import mongoose from "mongoose";
import { db } from "./keys";
import User from "../models/User";

