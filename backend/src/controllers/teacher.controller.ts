import { Request, Response } from "express";
import { Teacher } from "../models/Teachers";
import { Class } from "../models/Class";
import { generateTeacherId } from "../utils/generateTeacherId";
import { Subject } from "../models/Subject";
import { ObjectId } from "mongoose";
import path from "path";
import { hashPassword } from "../utils/hash";

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, assignedClass, subjects } = req.body;

    let theClass = null;

    if (assignedClass) {
      theClass = await Class.findById(assignedClass);
    }
    if (!theClass)
      return res.status(404).json({
        message: "Class not found",
      });

    const teacherId = await generateTeacherId();

    const newTeacher = await Teacher.create({
      name,
      email,
      mobile,
      assignedClass: theClass?._id ?? null,
      teacherId,
      password: await hashPassword(teacherId),
      subjects,
    });

    theClass.classTeacherId = newTeacher._id;
    await theClass.save();

    return res.status(200).json({
      message: "New teacher created",
    });
  } catch (error) {
    console.log("error in creating teacher: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTeacherStats = async (req: Request, res: Response) => {
  try {
    const totalTeachers = (await Teacher.countDocuments()) ?? 0;
    const classTeachers = await Teacher.countDocuments({
      assignedClass: { $ne: null },
    });
    const nonClassTeachers = await Teacher.countDocuments({
      assignedClass: null,
    });
    return res.status(200).json({
      data: { totalTeachers, classTeachers, nonClassTeachers },
    });
  } catch (error) {}
};

type Teacher = {
  _id: string;
  name: string;
  teacherId: string;
  subjects: Array<string>;
  assignedClass: { className: number; section: string };
  email: string;
};

export const getTeacehrs = async (req: Request, res: Response) => {
  try {
    const teachers = await Teacher.find({})
      .populate("subjects", "name")
      .populate("assignedClass", "name section");

    const data: Array<Teacher> = teachers.map((t) => {
      let className = t.assignedClass ? (t.assignedClass as any).name : null;
      let section = t.assignedClass ? (t.assignedClass as any).section : "";
      return {
        _id: t._id.toString(),
        name: t.name,
        teacherId: t.teacherId,
        email: t.email,
        subjects: Array.isArray(t.subjects)
          ? (t.subjects as any[]).map((s) => s.name)
          : [],
        assignedClass: { className, section },
      };
    });
    // console.log("data: ", data);
    return res.status(200).json({
      data,
    });
  } catch (error) {}
};

export const getNonClassTeachers = async (req: Request, res: Response) => {
  try {
    const nonClassTeachers = await Teacher.find({ assignedClass: null });
    return res.status(200).json({
      data: nonClassTeachers,
    });
  } catch (error) {
    console.log("getNonClassTeachers error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

type BulkTeacher = {
  Name: string;
  AssignedClass?: string;
  Subjects: string;
  Mobile: number;
  Email?: string;
};

export const handleBulkImport = async (req: Request, res: Response) => {
  try {
    const teachers: BulkTeacher[] = req.body;
    
    // 1. Load all classes once
    const classes = await Class.find({});

    const classMap = new Map<string, any>();

    classes.forEach((c) => {
      classMap.set(`${c.name}-${c.section}`, c._id);
    });

    // 2. Load all subjects once
    const subjects = await Subject.find({});
    const subjectMap = new Map<string, any>();
    subjects.forEach((s) => {
      subjectMap.set(s.name!.trim().toLocaleLowerCase(), s._id);
    });

    const teacherDocs = [];

    // 2. Transform each student
    let count = await Teacher.countDocuments();
    for (const teacher of teachers) {
      const classId = classMap.get(`${teacher.AssignedClass}`) ?? null;

      const subjectNames = teacher.Subjects.split(",").map((s) => s.trim());
      const subjectIds = [];
      const missingSubjects = [];

      for (const name of subjectNames) {
        const subjectId = subjectMap.get(name.toLocaleLowerCase());

        if (!subjectId) {
          missingSubjects.push(name);
          continue;
        }

        subjectIds.push(subjectId);
      }

      if (missingSubjects.length > 0) {
        console.log(
          `Teacher: ${teacher.Name}: subjects are not found`,
          missingSubjects,
        );
        continue;
      }

      count += 1;

      teacherDocs.push({
        teacherId: `TCH${String(count).padStart(4, "0")}`,
        name: teacher.Name,
        assignedClass: classId,
        subjects: subjectIds,
        mobile: teacher.Mobile,
        email: teacher.Email,
      });
    }

    const bulkData = await Promise.all(
      teacherDocs.map(async (teacher) => ({
        ...teacher,
        password: await hashPassword(teacher.teacherId),
      })),
    );

    // console.log("bulkData: ", bulkData);

    // 3. Bulk insert
    const result = await Teacher.insertMany(
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
    "/public/templates/TeacherDataTemplate.xlsx",
  );
  res.download(filePath);
};

export const getTeacher = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(300)
        .json({
          message: "Login first",
        })
        .redirect("/login");
    }
    const teacher = await Teacher.findById(req.user.id).populate(
      "assignedClass",
    );
    if (!teacher)
      return res.status(300).json({ message: "Your indentity not found" });

    return res.status(200).json({
      data: teacher,
    });
  } catch (error) {}
};
