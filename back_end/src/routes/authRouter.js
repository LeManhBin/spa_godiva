import express from 'express';
import { loginAuth, registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginAuth);

export default router