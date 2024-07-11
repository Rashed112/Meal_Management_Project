import {Router} from 'express';
const router = Router();
import { register, login } from '../controllers/authController.js';

router.route('/register').post(register);
router.route('/login').post(login);

export default router;