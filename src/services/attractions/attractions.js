'use strict';

import angular from 'angular';

import AttractionsService from './attractions.service';


export default angular.module('AttractionsServiceDefinition', [])
    .service(AttractionsService.name, AttractionsService)
