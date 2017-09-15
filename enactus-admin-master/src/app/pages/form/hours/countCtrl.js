(function () {
  'use strict';

  var myapp = angular.module('BlurAdmin.pages.form')
      .controller('countCtrl', CountCtrl);

    myapp.factory('Data', function(){
        return { date: '' };
    });

  /** @ngInject */
  function CountCtrl($scope, Data) {
   var vm = this;

    vm.personalInfo = {};
    vm.productInfo = {};
    vm.shipment = {};

    vm.arePersonalInfoPasswordsEqual = function () {
      return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
    };
  }

})();

