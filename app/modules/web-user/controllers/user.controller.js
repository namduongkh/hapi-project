'use strict';

exports.dangNhap = {
    handler: function(request, reply) {
        return reply.view('web-user/views/login', {
            meta: {
                title: "Đăng nhập"
            }
        });
    },
    auth: { mode: 'try' },
    plugins: {
        'hapi-auth-cookie': { redirectTo: false }
    }
};