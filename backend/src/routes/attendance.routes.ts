import { Router } from "express";

import {
  createAttendance,
  getClassAttendance,
  getAttendanceByDate,
  updateAttendance,
  getAttendanceById,
} from "../controllers/attendance.controller";


const router = Router();

router.post("/",  createAttendance);

router.get("/class/:classId",  getClassAttendance);

router.get("/date",  getAttendanceByDate);

router.put("/:attendanceId",  updateAttendance);
router.get("/:attendanceId",  getAttendanceById);
export default router;
