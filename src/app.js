'use strict';

import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import angularMaterial from 'angular-material';
import 'angular-material/angular-material.css';

import bootstrap from 'angular-ui-bootstrap';
import ngMdIcons from 'angular-material-icons';

import Routes from './config/routes';
import Middlewares from './config/middlewares';

import AppContent from './components/app-content/app-content';
import ViewAttractions from './components/view-attractions/view-attractions';
import AttractionsService from './services/attractions/attractions';

let app = angular.module('app', [
    uiRouter,
    bootstrap,
    angularMaterial,
    AppContent.name,
    ViewAttractions.name,
    AttractionsService.name
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
