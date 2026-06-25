import { Document, Schema, model } from "mongoose";

export interface IAdmin extends Document {
    adminId: string;

    name: string;

    email: string;

    password: string;
    mustChangePassword: boolean;

    isActive: boolean;
}

const adminSchema = new Schema<IAdmin>(
    {
        adminId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },

        name: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
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

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Admin = model<IAdmin>(
    "Admin",
    adminSchema
);


// if (userId === "ADM01" && password === "admin01") {
//     const hashedPassword = await hashPassword(password);
//     const newAdmin = await Admin.create({
//         adminId: userId,
//         password: hashedPassword,
//     })

//     console.log(newAdmin);

//     return res.status(200).json({
//         success: true,
//         token: "blablabal",
//         user: {
//             id: newAdmin._id,
//             role: "admin",
//             name: "admin singh",
//         },
//     });
// }
