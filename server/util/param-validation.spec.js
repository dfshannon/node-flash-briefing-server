import Joi from 'joi';
import chai from 'chai';
import * as ParamValidation from './param-validation';

/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */

const {expect} = chai;
const addEventSchema = Joi.object(ParamValidation.addEvent.body);
const updateEventSchema = Joi.object(ParamValidation.updateEvent.body);

describe('param-validation tests', function () {
    describe('# Add - Valid', function () {
        it('should return not return an error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, addEventSchema);
            expect(result.error).to.equal(null);
            done();
        });
    });

    describe('# Add - invalid updateDate', function () {
        it('should return error', function (done) {
            const result = Joi.validate({
                updateDate: '12-04-2018',
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, addEventSchema);
            expect(result.error).to.not.equal(null);
            expect(result.error.details[0].message).to.equal('"updateDate" with value "12-04-2018" fails to match the required pattern: /^\\d{4}-\\d{2}-\\d{2}$/');
            done();
        });
    });

    describe('# Add - missing updateDate', function () {
        it('should return error', function (done) {
            const result = Joi.validate({
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, addEventSchema);
            expect(result.error).to.not.equal(null);
            expect(result.error.details[0].message).to.equal('"updateDate" is required');
            done();
        });
    });

    describe('# Add - missing titleText', function () {
        it('should return error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, addEventSchema);
            expect(result.error).to.not.equal(null);
            expect(result.error.details[0].message).to.equal('"titleText" is required');
            done();
        });
    });

    describe('# Add - missing mainText', function () {
        it('should return error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                titleText: 'title',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, addEventSchema);
            expect(result.error).to.not.equal(null);
            expect(result.error.details[0].message).to.equal('"mainText" is required');
            done();
        });
    });

    describe('# Add - invalid redirectionUrl', function () {
        it('should return error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https/github.com/dfshannon/'
            }, addEventSchema);
            expect(result.error).to.not.equal(null);
            expect(result.error.details[0].message).to.equal('"redirectionUrl" must be a valid uri');
            done();
        });
    });

    describe('# Add - missing redirectionUrl', function () {
        it('should return error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                titleText: 'title',
                mainText: 'test'
            }, addEventSchema);
            expect(result.error).to.not.equal(null);
            expect(result.error.details[0].message).to.equal('"redirectionUrl" is required');
            done();
        });
    });

    describe('# Update - Valid', function () {
        it('should return not return an error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, updateEventSchema);
            expect(result.error).to.equal(null);
            done();
        });
    });

    describe('# Update - invalid updateDate', function () {
        it('should return error', function (done) {
            const result = Joi.validate({
                updateDate: '12-04-2018',
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, updateEventSchema);
            expect(result.error).to.not.equal(null);
            expect(result.error.details[0].message).to.equal('"updateDate" with value "12-04-2018" fails to match the required pattern: /^\\d{4}-\\d{2}-\\d{2}$/');
            done();
        });
    });

    describe('# Update - missing updateDate', function () {
        it('should not return error', function (done) {
            const result = Joi.validate({
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, updateEventSchema);
            expect(result.error).to.equal(null);
            done();
        });
    });

    describe('# Update - missing titleText', function () {
        it('should not return error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                mainText: 'test',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, updateEventSchema);
            expect(result.error).to.equal(null);
            done();
        });
    });

    describe('# Update - missing mainText', function () {
        it('should not return error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                titleText: 'title',
                redirectionUrl: 'https://github.com/dfshannon/'
            }, updateEventSchema);
            expect(result.error).to.equal(null);
            done();
        });
    });

    describe('# Update - invalid redirectionUrl', function () {
        it('should return error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                titleText: 'title',
                mainText: 'test',
                redirectionUrl: 'https/github.com/dfshannon/'
            }, updateEventSchema);
            expect(result.error).to.not.equal(null);
            expect(result.error.details[0].message).to.equal('"redirectionUrl" must be a valid uri');
            done();
        });
    });

    describe('# Update - missing redirectionUrl', function () {
        it('should not return error', function (done) {
            const result = Joi.validate({
                updateDate: '2018-04-12',
                titleText: 'title',
                mainText: 'test'
            }, updateEventSchema);
            expect(result.error).to.equal(null);
            done();
        });
    });
});
