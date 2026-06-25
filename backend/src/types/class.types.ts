import { Document, Schema, Types, model } from "mongoose";

export interface IClass extends Document {
  name: number;
  section: string;

  classTeacherId?: Types.ObjectId;

  academicYear: string;

  subjects: Types.ObjectId[];

  isActive: boolean;
}