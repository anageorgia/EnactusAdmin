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
      .controller('cargoCtrl', CargoCtrl);

  function CargoCtrl($scope, $window, $timeout, toastr) {

      $scope.areas = [];
      var ref = firebase.database().ref().child('/Times/' + "Enactus UFAL").orderByChild('wordcount');
      ref.once('value',function(snap) {
          snap.forEach(function(item) {
              var itemVal = item.val();
              $scope.areas.push(itemVal);
              
          });
      });
      console.log($scope.areas)
      // $scope.ares = firebase.database().ref("Times/" + "Enactus UFAL" + "/").set(arrayAreas);
      
      // $scope.createCargos = function(name) {
      //   var areas = document.getElementById('areas').value;
      //   var nomeTime = document.getElementById('nomeTime').value;
      //   var arrayAreas = areas.split(',');
         
      //   firebase.database().ref("Times/" + nomeTime + "/").set(arrayAreas);
      //   toastr.success('Time Criado com Sucesso!');
      // };    
  }
})();

