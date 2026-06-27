import { Router } from "express";
import {
  createNotice,
  deleteNotice,
  getNotices,
  getNoticeStats,
} from "../controllers/notice.controller";

const router = Router();

// Admin
router.post("/", createNotice);

router.delete("/:id", deleteNotice);

// Everyone
router.get("/", getNotices);

router.get("/getstats", getNoticeStats);

export default router;
