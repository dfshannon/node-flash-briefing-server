/**
 * Controller for event api.
 *
 * @module eventController
 */
import HttpStatus from 'http-status';
import uuidv1 from 'uuid/v1';
import * as Event from '../model/event';
import APIError from '../util/APIError';

/**
 * Handles requests to get all events.
 * @param req - request object
 * @param res - response object
 * @param next - next handler*
 */
export async function getEvent(req, res, next) {
    res.set('Content-Type', 'application/json');

    try {
        const result = await Event.getEvent(req.params.id);
        res.send(result);
    } catch (err) {
        next(err);
    }
}
/**
 * Handles requests to get all events.
 * @param req - request object
 * @param res - response object
 * @param next - next handler*
 */
export async function getEvents(req, res, next) {
    res.set('Content-Type', 'application/json');

    try {
        let result;
        if (req.query.date) {
            result = await Event.getEventsForDate(req.query.date);
        } else {
            result = await Event.getEvents();
        }
        res.send(result);
    } catch (err) {
        next(err);
    }
}

/**
 * Handles requests to get events on the specified date.
 * @param req - request object
 * @param res - response object
 * @param next - next handler*
 */
export async function getEventsForDate(req, res, next) {
    res.set('Content-Type', 'application/json');

    try {
        const result = await Event.getEventsForDate(req.params.date);
        res.send(result);
    } catch (err) {
        next(err);
    }
}
/**
 * Handles requests to add an event.
 * @param req - request object
 * @param res - response object
 * @param next - next handler
 */
export async function addEvent(req, res, next) {
    res.set('Content-Type', 'application/json');
    try {
        // construct uuid
        const uid = `urn:uuid:${uuidv1()}`;
        let result = await Event.addEvent(uid, req.body.updateDate, req.body.titleText, req.body.mainText, req.body.redirectionUrl);
        if (result) {
            result = {
                status: 'success',
                id: result.insertId
            };
        } else {
            throw new APIError('addEvent failure', HttpStatus.BAD_REQUEST, true);
        }
        res.send(result);
    } catch (err) {
        next(err);
    }
}

/**
 * Handles requests to update an event.
 * @param req - request object
 * @param res - response object
 * @param next - next handler
 */
export async function updateEvent(req, res, next) {
    res.set('Content-Type', 'application/json');
    try {
        const existing = await Event.getEvent(req.params.id);
        let result = {};
        if (existing.length === 0) {
            throw new APIError('Invalid id', HttpStatus.BAD_REQUEST, true);
        }
        result = await Event.updateEvent(req.params.id, existing[0], req.body.updateDate, req.body.titleText, req.body.mainText, req.body.redirectionUrl);
        if (result) {
            result = {
                status: 'success'
            };
        } else {
            throw new APIError('updateEvent failure', HttpStatus.BAD_REQUEST, true);
        }

        res.send(result);
    } catch (err) {
        next(err);
    }
}
/**
 * Handles requests to delete an event.
 * @param req - request object
 * @param res - response object
 * @param next - next handler
 */
export async function deleteEvent(req, res, next) {
    res.set('Content-Type', 'application/json');
    try {
        let result = await Event.deleteEvent(req.params.id);
        if (result) {
            result = {
                status: 'success',
                id: result.insertId
            };
        } else {
            throw new APIError('Invalid id', HttpStatus.BAD_REQUEST, true);
        }
        res.send(result);
    } catch (err) {
        next(err);
    }
}
