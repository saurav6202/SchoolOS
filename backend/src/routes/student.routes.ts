import { Router } from "express";
import {
  createStudent,
  downloadTemplate,
  getAttendanceDashboard,
  getStats,
  getStudent,
  getStudentAttendance,
  getStudentAttendanceStats,
  getStudentHolidays,
  handleBulkImport,
} from "../controllers/student.controller";

const router = Router();

router.post("/", createStudent);
router.post("/bulk-import", handleBulkImport);
router.post("/search", getStudent);

router.get("/getstats", getStats);
router.get("/download-template", downloadTemplate);

router.get("/attendance",  getStudentAttendance);
router.get("/attendance/stats",  getStudentAttendanceStats);

router.get("/attendance/holidays", getStudentHolidays)

router.get("/attendance/dashboard", getAttendanceDashboard);

export default router;
