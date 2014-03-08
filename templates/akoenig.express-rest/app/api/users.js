/*
 * @name@
 *
 * Copyright(c) 2014 @your name@ <@your email address@>
 * MIT Licensed
 *
 */

/**
 * @author @your name@ <@your email address@>
 *
 */

'use strict';

function UsersResource () {

}

UsersResource.prototype.one = function one (req, res) {
    res.send(200, {});
};

UsersResource.prototype.list = function list (req, res) {
    res.send(200, []);
};

UsersResource.prototype.create = function create (req, res) {
    res.send(201, []);
};

UsersResource.prototype.update = function update (req, res) {
    res.send(200, []);
};

UsersResource.prototype.remove = function remove (req, res) {
    res.send(200, []);
};

exports.init = function init (app, config) {
    var resource = new UsersResource();

    app.get('/',    resource.list.bind(resource));
    app.get('/:id', resource.one.bind(resource));
    app.post('/',   resource.create.bind(resource));
    app.put('/',    resource.update.bind(resource));
    app.del('/',    resource.remove.bind(resource));
};