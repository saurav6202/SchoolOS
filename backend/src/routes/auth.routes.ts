import { Router } from "express";
import { createAdmin, getMe, handleChangePassword, login } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/me", getMe);
router.post("/login", login);
router.post("/change-password", authMiddleware, handleChangePassword);

router.get("/createadmin/:pswd", createAdmin);

export default router;
// http://localhost:3000/api/auth/createadmin/?adminid=&name=