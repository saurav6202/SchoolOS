import { Schema, model } from "mongoose";
import { IClass } from "../types/class.types";

const classSchema = new Schema<IClass>(
  {
    name: {
      type: Number,
      required: true,
    },

    section: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    classTeacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    academicYear: {
      type: String,
      required: true,
      default: "2026-27",
    },

    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

classSchema.index(
  {
    name: 1,
    section: 1,
    academicYear: 1,
  },
  {
    unique: true,
  },
);

export const Class = model<IClass>("Class", classSchema);
