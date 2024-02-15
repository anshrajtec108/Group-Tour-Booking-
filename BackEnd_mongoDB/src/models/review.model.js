import mongoose, { Schema } from "mongoose";


const reviewSchema=new Schema(
    {
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
        },
        trip: {
            type: Schema.Types.ObjectId,
            ref: "GroupTrip"
        },
        rating:{
            type:Number,
        },
        comment:{
            type:String,
        },
    },
    {
        timestamps:true
    }
);

export const Review=mongoose.model("Review",reviewSchema);