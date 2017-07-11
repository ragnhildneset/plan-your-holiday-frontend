'use strict';

import angular from 'angular';

import ViewTravelComponent from './view-travel.component';


export default angular.module('viewTravel', [])
    .component(ViewTravelComponent.name, new ViewTravelComponent);