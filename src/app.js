'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import bootstrap from 'angular-ui-bootstrap';
import ngMdIcons from 'angular-material-icons';
import animate from 'angular-animate';
import datetimepicker from 'angular-bootstrap-datetimepicker';

import UserService from './services/users/user';
import AttractionsService from './services/attractions/attractions';
import CityService from './services/cities/city';
import TravelService from './services/travel/travel';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewAttractions from './components/view-attractions/view-attractions';
import EnterJourney from './components/enter-journey/enter-journey';
import ViewTravel from './components/view-travel/view-travel';
import AppGetstarted from './components/app-getstarted/app-getstarted';
import EntryPage from './components/entry-page/entry-page';
import LoginPage from './components/login-page/login-page';
import Partners from './components/partners/partners';
import AboutPage from './components/about-page/about-page';
import CategorySelection from './components/category-selection/category-selection';


let app = angular.module('app', [
    uiRouter,
    bootstrap,
    angularMaterial,
    animate,
    datetimepicker,
    AppContent.name,
    EnterJourney.name,
    ViewAttractions.name,
    ViewTravel.name,
    UserService.name,
    AttractionsService.name,
    TravelService.name,
    AppGetstarted.name,
    EntryPage.name,
    LoginPage.name,
    Partners.name,
    AboutPage.name,
    CategorySelection.name,
    CityService.name
]);

app.constant('API_URL', 'http://localhost:9000/api');
app.config(Routes);
app.config(Middlewares);


angular.element(document).ready(function() {
    return angular.bootstrap(document.body, [app.name], {
        strictDi: true
    });
});

export default app;
