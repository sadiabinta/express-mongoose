import express, { Request, Response } from "express"
import { Borrow } from "../models/borrow.model"

export const borrowRoutes=express.Router()

borrowRoutes.post('/',async(req:Request,res:Response)=>{
    const body=req.body;
    // const borrow=await Borrow.create(body)
    const borrow=new Borrow(body)
    console.log(borrow.updateAvailability(4));
    
    borrow.save()

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