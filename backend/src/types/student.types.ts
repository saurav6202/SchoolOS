import { Document, Types } from "mongoose";

export interface IStudent extends Document {
  studentId: string;
  classId: Types.ObjectId | null;
  name: string;
  password: string;
  admissionNo: number;
  rollNumber: number;
  fatherName: string;
  motherName: string;
  mobile: number;
  isActive: boolean;
  mustChangePassword: boolean;
}