'use strict';

import angular from 'angular';

import TravelService from './travel.service';


export default angular.module('TravelServiceDefinition', [])
    .service(TravelService.name, TravelService)