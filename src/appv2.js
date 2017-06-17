var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
          url: '/home',
          /*component: AppHeaderComponent.name,*/
          templateUrl: './../components/app-header/app-header.template.html'
          /*resolve: {
              attractions : resolveAttractions
          }*/
      })
      .state('getstarted', {
          url: '/getstarted',
          /*component: GetStartedComponent.name*/
          templateUrl: './../components/app-getstarted/app-getstarted.template.html'
      });


});
