import { NextFunction, Request, Response } from "express";
import { authenticate, setUserPassword } from "./auth.service";
import { getUserByEmail, getUserPermissions } from "../users/users.service";
import { Permission } from "../../types/permission.types";
import { AuthUser } from "../../types/auth.types";
import { generateAccessToken } from "../../helpers/auth.helper";

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authenticate({ email, password });

    const userPermissions: Permission[] = await getUserPermissions(user.id);
    const permissions: string[] = userPermissions
      .map((permission) => permission.label)
      .filter((label): label is string => label !== null);

    const session: AuthUser = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      permissions,
    };

    const jwtPayload = { user: session };
    const accessToken = generateAccessToken(jwtPayload);

    res.json({
      data: { accessToken, session },
      message: "Bienvenido de vuelta.",
    });
  } catch (error: any) {
    res.status(400).json({
      errors: {},
      message: error.message,
    });
  }
};

export const recoverPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);

    res.json({
      data: user,
      message:
        "Hemos enviado un correo electrónico a tu email con los pasos a seguir para recuperar tu contraseña.",
    });
  } catch (error: any) {
    res.status(400).json({
      errors: {},
      message: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const token = req.query.token;
  const updated = await setUserPassword(1, "entrar");
  res.json({
    message: "Reset method",
  });
};

export const userRegistration = async (req: Request, res: Response) => {
  res.json({
    message: "Register method",
  });
};
