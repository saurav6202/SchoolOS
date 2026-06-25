import { Schema, model } from "mongoose";
import { ISchoolSettings } from "../types/schoolSettings.types";

const schoolSettingsSchema =
  new Schema<ISchoolSettings>(
    {
      schoolName: {
        type: String,
        required: true,
        trim: true,
      },

      schoolCode: {
        type: String,
        trim: true,
      },

      logo: {
        type: String,
      },

      phone: {
        type: String,
      },

      email: {
        type: String,
      },

      website: {
        type: String,
      },

      address: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );

export const SchoolSettings = model<ISchoolSettings>(
  "SchoolSettings",
  schoolSettingsSchema
);