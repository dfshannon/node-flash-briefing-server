import Express from 'express';
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import helmet from 'helmet';
import * as expressValidation from 'express-validation';
import config from './util/config';
import log from './util/logger';
import APIError from './util/APIError';
import routes from './routes/routes';

// Initialize the Express App
const app = Express();

log.info(`Starting server.js, environment: ${process.env.NODE_ENV}, port: ${config.port}, db ${process.env.DB_DATABASE}`);

// modify request with data
app.use(bodyParser.json({limit: '100kb'}));

// secure headers
app.use(helmet());


// log requests in dev
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        log.info({req, res});
        next();
    });
}

// api routes
app.use('/', routes);


// Error handling logic and param validation thanks to Kunal Kapadia
// https://github.com/kunalkapadia/express-mongoose-es6-rest-api
// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
        const error = new APIError(unifiedErrorMessage, err.status, true);
        return next(error);
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.isPublic);
        return next(apiError);
    }
    return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    log.error(`Error: ${err.message}`);
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
});

// Last ditch error handling!
process.on('uncaughtException', (err) => {
    log.fatal(`uncaughtException : ${err.stack}`);
});

process.on('unhandledRejection', (reason) => {
    log.error(`Unhandled promise rejection: ${reason}`);
});

// development app started in index.js
if (process.env.NODE_ENV === 'production') {
    // start app
    app.listen(config.port, (error) => {
        if (error) {
            log.fatal(`Error starting server ${error.toString()}`); // eslint-disable-line
        }
    });
}
app.disable('x-powered-by');

export default app;
