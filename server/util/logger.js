const bunyan = require('bunyan');

const reqSerializer = (req) => {
    return {
        query: (typeof req.query === 'function')
            ? req.query() : req.query,
        method: req.method,
        url: req.url
    };
};
const resSerializer = (res) => {
    return {
        statusCode: res.statusCode
    };
};

const log = bunyan.createLogger({
    name: 'flashBriefing',
    serializers: {
        req: reqSerializer,
        res: resSerializer
    }
});

export default log;
