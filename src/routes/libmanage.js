import express from "express";
const router = express.Router();

import actions from "../actions/libmanage.js";

//add libmanage
router.post("/", actions.addLib);

export { router as libRoutes };
