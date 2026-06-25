import { Router } from "express";
import {
  createClass,
  deleteClass,
  getAllClasses,
  getClassStats,
  getMyClass,
  getNonAssignedClasses,
  getStudentsByClass,
  handleEdit,
} from "../controllers/class.controller";

const router = Router();

router.post("/", createClass);
router.get("/", getAllClasses);
router.get("/non-assigned-classes", getNonAssignedClasses);
router.get("/class-teacher/me", getMyClass);
router.delete("/:id", deleteClass);
router.get("/getstats", getClassStats);
router.post("/edit/:id", handleEdit);
router.get("/:classId/students", getStudentsByClass);

export default router;
