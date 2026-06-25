import { Schema, model } from "mongoose";

const academicWorkSchema = new Schema(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    works: [
      {
        subjectId: {
          type: Schema.Types.ObjectId,
          ref: "Subject",
          required: true,
        },

        classwork: {
          type: String,
          trim: true,
          default: "",
        },

        homework: {
          type: String,
          trim: true,
          default: "",
        },
      },
    ],

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicWorkSchema.index(
  {
    classId: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

export const AcademicWork = model("AcademicWork", academicWorkSchema);
