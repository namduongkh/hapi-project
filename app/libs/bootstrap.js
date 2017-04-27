'use strict';

const Path = require('path');
const Glob = require("glob");

var people = { // our "users database" 
    1: {
        id: 1,
        name: 'Jen Jones'
    }
};

var people = { // our "users database" 
    1: {
        id: 1,
        name: 'Jen Jones'
    }
};

module.exports = function(server) {
    server.register([{
        register: require('vision')
    }, {
        register: require('inert')
    }, {
        // Plugin xử lý để load các file tĩnh
        register: require('./static.js')
    }, {
        register: require('hapi-auth-cookie')
    }, {
        // Kết nối mongodb
        register: require('./mongo.js')
    }], (err) => {
        if (err) {
            server.log(['error', 'server'], err);
        }

        server.auth.strategy('jwt', 'jwt', {
            key: 'NeverShareYourSecret', // Never Share your secret key 
            validateFunc: validate, // validate function defined above 
            verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm 
        });

        server.auth.default('jwt');

        let config = server.configManager;

        // Cài đặt template engine: Đang sử dụng handlebars
        server.views({
            engines: {
                html: require('handlebars'),
            },
            helpersPath: global.BASE_PATH + '/app/views/helpers',
            relativeTo: global.BASE_PATH + '/app/modules',
            partialsPath: global.BASE_PATH + '/app/views/layouts/partials',
            layoutPath: global.BASE_PATH + '/app/views/layouts',
            layout: true,
            context: {
                settings: config.get("web.settings"),
                assets: config.get("web.assets"),
                meta: {
                    title: 'Helper'
                }
            }
        });

        // Load các model trong các module
        let models = Glob.sync(BASE_PATH + "/app/modules/*/model/*.js", {});
        models.forEach((item) => {
            require(Path.resolve(item));
        });

        // Tùy theo từng connection của từng label mà load các route trong các module thuộc label đó vào
        server.connections.forEach(function(connectionSetting) {
            let labels = connectionSetting.settings.labels;
            labels.forEach(name => {
                let modules = [];
                let modulesName = Glob.sync(BASE_PATH + `/app/modules/${name}-*/index.js`, {});
                modulesName.forEach((item) => {
                    modules.push(require(Path.resolve(`${item}`)));
                });
                if (modules.length) {
                    server.register(modules, { select: [name] }, (err) => {
                        if (err) {
                            server.log(['error', 'server'], err);
                        }
                    });
                }
            });
        });

    });
};