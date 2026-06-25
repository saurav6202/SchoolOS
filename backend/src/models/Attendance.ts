import { Schema, model } from "mongoose";
import { IAttendance } from "../types/attendance.types";

const attendanceSchema = new Schema<IAttendance>(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },

    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSession",
      required: true,
    },

    markedBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    date: {
      type: String,
      required: true,
      index: true,
    },

    records: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        isPresent: {
          type: Boolean,
          default: false,
        }
      },
    ],
  },
  {
    timestamps: true,
  },
);

attendanceSchema.index(
  {
    classId: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

export const Attendance = model<IAttendance>("Attendance", attendanceSchema);
