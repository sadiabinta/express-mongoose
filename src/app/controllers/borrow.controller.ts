import { Book } from './../models/books.model';
import express, { Request, Response } from "express"
import { Borrow } from "../models/borrow.model"

export const borrowRoutes=express.Router()

borrowRoutes.post('/',async(req:Request,res:Response)=>{
    const body=req.body;
    const bookId=body.book
    const borrow=await Borrow.create(body)

    const updatedBook=await Book.findOneAndUpdate({ _id: bookId, copies: { $gt: 0 } },
    { $inc: { copies: -1 } },{ new: true } )


    res.status(201).json({
        success:true,
        message:"Book borrowed successfully",
        data:borrow
    })
})

borrowRoutes.get('/',async(req:Request,res:Response)=>{
    const borrowedBook=await Borrow.aggregate([
          {
    $group: {
      _id: "$book",
      totalQuantity: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "_id",
      as: "bookDetails"
    }
  },
  {
    $unwind: "$bookDetails" 
  },
  {
    $project: {
      _id: 0,
      totalQuantity: 1,
      book: {
        title: "$bookDetails.title",
        isbn: "$bookDetails.isbn"
      }
    }
  }
    ])

    res.status(201).json({
        success:true,
        message:"Borrowed books summary retrieved successfully",
        data:borrowedBook
    })
})