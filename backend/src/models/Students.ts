import { Schema, model } from "mongoose";
import { IStudent } from "../types/student.types";

const studentSchema = new Schema<IStudent>(
    {
        studentId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        classId: {
            type: Schema.Types.ObjectId,
            ref: "Class",
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        admissionNo: {
            type: Number,
            required: true,
        },

        rollNumber: {
            type: Number,
            required: true,
        },

        fatherName: {
            type: String,
            required: true,
        },

        motherName: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        mustChangePassword: {
            type: Boolean,
            default: true,
        },

        mobile: {
            type: Number,
            required: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

studentSchema.index(
    {
        classId: 1,
        admissionNo: 1,
        rollNumber: 1,
    },
    {
        unique: true,
    },
);

export const Student = model<IStudent>("Student", studentSchema);