import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const BookingSchema=new Schema(
    {
        userBooked:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        trip:{
            type:Schema.Types.ObjectId,
            ref:"GroupTrip"
        },
        bookingDate:{
            type:String,
        },
        payment:{
            type:Schema.Types.ObjectId,
            ref:"Payment",
        },
        specialRequirement:{
            type:String
        },
        BookingStatus:{
            type:Boolean
        }

    },
    {
        timestamps:true
    }
);

export const Booking=mongoose.model("Booking",BookingSchema);