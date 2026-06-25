// controllers/academicWork.controller.ts

import { Request, Response } from "express";
import { AcademicWork } from "../models/AcademicWork";

export const createAcademicWork = async (req: Request, res: Response) => {
  try {
    const { classId, date, works } = req.body;

    if (!classId || !works?.length) {
      return res.status(400).json({
        success: false,
        message: "Required data missing",
      });
    }

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const alreadyExists = await AcademicWork.findOne({
      classId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Academic work already submitted for today",
      });
    }

    const academicWork = await AcademicWork.create({
      classId,
      date,
      works,
      createdBy: req.user!.id,
    });

    return res.status(201).json({
      success: true,
      message: "Academic work submitted successfully",
      data: academicWork,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateAcademicWork = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const {
      works,
    }: {
      works: Array<{
        subjectId: string;
        classwork: string;
        homework: string;
      }>;
    } = req.body;
    const academicWork = await AcademicWork.findById(id);

    if (!academicWork) {
      return res.status(404).json({
        success: false,
        message: "Academic work not found",
      });
    }

    academicWork.works = works as any;

    await academicWork.save();

    return res.status(200).json({
      success: true,
      message: "Academic work updated successfully",
      data: academicWork,
    });
  } catch (error) {
    console.error("Update Academic Work Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTodayAcademicWork = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;

    const today = new Date();

    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    const data = await AcademicWork.findOne({
      classId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate("works.subjectId", "name code")
      .populate("createdBy", "name teacherId");

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
