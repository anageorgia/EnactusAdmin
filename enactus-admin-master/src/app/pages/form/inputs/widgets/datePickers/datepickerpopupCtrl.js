/**
 * Created by n.poltoratsky
 * on 23.06.2016.
 */
(function(){
    'use strict';

    var myapp = angular.module('BlurAdmin.pages.form')
        .controller('datepickerpopupCtrl', datepickerpopupCtrl);

    myapp.factory('Data', function(){
        return { date: '' };
    });

    /** @ngInject */
    function datepickerpopupCtrl($scope, Data) {

        $scope.vm.activiteInfo.date = Data;
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