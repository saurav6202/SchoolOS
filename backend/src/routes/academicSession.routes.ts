import { Router } from "express";

import {
  activateAcademicSession,
  createAcademicSession,
  deleteAcademicSession,
  getAcademicSessions,
  getSessionStats,
} from "../controllers/academicSession.controller";

const router = Router();

router.post("/", createAcademicSession);

router.get("/", getAcademicSessions);

router.get("/stats", getSessionStats);

router.patch("/:id/activate", activateAcademicSession);

router.delete("/:id", deleteAcademicSession);

export default router;
