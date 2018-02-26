/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables')
      .controller('TablesPageCtrl', TablesPageCtrl);

  var firebaseUsers;

    firebase.database().ref('/Users/').once('value').then(function(snapshot) {
        firebaseUsers = snapshot.val();
    });

  /** @ngInject */
  function TablesPageCtrl($scope, $filter, editableOptions, editableThemes) {

    $scope.smartTablePageSize = 10;

    $scope.editableTableData = $.map(firebaseUsers, function(el) { return el });

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
