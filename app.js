import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { db } from "./config/keys.js";
import { router as users} from "./routes/api/users.js";
import { router as tweets } from "./routes/api/tweets.js"
import * as PassportUtil from "./config/passport.js";
import passport from "passport";
// import User from "./models/User.js";

const app = express();

mongoose
  .connect(db.mongoURI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(passport.initialize());
PassportUtil.passport(passport);

// app.get("/", (req, res) => {
//   res.send("Adopt a Dino");
// })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use("/api/users", users);
app.use("/api/tweets", tweets);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

