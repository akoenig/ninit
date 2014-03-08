/*
 * test
 *
 * Copyright(c) 2014 ad <fsd>
 * MIT Licensed
 *
 */

/**
 * @author ad <fsd>
 *
 */

'use strict';

var helpers = require('./helpers');

describe('The /users', function () {

    beforeEach(function (done) {
        helpers.start(done);
    });

    afterEach(function (done) {
        helpers.stop(done);
    });

    it('should respond with a list', function (done) {
        helpers.GET(helpers.getEndpoint() + '/api/users', function (err, statusCode, body) {
            expect(err).toBeNull();
            expect(statusCode).toBe(200);
            expect(JSON.parse(body).length).toBe(0);

            done();
        });
    });
});