'use strict';

module.exports = {
    web: {
        assets: {
            js: [
                '/libs/angular/angular.min.js',
                '/template/js/jquery.js',
                '/template/js/bootstrap.min.js',
                // '/template/js/plugins/morris/raphael.min.js',
                // '/template/js/plugins/morris/morris.min.js',
                // '/template/js/plugins/morris/morris-data.js',
                '/libs/clipboard/dist/clipboard.min.js',
                '/libs/ngclipboard/dist/ngclipboard.min.js',
                '/dist/main.js',
            ],
            css: [
                '/dist/main.css',
                '/template/css/bootstrap.min.css',
                '/template/css/sb-admin.css',
                // '/template/css/plugins/morris.css',
                '/template/font-awesome/css/font-awesome.min.css',
            ]
        }
    }
};