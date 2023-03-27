import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//add book
const addBook = async (req, res) => {
  try {
    const { name, author, price } = req.body;

    const existingContent = await prisma.books.findFirst({
      where: {
        name: name,
      },
    });

    if (existingContent) {
      return res.status(400).json({ error: "content already exist" });
    }

    const book = await prisma.books.create({
      data: {
        name,
        author,
        price,
      },
    });

    return res.status(200).send({
      data: book,
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

//get all books
const getAll = async (req, res) => {
  try {
    const books = await prisma.books.findMany({});
    const allBooks = books.map((book) => book);
    res.status(200).send({
      data: allBooks,
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

const actions = { addBook, getAll };
export default actions;
