'use strict';

import angular from 'angular';

import AppGetstartedComponent from './app-getstarted.component.js';
import './app-getstarted.style.css';


export default angular.module('appGetstarted', [])
    .component(AppGetstartedComponent.name, new AppGetstartedComponent);
