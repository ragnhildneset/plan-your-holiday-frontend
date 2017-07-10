'use strict';

import angular from 'angular';

import CityService from './city.service';


export default angular.module('CitysServiceDefinition', [])
    .service(CityService.name, CityService)
