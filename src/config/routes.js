'use strict';

import AttractionsComponent from '../components/view-attractions/view-attractions';
import TravelComponent from '../components/view-travel/view-travel.component';
import AppHeaderComponent from './../components/app-header/app-header';
import GetStartedComponent from './../components/app-getstarted/app-getstarted';
import AttractionsService from './../services/attractions/attractions.service';
import TravelService from './../services/travel/travel.service';
import EntryPageComponent from './../components/entry-page/entry-page';
import LoginPageComponent from './../components/login-page/login-page.component';
import PartnersComponent from './../components/partners/partners';
import AboutPageComponent from './../components/about-page/about-page';
import CategorySelectionComponent from './../components/category-selection/category-selection';
import EnterJourneyComponent from './../components/enter-journey/enter-journey';


resolveAttractions.$inject = [AttractionsService.name];
function resolveAttractions(attractionsService){
    return attractionsService.allBest();
}

resolveTravel.$inject = [TravelService.name];
function resolveTravel(TravelService){
    return TravelService.list();
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
            component: CategorySelectionComponent.name,
            resolve: {
              attractions : resolveAttractions
            }
        })
        .state('attractions', {
            url: '/attractions',
            component: AttractionsComponent.name,
            resolve: {
              attractions : resolveAttractions
          }
        })
        .state('travel', {
            url: '/travel',
            component: TravelComponent.name,
            resolve: {
              travel : resolveTravel
            }
        })
        .state('enter-journey', {
            url: '/journey',
            component: EnterJourneyComponent.name
        });

            /*SB: This segment removes the # from the URL
            $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
        });*/
}
