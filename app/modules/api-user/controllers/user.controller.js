'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Boom = require('boom');
const JWT = require('jsonwebtoken');

exports.index = {
    handler: function(request, reply) {
        return reply("run");
    }
};

exports.login = {
    handler: function(request, reply) {
        let cookieOptions = request.server.configManager.get('web.cookieOptions');
        let {
            email,
            password,
        } = request.payload;
        User.findOne({
                email: email
            })
            .then(user => {
                user.authenticate(password, function(err, result) {
                    if (err || !result) {
                        request.log(['error', 'login'], err);
                        return reply(Boom.unauthorized("Đăng nhập không hợp lệ"));
                    }
                    if (result) {
                        var session = {
                            valid: true, // this will be set to false when the person logs out
                            id: user._id, // a random session id,
                            name: user.name,
                            scopes: user.roles,
                            exp: new Date().getTime() + 30 * 60 * 1000 // expires in 30 minutes time
                        };
                        const secret = request.server.configManager.get('web.jwt.secret');
                        var token = JWT.sign(session, secret); // synchronous
                        reply({
                            token: token,
                            phone: user.phone,
                            id: user._id
                        }).header("Authorization", token).state("token", token, cookieOptions);
                    }
                });

            }).catch(err => {
                return reply(false);
            });
    },
};

exports.register = {
    handler: function(request, reply) {
        let { email, password } = request.payload;
        let user = new User(request.payload);
        user.hashPassword(request.payload.password, function(err, hash) {
            user.password = hash;
            const promise = user.save();
            promise.then(user => {
                return reply(user);
            }).catch(err => {
                console.log("Err", err);
                return reply(false);
            });
        });
    }
};

exports.logout = {
    auth: 'jwt',
    handler: function(request, reply) {
        let cookieOptions = request.server.configManager.get('web.cookieOptions');
        reply({ status: true }).header("Authorization", '')
            .unstate('token', cookieOptions);
    },
};

exports.account = {
    pre: [{
        method: getAccountUser,
        assign: 'user'
    }],
    auth: 'jwt',
    handler: function(request, reply) {
        const user = request.pre.user;
        if (user) {
            if (user.password) {
                user.password = "haspassword";
            }
            return reply(user);
        }
        reply(Boom.unauthorized('User is not found'));
    }
};

function getAccountUser(request, reply) {
    if (request.auth.isAuthenticated) {
        const id = request.auth.credentials.id;
        let promise = User
            .findOne({
                _id: id
            })
            .lean();
        promise
            .then(function(user) {
                // console.log("User:", user);
                reply(user)
            })
            .catch(function(err) {
                request.log(['error'], err);
                return reply.continue();
            });
    } else {
        return reply(false);
    }
}