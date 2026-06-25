import { Schema, model } from "mongoose";
import { ITeacher } from "../types/teacher.types";


const teacherSchema = new Schema<ITeacher>(
    {
        teacherId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },
        mustChangePassword: {
            type: Boolean,
            default: true,
        },

        assignedClass: {
            type: Schema.Types.ObjectId,
            ref: "Class",
        },
        subjects: [
            {
                type: Schema.Types.ObjectId,
                ref: "Subject",
            }
        ],
        mobile: {
            type: Number,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Teacher = model<ITeacher>(
    "Teacher",
    teacherSchema
);