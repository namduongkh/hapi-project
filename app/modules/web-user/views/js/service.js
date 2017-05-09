(function() {
    'use strict';

    angular.module("User")
        .service("UserService", UserService);

    function UserService($http) {
        return {
            login: function(data) {
                return $http({
                    method: "POST",
                    url: apiPath + "/api/user/login",
                    data: data
                });
            },
            register: function(data) {
                return $http({
                    method: "POST",
                    url: apiPath + "/api/user/register",
                    data: data
                });
            },
        }
    }
})();