import { Request, Response, NextFunction } from 'express';
import { validationResult } from "express-validator";

export const validationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const formatedErrors: Record<string, string> = errors.array().reduce( 
    (acc: any, cur: any) => {
    acc[cur.path] = cur.msg;
    return acc;
  }, {});
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: formatedErrors,
      message: 'Error de validación, verifique los datos e intente de nuevo por favor.'
    });
  }
};
