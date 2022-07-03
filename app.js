import path from "path";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { key } from "./config/keys.js";
import { router as users} from "./routes/api/users.js";
import { router as tweets } from "./routes/api/tweets.js"
import * as PassportUtil from "./config/passport.js";
import passport from "passport";

import cors from "cors";

// import expressListRoutes from "express-list-routes";  

const app = express();

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.use(cors());

mongoose
  .connect(key.mongoURI, { useNewUrlParser: true })
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