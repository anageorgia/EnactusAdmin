/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form', ['ui.select', 'ngSanitize'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('form', {
          url: '/form',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Formulários',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('form.inputs', {
          url: '/inputs',
          templateUrl: 'app/pages/form/inputs/inputs.html',
          title: 'Form Inputs',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('form.layouts', {
          url: '/layouts',
          templateUrl: 'app/pages/form/layouts/layouts.html',
          title: 'Form Layouts',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('form.hours', {
            url: '/hours',
            templateUrl: 'app/pages/form/hours/hoursCount.html',
            title: 'Contagem de Horas',
            sidebarMeta: {
                order: 100,
            },
        })  
        .state('form.addMembers', {
            url: '/addMembers',
            templateUrl: 'app/pages/form/addMembers/addMembers.html',
            title: 'Adicionar Membros',
            sidebarMeta: {
                order: 100,
            },
        })        
        .state('form.createTeam', {
            url: '/createTeam',
            templateUrl: 'app/pages/form/createTeam/createTeam.html',
            title: 'Criação do Time',
            sidebarMeta: {
                order: 100,
            },
        })      
        .state('form.createCargo', {
            url: '/createCargo',
            templateUrl: 'app/pages/form/createCargo/createCargo.html',
            title: 'Criação de Cargos',
            sidebarMeta: {
                order: 100,
            },
        })
        .state('form.wizard',
        {
          url: '/wizard',
          templateUrl: 'app/pages/form/wizard/wizard.html',
          controller: 'WizardCtrl',
          controllerAs: 'vm',
          title: 'Form Wizard',
          sidebarMeta: {
            order: 200,
          },
        });
  }
})();
