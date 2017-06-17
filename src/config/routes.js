'use strict';

import AttractionsComponent from '../components/view-attractions/view-attractions';
import AppHeaderComponent from './../components/app-header/app-header';
import GetStartedComponent from './../components/app-getstarted/app-getstarted';
import AttractionsService from './../services/attractions/attractions.service';
import EntryPageComponent from './../components/entry-page/entry-page';
import LoginPageComponent from './../components/login-page/login-page';

resolveAttractions.$inject = [AttractionsService.name];
function resolveAttractions(attractionsService){
    return attractionsService.list();
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: '/home',
            component: EntryPageComponent.name
        })
        .state('getstarted', {
            url: '/getstarted',
            component: GetStartedComponent.name
        })
        .state('login', {
            url: '/login',
            component: LoginPageComponent.name
        })
        .state('attractions', {
            url: '/attractions',
            component: AttractionsComponent.name,
            resolve: {
              attractions : resolveAttractions
          }
        });
}
