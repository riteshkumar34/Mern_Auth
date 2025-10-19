import { Router } from 'express';
import { signup, login } from "../controllers/AuthController.js";
import { loginValidation, signupValidation } from '../Middlewares/AuthValidation.js';

const router = Router(); 


router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

export default router;
