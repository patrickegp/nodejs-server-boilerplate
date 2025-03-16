import { Router } from "express";
import { loginFormRules, recoveryFormRules, resetPasswordFormRules } from "./auth.validations";
import { userLogin, recoverPassword, resetPassword, userRegistration } from "./auth.controller";
import { validationErrors } from "../../middlewares/validation.errors";

const router = Router();

router.post('/register', userRegistration);
router.post('/refresh');
router.post('/recover', recoveryFormRules, recoverPassword);
router.post('/reset/:token', resetPasswordFormRules, resetPassword);
router.post('/logout');
router.post('/', loginFormRules, validationErrors, userLogin);

export default router;