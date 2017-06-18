'use strict';

import angular from 'angular';

import MainComponent from './main.component';
import './main.style.css';


export default angular.module('main', [])
    .component(MainComponent.name, new MainComponent);
