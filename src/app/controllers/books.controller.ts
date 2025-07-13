import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { z } from "zod";

export const booksRoutes = express.Router();

const CreateBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean(),
});

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = await CreateBookZodSchema.parseAsync(req.body);

    const book = await Book.create(body);

    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    let books = [];
    const { filter, sortBy, sort, limit }: any = req.query;
    const limitNum = limit ? limit : 20;
    const filterCondition = filter ? { genre: filter } : {};

    books = await Book.find(filterCondition)
      .sort({ [sortBy]: sort === "desc" ? -1 : 1 })
      .limit(limitNum);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if (book) {
      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book Not Found",
        data: book,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
booksRoutes.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedInfo = req.body;
    const book = await Book.findByIdAndUpdate(bookId, updatedInfo, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findOneAndDelete({ _id: bookId }, { new: true });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
