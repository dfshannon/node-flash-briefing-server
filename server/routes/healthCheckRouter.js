/**
 * Router for health requests.
 *
 * @module healthCheckRouter
 */
import express from 'express';
import getHealth from '../controllers/healthCheckController';

const router = express.Router();
// handle health check requests
router.route('/').get(getHealth);

export default router;

