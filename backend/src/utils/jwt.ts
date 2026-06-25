import jwt from "jsonwebtoken";

type JwtPayload = {
    id: string;
    role: string;
};


export const generateToken = (
    payload: JwtPayload
) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {
            expiresIn: "7d",
        }
    );
};

export const verifyToken = (token: string): JwtPayload => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof decoded !== "object" || decoded === null || Array.isArray(decoded)) {
        throw new Error("Invalid token");
    }
    const { id, role } = decoded as Record<string, unknown>;

    if (typeof id !== "string" || typeof role !== "string") {
        throw new Error("Invalid token claims");
    }

    return { id, role };
};

// usages:
// const token = generateToken({
//   id: user._id.toString(),
//   role: "student",
// });