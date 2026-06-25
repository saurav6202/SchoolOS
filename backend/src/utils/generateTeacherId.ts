import { Teacher } from "../models/Teachers"

export const generateTeacherId = async (): Promise<string> => {
    const count = await Teacher.countDocuments();
    const nextNumebr = count + 1;
    const paddedNumber = String(nextNumebr).padStart(4, "0");
    return `TCH${paddedNumber}`;
} 