'use strict';

import angular from 'angular';

import AboutPageComponent from './about-page.component';
import './about-page.style.css';


export default angular.module('aboutPage', [])
    .component(AboutPageComponent.name, new AboutPageComponent);
