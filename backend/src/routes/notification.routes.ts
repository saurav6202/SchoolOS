import { Router } from "express";
import {
  handleSubscribe,
  handleUnsubscribe,
  sendToAllUsers,
} from "../controllers/notification.controller";
const router = Router();

router.post("/subscribe", handleSubscribe);
router.delete("/unsubscribe", handleUnsubscribe);
router.post("/send", sendToAllUsers);

export default router;
