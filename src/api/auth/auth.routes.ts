import { Router } from "express";
import { loginFormRules, recoveryFormRules, registerFormRules, resetPasswordFormRules } from "./auth.validations";
import { userLogin, recoverPassword, resetPassword, userRegistration, currentSession } from "./auth.controller";
import { validationErrors } from "../../middlewares/validation.errors";

const router = Router();

router.post('/register', registerFormRules, validationErrors, userRegistration);
router.post('/refresh');
router.post('/recover', recoveryFormRules, recoverPassword);
router.post('/password/reset', resetPasswordFormRules, validationErrors, resetPassword);
router.post('/logout');
router.get('/session', currentSession);
router.post('/', loginFormRules, validationErrors, userLogin);

export default router;