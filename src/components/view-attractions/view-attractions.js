'use strict';

import angular from 'angular';

import ViewAttractionsComponent from './view-attractions.component';


export default angular.module('viewAttractions', [])
    .component(ViewAttractionsComponent.name, new ViewAttractionsComponent);
