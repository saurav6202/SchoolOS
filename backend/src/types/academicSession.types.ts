import { Document } from "mongoose";

export interface IAcademicSession extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}