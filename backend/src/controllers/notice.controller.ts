import { Request, Response } from "express";
import Notice from "../models/Notice";

export const createNotice = async (req: Request, res: Response) => {
  try {
    const { title, content, audience, priority } = req.body;

    const notice = await Notice.create({
      title,
      content,
      audience,
      priority,
      createdBy: req.user!.id, // from auth middleware
    });

    return res.status(201).json({
      success: true,
      message: "Notice published successfully.",
      notice,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to publish notice.",
    });
  }
};

export const getNotices = async (req: Request, res: Response) => {
  try {
    const role = req.user!.role;

    type NoticeAudience = "students" | "teachers" | "everyone";

    const audience: NoticeAudience[] =
      role === "student"
        ? ["students", "everyone"]
        : role === "teacher"
          ? ["teachers", "everyone"]
          : ["students", "teachers", "everyone"];

    const notices = await Notice.find({
      audience: { $in: audience },
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: notices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch notices.",
    });
  }
};

export const deleteNotice = async (req: Request, res: Response) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Notice deleted.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete notice.",
    });
  }
};


export const getNoticeStats = async (req: Request, res: Response) => {
  try {
    const totalNotices = (await Notice.countDocuments()) ?? 0;
    const highPriorityNotices =
      (await Notice.find({ priority: "high" }).countDocuments()) ?? 0;
    return res.status(200).json({
      data: { totalNotices, highPriorityNotices },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};