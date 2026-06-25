import { Document, Types } from "mongoose";

export interface ITeacher extends Document {
    name: string;
    email: string;
    assignedClass: Types.ObjectId | null;
    subjects: Array<string> | null;
    mobile: number;
    
    teacherId: string;
    password: string;
    mustChangePassword: boolean;

    isActive: boolean;
}