import express from "express";
import cors from "cors";

import { usersRoutes } from "./routes/users.js";
import { booksRoutes } from "./routes/books.js";
import { libRoutes } from "./routes/libmanage.js";

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/books", booksRoutes);
app.use("/manage", libRoutes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: false,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
