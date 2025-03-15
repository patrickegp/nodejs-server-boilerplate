import { body } from "express-validator";

export const validateLogin = [
  body('email').isEmail().withMessage('Correo electrónico inválido'),
  body('password').isLength({ min: 6 }).withMessage('Escriba al menos 6 caracteres.')
];

export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Correo electrónico inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Escriba al menos 6 caracteres.'),
  body('fullname')
    .isLength({ min: 3 })
    .withMessage('Escriba al menos 3 caracteres.'),
  body('mobile')
    .isLength({ min: 10 })
    .withMessage('Formatos válidos, 0000000000 ó 000-000-0000')
];

