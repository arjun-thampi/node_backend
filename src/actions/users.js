import { PrismaClient } from "@prisma/client";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
const JWT_SECRET = "your_secret_key_here";

//add user register

const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
    });

    delete user.password;

    return res.status(200).send({
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      error: {
        message: error.message,
        code: 500,
      },
    });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in database by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      // Send back error message if user not found
      res.status(404).json({ message: "User not found" });
    } else {
      // Check if password matches hashed password in database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        // Send back error message if password does not match
        res.status(401).json({ message: "Incorrect password" });
      } else {
        // Create and sign JWT token with user ID and secret key
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: 300,
        });
        console.log(token);

        // Send back success message with token
        res.status(200).json({
          message: "Login successful",
          token,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all users
const getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany({});
    const allUsers = users.map((user) => exclude(user, ["password"]));
    res.status(200).send({
      data: allUsers,
    });
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        code: 500,
      },
    });
  }
};

//get one user

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const oneUser = await prisma.user.findUnique({
      where: { id: id },
    });
    res.status(200).send({
      data: oneUser,
    });
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        code: 500,
      },
    });
  }
};

//update user
const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, phone } = req.body;

    const updateData = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        password,
        phone,
      },
    });
    res.status(200).send({
      data: updateData,
    });
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        code: 500,
      },
    });
  }
};

//delete one
const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteData = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).send({
      data: deleteData,
    });
  } catch (error) {
    res.status(500).send({
      error: {
        message: error.message,
        code: 500,
      },
    });
  }
};

const actions = {
  register,
  getAll,
  updateOne,
  deleteOne,
  getOne,
  login,
};
export default actions;
