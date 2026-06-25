import { Request, Response } from "express";
import { Subject } from "../models/Subject";
import { Document } from "mongoose";

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, category, code } = req.body;
    if (!name || !category || !code) {
      return res.status(403).json({
        message: "All fields are required",
      });
    }

   await Subject.create({ name, code, category });

    return res.status(200).json({
      message: "New subject created",
    });
  } catch (error) {
    console.log("Error in creating new subject: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getSubjectStats = async (req: Request, res: Response) => {
  try {
    const totalSubjects = (await Subject.countDocuments()) ?? 0;
    const coreSubjects =
      (await Subject.find({ category: "core" }).countDocuments()) ?? 0;
    const optionalSubjects =
      (await Subject.find({ category: "optional" }).countDocuments()) ?? 0;
    return res.status(200).json({
      data: { totalSubjects, coreSubjects, optionalSubjects },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await Subject.find({});
    return res.status(200).json({
      data: subjects,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
