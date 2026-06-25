import { model, Schema } from "mongoose";

const subjectSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        code: String,
        category: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Subject = model("Subject", subjectSchema);