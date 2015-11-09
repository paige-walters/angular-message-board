/**
 * Created by paigewalters on 11/6/15.
 */

var myApp = angular.module('myApp', []);

myApp.controller("WelcomeController",['$scope', '$http', function($scope, $http){
    $scope.note = {};
    $scope.nameArray = [];


    $scope.clickButton = function(kittyfoo){
        $http.post('/data', kittyfoo).then(function(response){
            $scope.getPeople();
            //Call get people
        });
        //$scope.nameArray.push($scope.note);
        //    console.log($scope.nameArray);
        //    $scope.note = {};
    };

    $scope.getPeople = function(){
        $http.get('/data').then(function(response){
            console.log(response.data);
            $scope.nameArray = response.data;

        });
    };

    $scope.getPeople();


    $scope.deleteButton = function(id){
        $http.delete('/data' + id).then(function(response){
            $scope.getPeople();
        })
    };
}]);


//$(document).ready(function(){
//    $('#board').hide();
//
//    $("#message").submit(function(event){
//        event.preventDefault();
//        var values = {};
//
//        $.each($(this).serializeArray(), function(i, field){
//            values[field.name] = field.value;
//        });
//
//
//        $('#message').find("input[type=text]").val("");
//        $('#comment').val("");
//        $('#board').show();
//
//
//
//        $.ajax({
//            type: "POST",
//            url: "/data",
//            data: values,
//            success: function(data){
//                getData();
//
//            }
//        });
//
//        getData(values);
//    });
//
//
//    getData();
//});
//
//
//function getData(values) {
//    $.ajax({
//        type: "GET",
//        url: "/data",
//        data: values,
//        success: function (data) {
//            console.log("got data");
//            updateDOM(data);
//        }
//    })
//}
//
//
//function updateDOM(data){
//    $("#board").empty();
//
//    for(var i = 0; i < data.length; i++){
//        var el = "<div class='individuals well col-lg-2'>" +
//            "<p>" + data[i].name + "</p>" +
//            "<p>" + data[i].comment + "</p>" +
//            //"<button class='delete btn btn-danger' data-id='" +
//            //data[i].id + "'>Delete</button>" +
//            "</div>";
//
//        $("#board").append(el);
//    }
//}