import { Admin } from "../models/Admin";
import { Student } from "../models/Students";
import { Teacher } from "../models/Teachers";
import { Role } from "../types/role.types";

export const findUserByIdRole = async (id: string, role: string) => {
    switch (role) {
        case Role.STUDENT:
            return await Student.findById(id);
        case Role.TEACHER:
            return await Teacher.findById(id);
        case Role.ADMIN:
            return await Admin.findById(id);
        default:
            return null;
    }
};
