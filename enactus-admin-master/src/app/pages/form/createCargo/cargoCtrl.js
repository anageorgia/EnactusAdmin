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

      function newCargo(area) {
        var json = {};
        json[area] = {
          cargos: null
        };
        return json
      }

      $scope.areas = [];
      $scope.nomeAreas = [];
      var ref = firebase.database().ref().child('/Times/' + "Enactus UFAL/nomeAreas/").orderByChild('wordcount');
      ref.once('value',function(snap) {
          snap.forEach(function(item) {
              var itemVal = item.val();
              $scope.nomeAreas.push(itemVal);
              $scope.areas.push(newCargo(itemVal));
              
          });
      });
      
      $scope.createCargos = function() {

          for (var i = 0; i < $scope.areas.length; i++) {
            var cargos = $scope.areas[i].cargos;
            var arrayCargos = cargos.split(',');

            firebase.database().ref("Times/" + 
              "Enactus UFAL" + "/" + $scope.nomeAreas[i] + "/").set(arrayCargos);
          }
           toastr.success('Cargos criados com Sucesso!');
      };    
  }
})();

