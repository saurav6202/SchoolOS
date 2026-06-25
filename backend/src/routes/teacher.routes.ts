import { Router } from "express";
import {
  createTeacher,
  getNonClassTeachers,
  getTeacehrs,
  getTeacherStats,
  downloadTemplate,
  handleBulkImport,
  getTeacher,
} from "../controllers/teacher.controller";

const router = Router();

router.post("/", createTeacher);
router.get("/getstats", getTeacherStats);
router.get("/", getTeacehrs);
router.get("/non-class-teachers", getNonClassTeachers);
router.get("/download-template", downloadTemplate);
router.post("/bulk-import", handleBulkImport);
router.get("/getMe", getTeacher);

export default router;
