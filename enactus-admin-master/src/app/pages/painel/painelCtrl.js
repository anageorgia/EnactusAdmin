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
  
  angular.module('BlurAdmin.pages.painel')
      .controller('painelCtrl', PainelCtrl);

  function PainelCtrl($scope, $window, $timeout, toastr) {

      $scope.users = [];
      var ref = firebase.database().ref().child('/Times/' + "Enactus UFAL/Users/").orderByChild('wordcount');
      ref.once('value',function(snap) {
          snap.forEach(function(item) {
              var itemVal = item.val();
              $scope.users.push(itemVal);
          });
      });

      console.log($scope.users)
      
      // $scope.createCargos = function() {

      //     for (var i = 0; i < $scope.areas.length; i++) {
      //       var cargos = $scope.areas[i].cargos;
      //       var arrayCargos = cargos.split(',');

      //       firebase.database().ref("Times/" + 
      //         "Enactus UFAL" + "/" + $scope.nomeAreas[i] + "/").set(arrayCargos);
      //     }
      //      toastr.success('Cargos criados com Sucesso!');
      // };    
  }
})();

