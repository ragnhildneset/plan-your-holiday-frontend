'use strict';

import AttractionsComponent from '../components/view-attractions/view-attractions';
import EnterJourneyComponent from '../components/enter-journey/enter-journey'
import AttractionsService from './../services/attractions/attractions.service'

resolveAttractions.$inject = [AttractionsService.name];
function resolveAttractions(attractionsService){
    return attractionsService.list();
}

config.$inject = ['$stateProvider', '$urlRouterProvider'];
export default function config ($stateProvider, $urlRouterProvider){

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/enter-journey");

    $stateProvider
        .state('attractions', {
            url: '/attractions',
            component: AttractionsComponent.name,
            resolve: {
                attractions : resolveAttractions
            }
        })
        .state('enter-journey', {
            url: '/enter-journey',
            component: EnterJourneyComponent.name
        })
}
