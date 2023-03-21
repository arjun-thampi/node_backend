import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//add lib
const addLib = async (req, res) => {
  try {
    const {
      user_id,
      book_id,
      book_returned,
      book_taken,
      bookreturned_at,
      booktaken_at,
    } = req.body;

    const libManagements = await prisma.libManage.create({
      data: {
        user_id,
        book_id,
        book_returned,
        book_taken,
        bookreturned_at,
        booktaken_at,
      },
    });

    return res.status(200).send({
      data: libManagements,
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

const actions = { addLib };
export default actions;
