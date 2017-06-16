'use strict';

import angular from 'angular';

import AppGetstartedComponent from './app-getstarted.component.js';


export default angular.module('AppGetstarted', [])
    .component(AppGetstartedComponent.name, new AppGetstartedComponent);
