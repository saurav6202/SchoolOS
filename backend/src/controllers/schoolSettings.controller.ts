import { Request, Response } from "express";
import { SchoolSettings } from "../models/SchoolSettings";
import { runInNewContext } from "node:vm";

export const getSchoolSettings = async (req: Request, res: Response) => {
  try {
    const settings = await SchoolSettings.findOne();

    return res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const saveSchoolSettings = async (req: Request, res: Response) => {
  console.log("saving....")
  try {
    const { schoolName, schoolCode, phone, email, website, address } = req.body;

    const logo = req.file?.path;

    let settings = await SchoolSettings.findOne();

    if (!settings) {
      settings = await SchoolSettings.create({
        schoolName,
        schoolCode,
        phone,
        email,
        website,
        address,
        logo,
      });
    } else {
      settings.schoolName = schoolName;
      settings.schoolCode = schoolCode;
      settings.phone = phone;
      settings.email = email;
      settings.website = website;
      settings.address = address;
      settings.logo = logo || settings.logo;

      await settings.save();
    }

    console.log("req.body: ", req.body);
    console.log("req.file: ", logo, "file: ", req.file);

    return res.status(200).json({
      success: true,
      message: "School settings saved successfully",
      data: settings,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }finally{
    console.log("done...")
  }
};
