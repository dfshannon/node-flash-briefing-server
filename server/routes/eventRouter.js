/**
 * Router for event api.
 *
 * @module eventRouter
 */
import express from 'express';
import * as ExpressValidation from 'express-validation';
import basicAuth from 'express-basic-auth';
import * as EventController from '../controllers/eventController';
import * as ParamValidation from '../util/param-validation';
import config from '../util/config';

const router = express.Router();
const authUser = process.env.NODE_ENV === 'test' ? config.testUser : process.env.AUTH_USER;
const authPassword = process.env.NODE_ENV === 'test' ? config.testPassword : process.env.AUTH_PASSWORD;
const users = {[authUser]: authPassword};

// handle event request, updates are protected by basic authentication
router.route('/')
    .get(EventController.getEvents)
    .post(basicAuth({
        users,
        challenge: true
    }), ExpressValidation.validate(ParamValidation.addEvent), EventController.addEvent);

router.route('/:id')
    .get(EventController.getEvent)
    .put(basicAuth({
        users,
        challenge: true
    }), ExpressValidation.validate(ParamValidation.updateEvent), EventController.updateEvent)
    .delete(basicAuth({
        users,
        challenge: true
    }), EventController.deleteEvent);

export default router;
