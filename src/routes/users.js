import express from "express";
const router = express.Router();

import actions from "../actions/users.js";

//add users
router.post("/register", actions.register);

//get user
router.get("/all", actions.authenticate, actions.getAll);

//update user
router.put("/:id", actions.updateOne);

//delete user
router.delete("/:id", actions.deleteOne);

//get one
router.get("/:id", actions.getOne);

//login
router.post("/login", actions.login);

export { router as usersRoutes };
