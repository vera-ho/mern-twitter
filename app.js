import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { db } from "./config/keys.js";
import { router as users} from "./routes/api/users.js";
import { router as tweets } from "./routes/api/tweets.js"
import * as PassportUtil from "./config/passport.js";
import passport from "passport";

import cors from "cors";

// import expressListRoutes from "express-list-routes";  

const app = express();
app.use(cors());

mongoose
  .connect(db.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
PassportUtil.passport(passport);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use("/api/users", users);
app.use("/api/tweets", tweets);

// display routes in console
// expressListRoutes(app, { prefix: "/api" });