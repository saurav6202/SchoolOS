import { Schema, model } from "mongoose";

const holidaySchema = new Schema(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "Class Holiday",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  { timestamps: true },
);

export const Holiday = model("Holiday", holidaySchema);
