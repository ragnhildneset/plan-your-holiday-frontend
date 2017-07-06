'use strict';

import AttractionsComponent from '../components/view-attractions/view-attractions';
import EnterJourneyComponent from '../components/enter-journey/enter-journey'
import AppHeaderComponent from './../components/app-header/app-header';
import GetStartedComponent from './../components/app-getstarted/app-getstarted';
import EntryPageComponent from './../components/entry-page/entry-page';
import LoginPageComponent from './../components/login-page/login-page.component';
import PartnersComponent from './../components/partners/partners';
import AboutPageComponent from './../components/about-page/about-page';
import CategorySelectionComponent from './../components/category-selection/category-selection';

import AttractionsService from './../services/attractions/attractions.service'


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
        .state('partners', {
            url: '/partners',
            component: PartnersComponent.name
        })
        .state('about', {
            url: '/about',
            component: AboutPageComponent.name
        })
        .state('categories', {
            url: '/categories',
            component: CategorySelectionComponent.name
        })
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
        });

            /*SB: This segment removes the # from the URL
            $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
        });*/
}
