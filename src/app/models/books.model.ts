import { model, Schema } from "mongoose"
import { IBook } from "../interfaces/book.interface"

const bookSchema=new Schema<IBook>({
    title:{type:String,required:true,trim:true},
    author:{type:String,required:true,trim:true},
    genre:{
        type:String,
        enum:["FICTION","NON_FICTION","SCIENCE","HISTORY","BIOGRAPHY","FANTASY"],
        required:true,trim:true,uppercase:true},
    isbn:{type:String,required:true,trim:true,unique:true},
    description:{type:String,trim:true},
    copies:{type:Number,required:true,trim:true,min:[0,"Copies must be a positive number"]},
    available:{type:Boolean,default:true}
},{
    timestamps:true,
    versionKey:false
}
)

export const Book=model<IBook>("Book",bookSchema)