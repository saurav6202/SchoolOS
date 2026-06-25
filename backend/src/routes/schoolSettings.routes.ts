import { Router } from "express";

import {
  getSchoolSettings,
  saveSchoolSettings,
} from "../controllers/schoolSettings.controller";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", getSchoolSettings);

// router.post("/", saveSchoolSettings);
router.post("/", upload.single("logo"), saveSchoolSettings);

export default router;