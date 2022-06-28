'use strict'

angular
  .module('farmCimerang', ['appController', 'ngMaterial', 'ngMessages', 'ui.router', 'firebase', 'chart.js'])
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

    $stateProvider      
      .state('login', {
        url: '/login',
        templateUrl: 'login.html'
      })
      .state('menu', {
        url: '/menu',
        templateUrl: 'app/views/menu.html'
      })
      .state('menu.home', {
        url: '/dashboard',
        templateUrl: 'app/views/home.html'
      })
      .state('menu.dashboard', {
        url: "/dashboard/kandang/{index:int}",
        templateProvider: function($templateRequest, $stateParams) {

          var index = $stateParams.index;
          var templateName = 'app/views/dashboard' + index + '.html';

          return $templateRequest(templateName);
        },
      })     
      .state('menu.input-data', {
        url: '/input-data',
        templateUrl: 'app/views/admin.html'
      })      
      .state('menu.daftar', {
        url: '/daftar',
        templateUrl: 'app/views/daftar.html',
        controller: 'userController',
        controllerAs: 'vm'
      })
      .state('menu.panen', {
        url: '/panen',
        templateUrl: 'app/views/panen.html',
        controller: 'adminController',
        controllerAs: 'vm'
      })
      .state('menu.pengaturan', {
        url: '/pengaturan',
        templateUrl: 'app/views/setting.html',
        controller: 'adminController',
        controllerAs: 'vm'
      });
    
    $urlRouterProvider.otherwise('/login');
  
    $mdThemingProvider
      .theme('default')
      .primaryPalette('amber')
      .accentPalette('red');

    $mdThemingProvider
      .theme('tabs')
      .primaryPalette('red')
      .accentPalette('amber');
  });

  // .state('correlation', {
  //   url: 'https://chicken-soul.azurewebsites.net/',
  //   external: true
  // })