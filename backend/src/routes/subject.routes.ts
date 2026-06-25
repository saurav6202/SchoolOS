import { Router } from "express";
import { createSubject, getSubjects, getSubjectStats } from "../controllers/subject.controller";

const router = Router();

router.post("/", createSubject);
router.get("/getstats", getSubjectStats);
router.get("/", getSubjects);

export default router;