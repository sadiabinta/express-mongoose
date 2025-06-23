import { Book } from './../models/books.model';
import express, { Request, Response } from "express"
import { Borrow } from "../models/borrow.model"

export const borrowRoutes=express.Router()

borrowRoutes.post('/',async(req:Request,res:Response)=>{
    try{
      const { book: bookId, quantity } = req.body;

    const updatedBook=await Book.borrowBook(bookId,quantity)
 
      const borrow = await Borrow.create({
      book: bookId,
      quantity,
      dueDate: req.body.dueDate
    });

    res.status(201).json({
        success:true,
        message:"Book borrowed successfully",
        data:borrow
    })
    }catch(error){
       res.status(404).json({
            message:"Validation failed",
            success:false,
            error
    })
    }
})

borrowRoutes.get('/',async(req:Request,res:Response)=>{
    try{
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
    }catch(error){
      res.status(404).json({
            message:"Validation failed",
            success:false,
            error
    })
    }
})