import { Request, Response } from "express";
import crypto from "node:crypto";
import { authenticate, deleteUserResetTokens, getUserResetToken, insertResetToken, setUserPassword } from "./auth.service";
import { getUserByEmail, getUserPermissions } from "../users/users.service";
import { Permission } from "../../types/permission.types";
import { AuthUser } from "../../types/auth.types";
import { generateAccessToken } from "../../helpers/auth.helper";
import { sendMail } from "../../services/mail.service";
import { hashPassword } from "../../utils/password.utils";

export const currentSession = async (req: Request, res: Response) => {
  const session: AuthUser = {
    id: 1,
    email: 'info@gesystec.com',
    fullname: 'Patrick E. García',
    permissions: ['users:view', 'users:create', 'users:edit', 'users:delete']
  };

  res.json(session);
}

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

    const resetToken = crypto.randomBytes(16).toString("hex");
    const [token] = await insertResetToken(resetToken, user.id);

    const from: string = "info@gesystec.com";
    const to: string = user.email;
    const subject: string = "Recuperación de contraseña";

    const resetLink =  `https://localhost:3000/password/reset?=${resetToken}`;
    await sendMail( from, to, subject, 'password-reset-request', { resetLink });

    res.json({
      data: { email },
      message: "Hemos enviado un correo electrónico a tu email con los pasos a seguir.",
    });

  } catch (error: any) {
    res.status(400).json({
      errors: {},
      message: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;
  try {
    const user = await getUserResetToken(token);

    if(!user){
      res.status(404).json({
        message: "Autorización inválida.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const [ updated ]  = await setUserPassword(user.idUser!, hashedPassword );

    if(updated.affectedRows > 0){
      deleteUserResetTokens(user.idUser!);

      const from: string = "info@gesystec.com";
      const to: string = user.email;
      const subject: string = "Recuperación de contraseña";
      
      const emailVariables = {
        supportUrl: `https://localhost:3000/contact`,
        fullname: user.fullname
      };
      await sendMail( from, to, subject, 'password-reset-succeed', emailVariables);

      res.json({
        data: {fullname: user.fullname},
        message: "Contraseña modificada, ya puedes utilizar la nueva contraseña.",
      });

    }else{
      res.status(400).json({
        message: "Error desconocido, contraseña no actualizada.",
      });
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

};

export const userRegistration = async (req: Request, res: Response) => {
  const { fullname, email, mobile, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    res.json({
      data: {
        fullname, mobile, email, hashedPassword
      },
      message: "En hora buena, ya estas registrado"
    });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({
        message: error.message
      });
    }
  }
};
