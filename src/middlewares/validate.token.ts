import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../helpers/auth.helper";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decodedPayload = verifyAccessToken(token);
    if (!decodedPayload) {
      res.status(401).json({
        message: "Session Inválida"
      });
    }
    // req.user = decodedPayload;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Acceso no autorizado."
    });
  }

}
