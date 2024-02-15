import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

//paymet schema will change when we use payment gate way
const PaymentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        trip: {
            type: Schema.Types.ObjectId,
            ref: "GroupTrip"
        },
        PaymentDate: {
            type: String,
        },
        PaymentMethod:{
            type:String,
        },
        PaymentStatus: {
            type: Boolean
        }

    },
    {
        timestamps: true
    }
);

export const Payment = mongoose.model("Payment", PaymentSchema);