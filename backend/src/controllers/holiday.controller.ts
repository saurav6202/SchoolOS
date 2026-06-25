import { Request, Response } from "express";
import { Holiday } from "../models/Holiday";
import mongoose from "mongoose";

export const markHoliday = async (req: Request, res: Response) => {
  try {
    const { classId, date } = req.body;

    const existingHoliday = await Holiday.findOne({
      classId,
      date,
    });

    if (existingHoliday) {
      return res.status(400).json({
        success: false,
        message: "Holiday already marked for today",
      });
    }

    const holiday = await Holiday.create({
      classId,
      date,
      createdBy: req.user!.id,
    });

    return res.status(201).json({
      success: true,
      data: holiday,
      message: "Holiday marked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};
export const unMarkHoliday = async (req: Request, res: Response) => {
  try {
    const { classId, date } = req.body;

    const existingHoliday = await Holiday.findOneAndDelete({
      classId,
      date,
    });

    if (!existingHoliday) {
      return res.status(400).json({
        success: false,
        message: "Holiday not found",
      });
    }

    return res.status(201).json({
      success: true,
      data: existingHoliday,
      message: "Holiday un-marked!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

interface AttendanceQuery {
  classId: string;
  date: string;
}

export const getTodayHoliday = async (req: Request<{}, {}, {}, AttendanceQuery>, res: Response) => {
  try {
    const { classId, date } = req.query;

    const holiday = await Holiday.findOne({
      classId: new mongoose.Types.ObjectId(classId),
      date,
    });

    return res.status(200).json({
      success: true,
      data: holiday,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch holiday",
    });
  }
};
