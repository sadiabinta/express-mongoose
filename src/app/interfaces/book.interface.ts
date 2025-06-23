import { Model } from "mongoose";

export interface BookModel extends Model<IBook> {
  borrowBook(bookId: string, quantity: number): Promise<IBook | null>;
}

export interface IBook{
    title:string,
    author:string,
    genre:"FICTION"|"NON_FICTION"|"SCIENCE"|"HISTORY"|"BIOGRAPHY"|"FANTASY"
    isbn:string,
    description:string,
    copies:number,
    available:boolean
}