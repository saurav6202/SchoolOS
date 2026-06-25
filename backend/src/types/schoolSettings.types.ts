import { Document } from "mongoose";

export interface ISchoolSettings extends Document {
  schoolName: string;
  schoolCode?: string;

  logo?: string;

  phone?: string;
  email?: string;
  website?: string;
  address?: string;

  createdAt: Date;
  updatedAt: Date;
}