import express from "express";
const router = express.Router();

import actions from "../actions/books.js";

//add books
router.post("/", actions.addBook);

//get books
router.get("/", actions.getAll);

export { router as booksRoutes };
