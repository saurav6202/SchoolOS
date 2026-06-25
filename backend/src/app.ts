import dotenv from "dotenv";
import compression from "compression";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
app.use(compression());
app.use(express.json());

const allowedOrigins = ["http://localhost:5174"];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get("/", (_, res) => {
  res.send("School OS API Running");

  
});

import authRouter from "./routes/auth.routes";
import classRouter from "./routes/class.routes";
import studentRouter from "./routes/student.routes";
import teacherRouter from "./routes/teacher.routes";
import subjectRouter from "./routes/subject.routes";
import academicSessionRoutes from "./routes/academicSession.routes";
import schoolSettingsRoutes from "./routes/schoolSettings.routes";
import attendanceRoutes from "./routes/attendance.routes";
import academicWorkRoutes from "./routes/academicWork.routes";
import holidayRoutes from "./routes/holiday.route";
import { authMiddleware } from "./middleware/auth.middleware";

app.use("/api/auth", authRouter);
app.use("/api/classes", authMiddleware, classRouter);
app.use("/api/students", authMiddleware, studentRouter);
app.use("/api/teachers", authMiddleware, teacherRouter);
app.use("/api/subjects", authMiddleware, subjectRouter);
app.use("/api/academic-sessions", authMiddleware, academicSessionRoutes);
app.use("/api/school-settings", authMiddleware, schoolSettingsRoutes);
app.use("/api/attendance", authMiddleware, attendanceRoutes);
app.use("/api/academic-work", authMiddleware, academicWorkRoutes);
app.use("/api/holidays", authMiddleware, holidayRoutes);

export default app;
