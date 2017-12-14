/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.profile')
        .controller('ProfilePageCtrl', ProfilePageCtrl);


    /** @ngInject */
    function ProfilePageCtrl($scope, fileReader, $filter, $timeout, $window, $uibModal, toastr) {
        $scope.picture = $filter('profilePicture')('Nasta');

        $scope.removePicture = function () {
            $scope.picture = $filter('appImage')('theme/no-photo.png');
            $scope.noPicture = true;
        };

        $scope.uploadPicture = function () {
            var fileInput = document.getElementById('uploadFile');
            fileInput.click();
        };


        $scope.a = function (nome, cpf, area, cargo, curso, anoAcademico, grau, matricula, anoGraduacao, email, senha, skype, telefone, foto, endereco, atividadeAcademica) {
            var json = {
                nome: nome,
                cpf: cpf,
                area: area,
                cargo: cargo,
                curso: curso,
                anoAcademico: anoAcademico,
                // foto: foto,
                grau: grau,
                matricula: matricula,
                anoGraduacao: anoGraduacao,
                email: email,
                senha: senha,
                endereco: endereco,
                skype: skype,
                telefone: telefone,
                atividadeAcademica: atividadeAcademica
            };

            firebase.database().ref('Users/' + cpf).set(json);

            console.log(json);
            toastr.success('Membro cadastrado com Sucesso!');

            var countUp = function() {
                $window.location.href = '#/dashboard';
            };

            $timeout(countUp, 3000);

        };

        $scope.socialProfiles = [
            {
                name: 'Facebook',
                href: 'https://www.facebook.com/akveo/',
                icon: 'socicon-facebook'
            },
            {
                name: 'Twitter',
                href: 'https://twitter.com/akveo_inc',
                icon: 'socicon-twitter'
            },
            {
                name: 'Google',
                icon: 'socicon-google'
            },
            {
                name: 'LinkedIn',
                href: 'https://www.linkedin.com/company/akveo',
                icon: 'socicon-linkedin'
            },
            {
                name: 'GitHub',
                href: 'https://github.com/akveo',
                icon: 'socicon-github'
            },
            {
                name: 'StackOverflow',
                icon: 'socicon-stackoverflow'
            },
            {
                name: 'Dribbble',
                icon: 'socicon-dribble'
            },
            {
                name: 'Behance',
                icon: 'socicon-behace'
            }
        ];

        $scope.unconnect = function (item) {
            item.href = undefined;
        };

        $scope.showModal = function (item) {
            $uibModal.open({
                animation: false,
                controller: 'ProfileModalCtrl',
                templateUrl: 'app/pages/profile/profileModal.html'
            }).result.then(function (link) {
                item.href = link;
            });
        };

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function (result) {
                    $scope.picture = result;
                });
        };

        $scope.switches = [true, true, false, true, true, false];
    }

})();