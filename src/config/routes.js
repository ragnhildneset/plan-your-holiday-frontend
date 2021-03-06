'use strict';

import AttractionsComponent from '../components/view-attractions/view-attractions';
import TravelComponent from '../components/view-travel/view-travel.component';
import AppHeaderComponent from './../components/app-header/app-header';
import GetStartedComponent from './../components/app-getstarted/app-getstarted';
import TravelService from './../services/travel/travel.service';
import EntryPageComponent from './../components/entry-page/entry-page';
import LoginPageComponent from './../components/login-page/login-page.component';
import PartnersComponent from './../components/partners/partners';
import AboutPageComponent from './../components/about-page/about-page';
import CategorySelectionComponent from './../components/category-selection/category-selection';
import EnterJourneyComponent from './../components/enter-journey/enter-journey';
import FeedbackComponent from './../components/feedback/feedback';
import EditUserComponent from './../components/edit-user/edit-user';

import AttractionsService from './../services/attractions/attractions.service'
import CityService from './../services/cities/city.service';

resolveAttractions.$inject = ['$stateParams', AttractionsService.name];
function resolveAttractions($stateParams,attractionsService){
    return attractionsService.city($stateParams.cityId);
}

resolveAttractionsDEV.$inject = [AttractionsService.name];
function resolveAttractionsDEV(attractionsService){
    return attractionsService.city('56aa0db353c8040f4cc54647');
}

resolveCities.$inject = [CityService.name];
function resolveCities(cityService){
    return cityService.list();
}

resolveTravels.$inject = [TravelService.name];
function resolveTravels(TravelService){
    return TravelService.list();
}

resolveTravel.$inject = ['$stateParams', TravelService.name];
function resolveTravel($stateParams, TravelService){
    return TravelService.get($stateParams.travelID);
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
            url: '/categories:cityId',
            component: CategorySelectionComponent.name,
            resolve: {
              attractions : resolveAttractions
            }
        }).state('DEVcategories', {
            url: '/DEVcategories',
            component: CategorySelectionComponent.name,
            resolve: {
              attractions : resolveAttractionsDEV
            }
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
            component: EnterJourneyComponent.name,
            resolve: {
                cities : resolveCities
            }
        })
        .state('travel', {
            url: '/travel:travelID',
            component: TravelComponent.name,
            resolve: {
              travel : resolveTravel
            }
        })
        .state('edit-user', {
          url: '/preferences',
          component: EditUserComponent.name
        })
        .state('feedback', {
            url: '/feedback:travelID',
            component: FeedbackComponent.name,
            resolve: {
              travel : resolveTravel
            }
        });

            /*SB: This segment removes the # from the URL
            $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
        });*/
}
