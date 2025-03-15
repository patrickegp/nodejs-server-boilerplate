import { NextFunction, Request, Response } from "express";
import { authUser } from "./auth.service";

export const authLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authUser({ email, password });
    res.json({
      data: { token, user },
      message: "Bienvenido de vuelta.",
    });
  } catch (error: any) {
    res.status(400).json({
      errors: {},
      message: error.message,
    });
  }
};

export const authRecover = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "Recover method",
  });
};

export const authReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "Reset method",
  });
};

export const authRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({
    message: "Register method",
  });
};
