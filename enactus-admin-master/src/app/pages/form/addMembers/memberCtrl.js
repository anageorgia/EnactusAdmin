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
      .controller('memberCtrl', MemberCtrl);

  function MemberCtrl($scope, $window, $timeout, toastr) {
      $scope.members = [1];

      $scope.moreMembers = function() {
        $scope.members.push(Math.random());
      }

      $scope.removeMember = function() {
        $scope.members.splice(-1,1);
      }

      $scope.areas = [];
      var ref = firebase.database().ref().child('/Times/' + "Enactus UFAL").orderByChild('wordcount');
      ref.once('value',function(snap) {
          snap.forEach(function(item) {
              var itemVal = item.val();
              $scope.areas.push(itemVal);
              
          });
      });
      
      // var arrayAreas = $scope.areas.split(',');
      // console.log(arrayAreas)
      console.log($scope.areas)
      // $scope.ares = firebase.database().ref("Times/" + "Enactus UFAL" + "/").set(arrayAreas);
      
      $scope.createCargos = function(name) {
      //   var areas = document.getElementById('areas').value;
      //   var nomeTime = document.getElementById('nomeTime').value;
      //   var arrayAreas = areas.split(',');
         
      //   firebase.database().ref("Times/" + nomeTime + "/").set(arrayAreas);
      //   toastr.success('Time Criado com Sucesso!');
      };    
  }
})();

