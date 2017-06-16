'use strict';

import AttractionsComponent from '../components/view-attractions/view-attractions';
import AttractionsService from './../services/attractions/attractions.service';

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
            component: AttractionsComponent.name,
            resolve: {
                attractions : resolveAttractions
            }
        })
}
