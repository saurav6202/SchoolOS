import { Request, Response } from "express";
import { Student } from "../models/Students";
import { hashPassword } from "../utils/hash";
import { Class } from "../models/Class";
import { generateStudentId } from "../utils/generateStudentId";
import { Document, type ObjectId } from "mongoose";
import { IStudent } from "../types/student.types";
import path from "path";
import { Attendance } from "../models/Attendance";
import { Holiday } from "../models/Holiday";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      admissionNo,
      className,
      section,
      rollNumber,
      fatherName,
      motherName,
      mobile,
    } = req.body;

    const theClass = await Class.findOne({ name: className, section });
    const studentId = await generateStudentId();
    const hashedPassword = await hashPassword(studentId);

    // console.log("theClass: ", theClass);

    const newStudent = await Student.create({
      name,
      admissionNo,
      rollNumber,
      fatherName,
      motherName,
      mobile,
      studentId,
      password: hashedPassword,
      mustChangePassword: true,
      classId: theClass?._id || null,
    });

    // console.log("new student: ", newStudent);
    return res.status(200).json({
      success: true,
      data: newStudent,
      message: "New Student Created",
    });
  } catch (error) {
    console.log("error in creating new student: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getStats = async (_: Request, res: Response) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalClasses = await Class.countDocuments();
    return res.status(200).json({
      totalClasses,
      totalStudents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getStudent = async (req: Request, res: Response) => {
  try {
    const { className, section, admissionNo } = req.body;

    const theClassId = (await Class.findOne({ name: className, section }))?._id;

    if (theClassId && admissionNo) {
      const theStudent = await Student.find({
        classId: theClassId,
        admissionNo,
      }).populate("classId");
      return res.json({
        data: theStudent,
      });
    }

    if (theClassId) {
      const theStudent = await Student.find({ classId: theClassId }).populate(
        "classId",
      );

      return res.json({
        data: theStudent,
      });
    }

    if (admissionNo) {
      const theStudent = await Student.findOne({ admissionNo }).populate(
        "classId",
      );
      return res.json({
        data: theStudent ? [theStudent] : [],
      });
    }

    return res.json({
      success: true,
      data: []
    });
  } catch (error) {}
};

type Student = {
  AdmissionNo: number;
  Name: string;
  Class: number;
  Section: string;
  RollNo: number;
  FatherName: string;
  MotherName: string;
  Mobile: number;
};

export const handleBulkImport = async (req: Request, res: Response) => {
  try {
    const students = req.body;

    // 1. Load all classes once
    const classes = await Class.find({}).lean();

    const classMap = new Map<string, any>();

    classes.forEach((c) => {
      classMap.set(`${c.name}-${c.section}`, c._id);
    });

    const studentDocs = [];

    // 2. Transform each student
    let count = await Student.countDocuments();
    for (const student of students) {
      const classId = classMap.get(`${student.Class}-${student.Section}`);

      if (!classId) {
        console.log(`Class not found: ${student.Class}-${student.Section}`);
        continue;
      }

      count += 1;

      studentDocs.push({
        studentId: `STU${String(count).padStart(4, "0")}`,
        classId,
        name: student.Name,
        admissionNo: student.AdmissionNo,
        rollNumber: student.RollNo,
        fatherName: student.FatherName,
        motherName: student.MotherName,
        mobile: student.Mobile,
      });
    }

    const bulkData = await Promise.all(
      studentDocs.map(async (student) => ({
        ...student,
        password: await hashPassword(student.studentId),
      })),
    );

    // console.log("bulkData: ", bulkData);

    // 3. Bulk insert
    const result = await Student.insertMany(
      bulkData,
      { ordered: false }, // continues even if some fail
    );

    return res.status(200).json({
      message: "Bulk students created successfully!",
      //   inserted: result.length,
    });
  } catch (error) {
    console.log("Error in bulk student creation: ", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const downloadTemplate = async (req: Request, res: Response) => {
  const filePath = path.join(
    process.cwd(),
    "/public/templates/studentsDataTemplate.xlsx",
  );
  res.download(filePath);
};

export const getStudentAttendance = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;

    const records = await Attendance.find({
      "records.studentId": studentId,
    }).sort({ createdAt: -1 });

    const formatted = records.map((att) => {
      const studentRecord = att.records.find(
        (r: any) => r.studentId.toString() === studentId,
      );

      return {
        date: att.date,
        status: studentRecord?.isPresent ? "present" : "absent",
      };
    });

    return res.json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance",
    });
  }
};

export const getStudentAttendanceStats = async (
  req: Request,
  res: Response,
) => {
  try {
    const studentId = req.user!.id;

    const records = await Attendance.find({
      "records.studentId": studentId,
    });

    let present = 0;
    let absent = 0;

    records.forEach((att) => {
      const studentRecord = att.records.find(
        (r: any) => r.studentId.toString() === studentId,
      );

      if (studentRecord?.isPresent) {
        present++;
      } else {
        absent++;
      }
    });

    const total = present + absent;

    const percentage = total === 0 ? 0 : Math.round((present / total) * 100);

    return res.json({
      success: true,
      data: {
        present,
        absent,
        total,
        percentage,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};

export const getStudentHolidays = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;

    const student = await Student.findById(studentId).select("classId");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const holidays = await Holiday.find({
      $or: [
        {
          classId: student.classId,
        },
        {
          classId: null,
        },
      ],
    })
      .select("date title")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      data: holidays,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch holidays",
    });
  }
};

export const getAttendanceDashboard = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;

    const student = await Student.findById(studentId).select("classId");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const attendanceDocs = await Attendance.find({
      "records.studentId": studentId,
    }).select("date records");

    const attendance = attendanceDocs.map((attendanceDoc) => {
      const record = attendanceDoc.records.find(
        (record) => record.studentId.toString() === studentId,
      );

      return {
        date: attendanceDoc.date,
        status: record?.isPresent ? "present" : "absent",
      };
    });

    const present = attendance.filter(
      (item) => item.status === "present",
    ).length;

    const absent = attendance.filter((item) => item.status === "absent").length;

    const total = attendance.length;

    const percentage =
      total > 0 ? Number(((present / total) * 100).toFixed(1)) : 0;

    const holidays = await Holiday.find({
      $or: [
        {
          classId: student.classId,
        },
        {
          classId: null,
        },
      ],
    })
      .select("date title")
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        attendance,
        holidays,
        stats: {
          present,
          absent,
          total,
          percentage,
        },
      },
    });
  } catch (error) {
    console.log("Attendance dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch attendance dashboard",
    });
  }
};
