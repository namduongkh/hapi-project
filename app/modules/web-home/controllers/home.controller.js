'use strict';

exports.index = {
    handler: function(request, reply) {
        return reply.view('web-home/views/index', {
            meta: {
                title: "Trang chủ"
            }
        });
    }
};