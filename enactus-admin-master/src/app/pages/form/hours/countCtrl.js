(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .controller('countCtrl', CountCtrl);

    var firebaseUsers;

    firebase.database().ref('/Users/').once('value').then(function(snapshot) {
        firebaseUsers = snapshot.val();
    });


  /** @ngInject */
  function CountCtrl($scope, $filter,  $window, editableOptions, editableThemes, $timeout, toastr) {
      $scope.hourForm = {};

      $scope.progressFunction = function() {

          return $timeout(function() {}, 3000);
      };

      function diff(startH,startM, endH, endM) {
          // start = start.split(":");
          // end = end.split(":");
          var startDate = new Date(0, 0, 0, startH, startM, 0);
          var endDate = new Date(0, 0, 0, endH, endM, 0);
          var diff = endDate.getTime() - startDate.getTime();
          var hours = Math.floor(diff / 1000 / 60 / 60);
          diff -= hours * 1000 * 60 * 60;
          var minutes = Math.floor(diff / 1000 / 60);

          return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
      }

      $scope.send = function (nome, dataDaAtividade, inicio, termino, membros) {

          var formatDate = $.datepicker.formatDate("dd-mm-yy", dataDaAtividade);
          var membrosChecked = $filter('filter')(membros, {checked: true});
          var duracao = diff(inicio.getHours(),inicio.getMinutes(),termino.getHours(),termino.getMinutes());
          var myJsonString = JSON.stringify(membrosChecked);

          // console.log(moment.utc(moment(inicio).diff(moment(termino))).format("HH:mm:ss"));
          // console.log($scope.showStatus(membros));
          // console.log($scope.showGroup(membros));
          var json = {
              dataAtividade:  formatDate,
              horaInicio: inicio.getHours() + ':' + inicio.getMinutes(),
              horaTermino: termino.getHours() + ':' + termino.getMinutes(),
              nomeAtividade: nome,
              duracao: duracao,
              membros: myJsonString
          };

          firebase.database().ref('Atividades/ContagemDeHoras/' + formatDate + '|' + nome).set(json);
          toastr.success('Horas Cadastradas com Sucesso!');

          console.log(json);

          var countUp = function() {
              $window.location.href = '#/dashboard';
              $window.location.reload();
          };

          $timeout(countUp, 3000);
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

