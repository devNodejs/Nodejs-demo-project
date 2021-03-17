import express from 'express';
import AuthController from '../controllers/auth.controller';
import {
  authenticate,
  generateToken,
} from '../middlewares/auth.middleware';

const router = express.Router();

// auth
router.route('/register').post(AuthController.register);

export default router;
