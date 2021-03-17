import express from 'express';
import userRouter from './users.route';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello singh santosh now your feature/ci-cd start now.....' });
});

router.use('/user', userRouter);

export default router;
