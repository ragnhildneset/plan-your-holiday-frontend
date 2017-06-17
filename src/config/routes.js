'use strict';

import AttractionsComponent from '../components/view-attractions/view-attractions';
import AppHeaderComponent from './../components/app-header/app-header';
import GetStartedComponent from './../components/app-getstarted/app-getstarted';
import AttractionsService from './../services/attractions/attractions.service';

resolveAttractions.$inject = [AttractionsService.name];
function resolveAttractions(attractionsService){
    return attractionsService.list();
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /home
    /*$urlRouterProvider.otherwise("/home");*/

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
}
