'use strict';

import angular from 'angular';

import AppContentComponent from './app-content.component';


export default angular.module('AppView', [
    ])
    .component(AppContentComponent.name, new AppContentComponent);
