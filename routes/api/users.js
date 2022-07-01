import express from "express";

export const router = express.Router();

router.get("/test", (req, res) => res.json({
    msg: "This is the user's route"
}));