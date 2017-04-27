'use strict';

const Controller = require('./controllers/user.controller.js');

exports.register = function(server, options, next) {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'GET',
        path: '/dang-nhap',
        config: Controller.dangNhap
    });

    next();
};

exports.register.attributes = {
    name: 'web-user'
};