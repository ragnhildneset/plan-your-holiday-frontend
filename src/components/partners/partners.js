'use strict';

import angular from 'angular';

import PartnersComponent from './partners.component';
import './partners.style.css';


export default angular.module('partners', [])
    .component(PartnersComponent.name, new PartnersComponent);
