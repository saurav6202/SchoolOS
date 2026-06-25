import { Request, Response } from "express";
import { AcademicSession } from "../models/AcademicSession";

export const createAcademicSession = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const startYear = new Date(startDate).getFullYear();

    const sessionName = `${startYear}-${String(startYear + 1).slice(-2)}`;

    const existing = await AcademicSession.findOne({
      name: sessionName,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Session already exists",
      });
    }

    const session = await AcademicSession.create({
      name: sessionName,
      startDate,
      endDate,
    });

    return res.status(201).json({
      success: true,
      data: session,
      message: "Session Created"
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAcademicSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await AcademicSession.find().sort({
      startDate: 1,
    });

    return res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const activateAcademicSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const session = await AcademicSession.findById(id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    await AcademicSession.updateMany(
      {},
      {
        isActive: false,
      },
    );

    session.isActive = true;

    await session.save();

    return res.status(200).json({
      success: true,
      message: "Session activated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteAcademicSession = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const session = await AcademicSession.findById(id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    if (session.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete active session",
      });
    }

    await AcademicSession.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSessionStats = async (req: Request, res: Response) => {
  try {
    const totalSessions = await AcademicSession.countDocuments();

    const activeSession = await AcademicSession.findOne({
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      data: {
        totalSessions,
        activeSession,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getActiveSession = async (req: Request, res: Response) => {
  const session = await AcademicSession.findOne({
    isActive: true,
  });

  return res.json({
    success: true,
    data: session,
  });
};
