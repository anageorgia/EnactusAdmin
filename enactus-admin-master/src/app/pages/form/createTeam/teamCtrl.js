(function () {
  'use strict';

  var config = {
          apiKey: "AIzaSyCqrzP4ql2kEl6qnduPbYCubNo8rbIsP3c",
          authDomain: "enactusadmin.firebaseapp.com",
          databaseURL: "https://enactusadmin.firebaseio.com",
          projectId: "enactusadmin",
          storageBucket: "enactusadmin.appspot.com",
          messagingSenderId: "609493992310"
      };
  
  angular.module('BlurAdmin.pages.form')
      .controller('teamCtrl', TeamCtrl);

  function TeamCtrl($scope, $window, $timeout, toastr) {
      
      $scope.createTeam = function(name) {
        var areas = document.getElementById('areas').value;
        var nomeTime = document.getElementById('nomeTime').value;
        var arrayAreas = areas.split(',');
         
        firebase.database().ref("Times/" + nomeTime + "/nomeAreas/").set(arrayAreas);
        toastr.success('Time Criado com Sucesso!');
      };    
  }
})();

