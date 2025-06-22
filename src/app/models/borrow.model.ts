import { Model, model, Schema } from 'mongoose';
import { BorrowInstanceMethod, IBorrow } from './../interfaces/borrow.interface';

const borrowSchema=new Schema<IBorrow, Model<IBorrow>,BorrowInstanceMethod>({
    book:{type:Schema.Types.ObjectId,ref:"Book",required:true},
    quantity:{type:Number,min:[0,'Copies must be a positive number'],required:true},
    dueDate:{type:Date,required:true}
},{
    timestamps:true,
    versionKey:false
})

borrowSchema.method('updateAvailability',function updateAvailability(copies:number){

    if(copies==0){
        this.save();
        return false;
    }
    else {return true}
})

export const Borrow=model("Borrow",borrowSchema)