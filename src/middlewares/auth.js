import { PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";

const JWT_SECRET = "your_secret_key_here";

// authentication middlewire

function authenticate(req, res, next) {
  let authHeader = req.headers.authorization;
  if (authHeader == undefined) {
    res.status(401).send({ error: "no token provided" });
  }
  let token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, function (err, decoded) {
    if (err) {
      res.status(500).send({ error: "Authentiction failed" });
    } else {
      next();
    }
  });
}

export default authenticate;
