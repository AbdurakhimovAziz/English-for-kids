import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.send({ token: 'adsfadfs' });
});

export default router;
