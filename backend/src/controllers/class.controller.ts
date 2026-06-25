import { Request, Response } from "express";
import { Class } from "../models/Class";
import { Teacher } from "../models/Teachers";
import { Student } from "../models/Students";

export const createClass = async (req: Request, res: Response) => {
  try {
    const { name, section, academicYear, classTeacherId, subjects } = req.body;
    console.log("req.body: ", req.body);

    if (!name || !section || !academicYear) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingClass = await Class.findOne({
      name,
      section,
      academicYear,
    });

    if (existingClass) {
      return res.status(400).json({
        success: false,
        message: "Class already exists",
      });
    }

    const newClass = await Class.create({
      name,
      section,
      academicYear,
      subjects,
      classTeacherId: classTeacherId || null,
    });

    return res.status(200).json({
      success: true,
      data: newClass,
      message: "New Class Created",
    });
  } catch (error) {
    console.log("Error in creating class", error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const handleEdit = async (req: Request, res: Response) => {
  try {
    const { classId, classTeacherId, subjects } = req.body;
    console.log("edit class: ", req.body);

    const theClass = await Class.findById(classId);

    console.log("theClass: ", theClass);

    if (!theClass)
      return res.status(404).json({ message: "Selected class not found" });

    theClass.classTeacherId = classTeacherId || null;
    theClass.subjects = subjects;
    await theClass.save();

    if (classTeacherId === "") {
      const teacher = await Teacher.findOne({ assignedClass: classId });
      if (!teacher)
        return res.status(400).json({ message: "Backend database issue" });
      teacher.assignedClass = null;
      await teacher.save();

      return res.status(200).json({
        message: "Class teacher updated",
      });
    }

    const theTeacher = await Teacher.findById(classTeacherId);
    if (!theTeacher)
      return res.status(405).json({
        message: "Invalide selected teacher",
      });

    theTeacher.assignedClass = classId;
    await theTeacher.save();

    return res.status(200).json({
      message: "Class teacher updated",
    });
  } catch (error) {
    console.log("class edit error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const data = await Class.aggregate([
      { $sort: { name: 1, section: 1 } },

      {
        $lookup: {
          from: "teachers",
          localField: "classTeacherId",
          foreignField: "_id",
          as: "classTeacher",
        },
      },

      {
        $lookup: {
          from: "students",
          localField: "_id",
          foreignField: "classId",
          as: "studentDocs",
        },
      },

      {
        $lookup: {
          from: "subjects",
          localField: "subjects",
          foreignField: "_id",
          as: "subjects",
        },
      },

      {
        $project: {
          _id: { $toString: "$_id" },
          name: 1,
          section: 1,
          academicYear: 1,
          studentCount: { $size: "$studentDocs" },

          classTeacherId: {
            $arrayElemAt: ["$classTeacher._id", 0],
          },

          classTeacherName: {
            $arrayElemAt: ["$classTeacher.name", 0],
          },

          subjects: {
            $map: {
              input: "$subjects",
              as: "subject",
              in: {
                _id: { $toString: "$$subject._id" },
                name: "$$subject.name",
                code: "$$subject.code",
                category: "$$subject.category",
              },
            },
          },
        },
      },
    ]);

    const formattedData = data.map((item) => ({
      name: item.name,
      section: item.section,
      _id: item._id,
      academicYear: item.academicYear,
      studentCount: item.studentCount,

      classTeacher: {
        _id: item.classTeacherId ?? null,
        name: item.classTeacherName ?? null,
      },

      subjects: item.subjects ?? [],
    }));

    return res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id)
      .populate({
        path: "classTeacherId",
        select: "name teacherId email",
      })
      .populate({
        path: "subjects",
        select: "name code",
      });

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: classData,
    });
  } catch (error) {
    console.log("getClassById error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMyClass = async (req: Request, res: Response) => {
  try {
    const teacherId = req.user!.id;

    const classData = await Class.findOne({
      classTeacherId: teacherId,
    })
      .populate("subjects")
      .populate("classTeacherId");

    return res.status(200).json({
      success: true,
      data: classData,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    // console.log("id: ", req.params.id);

    const item = await Class.findById(req.params.id);
    // console.log(item);

    const deleted = await Class.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    let teacher = await Teacher.findOne({ assignedClass: req.params.id });
    if (teacher) {
      teacher.assignedClass = null;
      await teacher.save();
    }

    return res.status(200).json({
      success: true,
      message: "Class deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      json: "Internal server error",
    });
  }
};

export const getNonAssignedClasses = async (req: Request, res: Response) => {
  try {
    const nonAssignedClasses = await Class.find({ classTeacherId: null });
    return res.status(200).json({
      data: nonAssignedClasses,
    });
  } catch (error) {
    // console.log("getNonAssignedClasses error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getClassStats = async (req: Request, res: Response) => {
  try {
    const totalClasses = (await Class.countDocuments()) ?? 0;
    const assignedClasses = await Class.countDocuments({
      classTeacherId: { $ne: null },
    });
    const unAssignedClasses = await Class.countDocuments({
      classTeacherId: null,
    });
    return res.status(200).json({
      data: { totalClasses, assignedClasses, unAssignedClasses },
    });
  } catch (error) {}
};

export const getStudentsByClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;

    const students = await Student.find({
      classId,
      isActive: true,
    })
      .select("_id studentId name rollNumber")
      .sort({
        rollNumber: 1,
      });

    // console.log("getStudents: ", students);

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.log("Get Students By Class Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
