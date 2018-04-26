/**
 * Controller for flash briefing requests.
 *
 * @module flashBriefingController
 */
import {getEvents} from '../model/event';

/**
 * Handles requests to get the flash briefing json requests.  Returns a 200 if succssful.
 * @param req - request object
 * @param res - response object
 */
async function getBriefing(req, res, next) {
    res.set('Content-Type', 'application/json');

    try {
        const result = await getEvents();
        res.send(result);
    } catch (err) {
        next(err);
    }
}
export default getBriefing;

