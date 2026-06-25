import { Request, Response } from "express";
import { Attendance } from "../models/Attendance";
import { AcademicSession } from "../models/AcademicSession";
import mongoose from "mongoose";

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const { classId, date, records } = req.body;
    console.log("records: ", records, "date: ", date);

    if (!req.user){
      console.log("atten user n found");
      return res.status(300).json({ message: "You can't update attendance" });
    }

    const activeSession = await AcademicSession.findOne({
      isActive: true,
    });

    if (!activeSession) {
      return res.status(400).json({
        success: false,
        message: "No active academic session found",
      });
    }

    const alreadyMarked = await Attendance.findOne({
      classId,
      date,
    });

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked",
      });
    }

    const attendance = await Attendance.create({
      classId,

      sessionId: activeSession._id,

      markedBy: req.user.id,

      date,

      records,
    });

    // console.log("new attendance: ", attendance);

    return res.status(201).json({
      success: true,
      data: attendance,
      message: "Attendance Submitted",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getClassAttendance = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;

    const attendance = await Attendance.find({
      classId,
    })
      .sort({
        date: -1,
      })
      .populate("markedBy", "name teacherId");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
    });
  }
};

interface AttendanceQuery {
  classId: string;
  date: string;
}


export const getAttendanceByDate = async (req: Request<{}, {}, {}, AttendanceQuery>, res: Response) => {
  try {
    const { classId, date } = req.query;

    const attendance = await Attendance.find({
      classId: new mongoose.Types.ObjectId(classId),
      date,
    })
      .sort({ date: -1 })
      .populate("records.studentId", "rollNumber name");

    if (attendance.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const { attendanceId } = req.params;

    const attendance = await Attendance.findById(attendanceId)
      .populate("records.studentId", "rollNumber name studentId")
      .populate("classId", "name section");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attendance,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const { attendanceId } = req.params;
    const { records } = req.body;
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance)
      return res.status(400).json({ message: "Attendance not found" });
    attendance.records = records;
    await attendance.save();
    return res.status(200).json({ message: "Attendance updated" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
