import { Request, Response } from "express";
import { Student } from "../models/Students";
import { Teacher } from "../models/Teachers";
import { Admin } from "../models/Admin";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken, verifyToken } from "../utils/jwt";
import { findUserByIdRole } from "../utils/findUser";

export const login = async (req: Request, res: Response) => {
  try {
    const { userId, password }: { userId: string; password: string } = req.body;
    console.log({ userId, password });

    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let user = null;
    let role = "";

    if (userId.startsWith("STU")) {
      user = await Student.findOne({ studentId: userId });
      role = "student";
    } else if (userId.startsWith("TCH")) {
      user = await Teacher.findOne({ teacherId: userId });
      role = "teacher";
    } else if (userId.startsWith("ADM")) {
      user = await Admin.findOne({ adminId: userId });
      role = "admin";
    }

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid User Id",
      });

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });

    const token = generateToken({ id: user._id.toString(), role });
    console.log({
      success: true,
      token,
      user: {
        id: user._id,
        role,
        name: user.name,
        mustChangePassword: user.mustChangePassword ?? false,
      },
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        role,
        name: user.name,
        mustChangePassword: user.mustChangePassword ?? false,
      },
      message: "Login successfully!",
    });
  } catch (error) {
    console.log("Login error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

interface User {
  _id: string;
  name: string;
  userId: string;
  mustChangePassword: boolean;
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const { id, role } = verifyToken(req.body.token);

    if (!id || !role) {
      console.log("NO user id role");

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    let user = null;
    let userId = "";

    switch (role) {
      case "student":
        user = await Student.findOne({ _id: id })
          .select("-password")
          .populate("classId");
        userId = user!.studentId;
        break;
      case "teacher":
        user = await Teacher.findOne({ _id: id })
          .select("-password")
          .populate("assignedClass");
        userId = user!.teacherId;
        break;
      case "admin":
        user = await Admin.findById(id).select("-password");
        userId = user!.adminId;
        break;
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    let userData = { user, role, userId };
    // console.log("ys user: ", userData);

    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.log("getMe error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const handleChangePassword = async (req: Request, res: Response) => {
  try {
    console.log("backend hit")
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const userId = req.user?.id;
    console.log("userId: ",req.user);

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ message: "Missing or invalid user id" });
    }
    const role = req.user?.role;
    if (!role || typeof role !== "string") {
      return res.status(400).json({ message: "Missing or invalid user role" });
    }

    const user = await findUserByIdRole(userId, role);

    console.log("userId: ", userId);
    console.log("role: ", role);
    console.log("user: ", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isCorrectPassword = await comparePassword(
      currentPassword,
      user.password,
    );

    console.log("isCorrectPassword: ", isCorrectPassword);

    if (!isCorrectPassword) {
      return res.status(405).json({
        message: "Password didn't matched",
      });
    }

    user.password = await hashPassword(newPassword);
    user.mustChangePassword = false;

    const updatedUser = await user.save();

    console.log("updatedUser: ", updatedUser);

    return res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log("chagne password error: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const pswd = req.params.pswd;
  if (pswd !== process.env.ADMIN_PSWD) return;

  const { adminid, name } = req.query;
  const hashedPassword = await hashPassword(String(adminid));
  const newAdmin = await Admin.create({
    adminId: String(adminid),
    password: hashedPassword,
    email: "",
    name: String(name),
  });

  return res.send(req.query);
};
