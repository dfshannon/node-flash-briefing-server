/**
 * Controller for health check requests.
 *
 * @module healthCheckController
 */

/**
 * Handles health check requests.  Returns a 200 if succssful.
 * @param req - request object
 * @param res - response object
 */
export default function getHealth(req, res) {
    res.sendStatus(200);
}
