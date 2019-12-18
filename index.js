var app = angular.module("myApp", ["ngRoute"]);

app.controller("myCtrl", function ($scope, $http) {

    $http.get('/db/Subjects.js').then(function (ketQuaTraVe) {
        $scope.subjects = ketQuaTraVe.data;
    });
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.html"
        })
        .when("/home", {
            templateUrl: "home.html"
        })
        .when("/gioithieu", {
            templateUrl: "gioithieu.html"
        })
        .when("/hoidap", {
            templateUrl: "hoidap.html"
        })
        .when("/gopy", {
            templateUrl: "gopy.html"
        })
        .when("/quiz/:id", {
            templateUrl: "quiz.html",
            controller: myQuizCtrl
        })
});
app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });
    $rootScope.$on('$routChangeSuccsess', function () {
        $rootScope.loading = false;
    });
    $rootScope.$on('$routChangeError', function () {
        $rootScope.loading = false;
        alert("Loi, khong tai duoc template");
    });
});


function myQuizCtrl ($scope, $http, $routeParams) {

    let id = $routeParams.id;
    $scope.index = 0;

    $http.get("/db/Subjects.js").then(function (response) {
        let subjects = response.data;

        for (var i = 0; i < subjects.length; i++) {
            if (subjects[i].Id == id) {
                $scope.subject = subjects[i];
                break;
            }
        }
    });

    $http.get("/db/Quizs/" + id + ".js").then(function (response) {
        $scope.quizs = response.data;
    });

    $scope.first = function () {
        $scope.index = 0;
    }

    $scope.prev = function () {
        if ($scope.index > 0) {
            $scope.index--;
        }
    }

    $scope.next = function () {
        if ($scope.index < $scope.quizs.length - 1) {
            $scope.index++;
        }
    }

    $scope.last = function () {
        $scope.index = $scope.quizs.length - 1;
    }
};
