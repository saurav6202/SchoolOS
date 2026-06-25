// routes/academicWork.routes.ts

import { Router } from "express";
import {
  createAcademicWork,
  getTodayAcademicWork,
  updateAcademicWork,
} from "../controllers/academicWork.controller";

const router = Router();

router.post("/", createAcademicWork);
router.put("/:id", updateAcademicWork);

router.get("/today/:classId", getTodayAcademicWork);

export default router;