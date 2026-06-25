import { Document, Types } from "mongoose";

export interface IAttendance extends Document {
  classId: Types.ObjectId | string;

  sessionId: Types.ObjectId;

  markedBy: Types.ObjectId;

  date: string;

  records: {
    studentId: Types.ObjectId;

    isPresent: boolean;
  }[];
}
