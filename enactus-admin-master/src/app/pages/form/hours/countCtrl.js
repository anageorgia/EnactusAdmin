(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form')
      .controller('countCtrl', CountCtrl);

  /** @ngInject */
  function CountCtrl($scope) {
   var vm = this;

    vm.personalInfo = {};
    vm.productInfo = {};
    vm.shipment = {};

    vm.arePersonalInfoPasswordsEqual = function () {
      return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
    };
  }

})();

