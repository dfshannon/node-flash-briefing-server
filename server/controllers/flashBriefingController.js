/**
 * Controller for flash briefing requests.
 *
 * @module flashBriefingController
 */
import dateFormat from 'dateformat';
import {getEventsForDate} from '../model/event';

/**
 * Handles requests to get the flash briefing json requests.  Returns a 200 if succssful.
 * @param req - request object
 * @param res - response object
 * @param next - next routine
 */
async function getBriefing(req, res, next) {
    res.set('Content-Type', 'application/json');
    try {
        const todaysDate = dateFormat(new Date(), 'yyyy-mm-dd');
        const result = await getEventsForDate(todaysDate);
        res.send(result);
    } catch (err) {
        next(err);
    }
}
export default getBriefing;
