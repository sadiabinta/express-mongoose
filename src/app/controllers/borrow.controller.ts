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
    
    // if(copies){
    //     copies=copies-1;
    //     book?.copies=copies;
    //     await book?.save()
    // }

    // const borrow=new Borrow(body)
    // console.log(borrow.updateAvailability(4));
    
    // borrow.save()

    res.status(201).json({
        success:true,
        message:"Book borrowed successfully",
        data:borrow
    })
})

borrowRoutes.get('/',async(req:Request,res:Response)=>{
    const borrowedBook=await Borrow.find().populate('book')

    res.status(201).json({
        success:true,
        message:"Book borrowed successfully",
        data:borrowedBook
    })
})