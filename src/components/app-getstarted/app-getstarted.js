'use strict';

import angular from 'angular';

import AppGetstartedComponent from './app-getstarted.component.js';


export default angular.module('appGetstarted', [])
    .component(AppGetstartedComponent.name, new AppGetstartedComponent);
