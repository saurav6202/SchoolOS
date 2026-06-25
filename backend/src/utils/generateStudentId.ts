import { Student } from "../models/Students";

export const generateStudentId = async (): Promise<string> => {
  const count = await Student.countDocuments();

  const nextNumber = count + 1;

  const paddedNumber = String(nextNumber).padStart(4, "0");

  return `STU${paddedNumber}`;
};