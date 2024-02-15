import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const groupTripPlannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    destination: [
      {
        startToendTripDetails: {
          type: Object,
          required: true,
        },
        otherField: String,
      },
    ],
    typeOfTrip: {
      type: String,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
    },
    totalPrice: {
      type: String,
    },
    availability: {
      type: Object,
    },
    imageURL: {
      type: String,
    },
    videoURL: {
      type: String,
    },
    travelInfo: {
      type: Object,
    },
    plannerId: {
      type: Schema.Types.ObjectId,
      ref: "Planner",
    },
  },
  {
    timestamps: true,
  }
);

groupTripPlannerSchema.plugin(mongooseAggregatePaginate);
export const GroupTrip = mongoose.model("GroupTrip", groupTripPlannerSchema);
