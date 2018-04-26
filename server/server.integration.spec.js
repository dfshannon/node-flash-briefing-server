
import sinon from 'sinon';
import chai from 'chai';
import request from 'supertest';
import * as HttpStatus from 'http-status';
import * as Event from './model/event';
import app from './server';
import config from './util/config';

const {expect} = chai;
const sandbox = sinon.sandbox.create();
const today = new Date();
const eventListResp = [{id: 1, updateDate: today.toISOString()}, {id: 2, updateDate: '2018-04-01T04:00:00.000Z'}];

/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

describe('server-integration tests', function () {
    describe('# GET /health', function () {
        it('should return OK', function (done) {
            request(app)
                .get('/health')
                .expect(HttpStatus.OK)
                .then(function (res) {
                    expect(res.text).to.equal('OK');
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /flashbriefing', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'getEventsForDate').returns(eventListResp.filter(event => event.updateDate === today.toISOString()));
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .get('/flashbriefing')
                .expect(HttpStatus.OK)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0].id).to.equal(1);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /event', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'getEvents').returns(eventListResp);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .get('/event')
                .expect(HttpStatus.OK)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.length).to.equal(2);
                    expect(res.body[0].id).to.equal(1);
                    expect(res.body[1].id).to.equal(2);
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /event?date=yyyy-mm-dd', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'getEventsForDate').returns(eventListResp.slice(1));
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .get('/event?date=2018-04-01')
                .expect(HttpStatus.OK)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.length).to.equal(1);
                    expect(res.body[0].id).to.equal(2);
                    done();
                })
                .catch(done);
        });
    });

    describe('# POST /event', function () {
        let stub;
        beforeEach(function () {
            stub = sandbox.stub(Event, 'addEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .post('/event')
                .auth(config.testUser, config.testPassword)
                .send({
                    updateDate: '2018-04-12',
                    titleText: 'title',
                    mainText: 'test',
                    redirectionUrl: 'https://github.com/dfshannon/'
                })
                .expect(HttpStatus.OK)
                .then(function (res) {
                    expect(stub.getCall(0).args[0].indexOf('urn:uuid') !== -1);
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.status).to.equal('success');
                    done();
                })
                .catch(done);
        });
    });

    describe('# POST /event not authorized', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'addEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .post('/event')
                .send({
                    updateDate: '2018-04-12',
                    titleText: 'title',
                    mainText: 'test',
                    redirectionUrl: 'https://github.com/dfshannon/'
                })
                .expect(HttpStatus.UNAUTHORIZED)
                .then(function () {
                    done();
                })
                .catch(done);
        });
    });


    describe('# POST /event missing titleText parameter', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'addEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return Bad Request', function (done) {
            request(app)
                .post('/event')
                .auth(config.testUser, config.testPassword)
                .send({updateDate: '2018-04-12', mainText: 'test', redirectionUrl: 'https://github.com/dfshannon/'})
                .expect(HttpStatus.BAD_REQUEST)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.message).to.equal('"titleText" is required');
                    done();
                })
                .catch(done);
        });
    });

    describe('# POST /event with invalid updateDate parameter', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'addEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return Bad Request', function (done) {
            request(app)
                .post('/event')
                .auth(config.testUser, config.testPassword)
                .send({
                    updateDate: '04-2018-12',
                    titleText: 'title',
                    mainText: 'test',
                    redirectionUrl: 'https://github.com/dfshannon/'
                })
                .expect(HttpStatus.BAD_REQUEST)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.message).to.equal('"updateDate" with value "04-2018-12" fails to match the required pattern: /^\\d{4}-\\d{2}-\\d{2}$/');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /event/:id', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'getEvent').returns([{
                updateDate: '04-2018-12',
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }]);
            sandbox.stub(Event, 'updateEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .put('/event/1')
                .auth(config.testUser, config.testPassword)
                .send({updateDate: '2018-04-12'})
                .expect(HttpStatus.OK)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.status).to.equal('success');
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /event/:id no authorization', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'getEvent').returns([{
                updateDate: '04-2018-12',
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }]);
            sandbox.stub(Event, 'updateEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .put('/event/1')
                .send({updateDate: '2018-04-12'})
                .expect(HttpStatus.UNAUTHORIZED)
                .then(function () {
                    done();
                })
                .catch(done);
        });
    });

    describe('# PUT /event/:id with invalid id', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'getEvent').returns([]);
            sandbox.stub(Event, 'updateEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return Bad Request', function (done) {
            request(app)
                .put('/event/1')
                .auth(config.testUser, config.testPassword)
                .send({updateDate: '2018-04-12'})
                .expect(HttpStatus.BAD_REQUEST)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.message).to.equal('Invalid id');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /event/:id', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'deleteEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .delete('/event/1')
                .auth(config.testUser, config.testPassword)
                .send({updateDate: '2018-04-12'})
                .expect(HttpStatus.OK)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.status).to.equal('success');
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /event/:id no authorization', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'deleteEvent').returns(true);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .delete('/event/1')
                .send({updateDate: '2018-04-12'})
                .expect(HttpStatus.UNAUTHORIZED)
                .then(function () {
                    done();
                })
                .catch(done);
        });
    });

    describe('# DELETE /event/:id with invalid id', function () {
        beforeEach(function () {
            sandbox.stub(Event, 'deleteEvent').returns(false);
        });
        afterEach(function () {
            sandbox.restore();
        });

        it('should return OK', function (done) {
            request(app)
                .delete('/event/1')
                .auth(config.testUser, config.testPassword)
                .send({updateDate: '2018-04-12'})
                .expect(HttpStatus.BAD_REQUEST)
                .then(function (res) {
                    expect(res.headers['content-type']).to.equal('application/json; charset=utf-8');
                    expect(res.body.message).to.equal('Invalid id');
                    done();
                })
                .catch(done);
        });
    });
});
