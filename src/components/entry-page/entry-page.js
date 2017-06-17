'use strict';

import angular from 'angular';

import EntryPageComponent from './entry-page.component';
import './entry-page.style.css';


export default angular.module('entryPage', [])
    .component(EntryPageComponent.name, new EntryPageComponent);
