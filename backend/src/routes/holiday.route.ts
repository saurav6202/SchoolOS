import { Router } from "express";
import { getTodayHoliday, markHoliday, unMarkHoliday } from "../controllers/holiday.controller";

const router = Router();

router.post("/mark", markHoliday);
router.post("/unmark", unMarkHoliday);
router.get("/today", getTodayHoliday);

export default router;
