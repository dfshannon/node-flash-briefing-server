/**
 * Router for flash briefing requests.
 *
 * @module flashBriefingRouter
 */
import express from 'express';
import getBriefing from '../controllers/flashBriefingController';

const router = express.Router();
// handle read requests
router.route('/').get(getBriefing);

export default router;
