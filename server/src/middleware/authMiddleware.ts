import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export function verifyToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token tidak ditemukan.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token tidak valid.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "workdev-super-secret-key"
    ) as jwt.JwtPayload;

    req.user = {
      id: decoded.id as string,
      role: decoded.role as string,
    };

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Token tidak valid.",
    });
  }
}