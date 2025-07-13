import { model, Schema } from "mongoose";
import { BookModel, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
        "HORROR",
      ],
      required: true,
      trim: true,
      uppercase: true,
    },
    isbn: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: true,
      trim: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.statics.borrowBook = async function (
  bookId: string,
  quantity: number
): Promise<IBook | null> {
  const updatedBook = await this.findOneAndUpdate(
    { _id: bookId, copies: { $gte: quantity } },
    {
      $inc: { copies: -quantity },
    },
    { new: true }
  );

  if (updatedBook) {
    if (updatedBook.copies === 0 && updatedBook.available !== false) {
      updatedBook.available = false;
      await updatedBook.save();
    } else if (updatedBook.copies > 0 && updatedBook.available !== true) {
      updatedBook.available = true;
      await updatedBook.save();
    }
  }

  return updatedBook;
};

export const Book = model<IBook, BookModel>("Book", bookSchema);
