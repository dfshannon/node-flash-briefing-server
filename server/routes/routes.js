import express from 'express';
import flashBriefingRouter from './flashBriefingRouter';
import eventRouter from './eventRouter';
import healthCheckRouter from './healthCheckRouter';

const router = express.Router();

router.use('/flashbriefing', flashBriefingRouter);
router.use('/event', eventRouter);
router.use('/health', healthCheckRouter);

export default router;
