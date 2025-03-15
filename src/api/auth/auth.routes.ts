import { Router, Request, Response } from "express";
import { validateLogin } from "./auth.requests";
import { authLogin } from "./auth.controller";
import { handleValidationErrors } from "../../middlewares/handle.validation.errors";

const router = Router();

router.post('/register');
router.post('/refresh');
router.post('/recover');
router.post('/reset');
router.post('/logout');
router.post('/', validateLogin, handleValidationErrors, authLogin);

export default router;