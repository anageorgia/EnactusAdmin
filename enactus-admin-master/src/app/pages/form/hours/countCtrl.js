(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .controller('countCtrl', CountCtrl);

    var firebaseUsers;

    firebase.database().ref('/Users/').once('value').then(function(snapshot) {
        firebaseUsers = snapshot.val();
    });


  /** @ngInject */
  function CountCtrl($scope, $filter, editableOptions, editableThemes, $timeout) {
      $scope.hourForm = {};

      $scope.progressFunction = function() {

          return $timeout(function() {}, 3000);
      };

      $scope.send = function (nome, data, inicio, termino) {
          var json = {
              dataAtividade: data,
              horaInicio: inicio,
              horaTermino: termino,
              nomeAtividade: nome,
          };

          firebase.database().ref('Atividades/ContagemDeHoras/' + data + '-' + nome).set(json);

          console.log(json);
      };


      // var vm = this;

      // vm.arePersonalInfoPasswordsEqual = function () {
      //   return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
      // };

      //Data Scopes
      $scope.open = open;
      $scope.opened = false;
      $scope.formats = [ 'dd/MM/yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.options = {
          showWeeks: false
      };

      function open() {
          $scope.opened = true;
      }
      //End Data Scopes

      //Table Scopes
      $scope.smartTablePageSize = 10;

      $scope.editableTableData = $.map(firebaseUsers, function(el) { return el });
      console.log($scope.editableTableData);

      $scope.statuses = [
          {value: 1, text: 'Normal'},
          {value: 2, text: 'Ruim'},
          {value: 3, text: 'Péssimo'},
          {value: 4, text: 'Bom'},
          {value: 5, text: 'Ótimo'},
          {value: 6, text: 'Excelente'}
      ];

      $scope.groups = [
          {id: 1, text: 'Pontual'},
          {id: 2, text: 'Aceitável'},
          {id: 3, text: 'Atrasado'},
          {id: 4, text: 'Muito Atrasado'}
      ];

      $scope.showGroup = function(user) {
          if(user.group && $scope.groups.length) {
              var selected = $filter('filter')($scope.groups, {id: user.group});
              return selected.length ? selected[0].text : 'Indefinido';
          } else return 'Indefinido'
      };

      $scope.showStatus = function(user) {
          var selected = [];
          if(user.status) {
              selected = $filter('filter')($scope.statuses, {value: user.status});
          }
          return selected.length ? selected[0].text : 'Indefinido';
      };

      $scope.removeUser = function(index) {
          $scope.users.splice(index, 1);
      };

      $scope.addUser = function(name) {
          $scope.inserted = {
              id: $scope.users.length+1,
              name: name,
              status: null,
              group: null
          };
          $scope.users.push($scope.inserted);
      };

      editableOptions.theme = 'bs3';
      editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
      editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  }

})();

