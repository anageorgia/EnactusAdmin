/**
 * Created by n.poltoratsky
 * on 23.06.2016.
 */
(function(){
    'use strict';

    angular.module('BlurAdmin.pages.form')
        .controller('datepickerpopupCtrl', datepickerpopupCtrl);

    /** @ngInject */
    function datepickerpopupCtrl($scope) {

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
    }
})();