// Error handling logic and param validation thanks to Kunal Kapadia
// https://github.com/kunalkapadia/express-mongoose-es6-rest-api
/**
 * @extends Error
 */
class ExtendableError extends Error {
    constructor(message, status, isPublic) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        Error.captureStackTrace(this, this.constructor.name);
    }
}

export default ExtendableError;
