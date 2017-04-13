(function() {
    'use strict';

    angular
        .module("app", ["GetUrl", "Jackpot", "ngclipboard", "GetLink", "Common"])
        .config(function($interpolateProvider) {
            $interpolateProvider.startSymbol('{[{');
            $interpolateProvider.endSymbol('}]}');
        });

})();