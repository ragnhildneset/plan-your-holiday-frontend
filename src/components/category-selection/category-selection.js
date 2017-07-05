'use strict';

import angular from 'angular';

import CategorySelectionComponent from './category-selection.component.js';
import './category-selection.style.css';


export default angular.module('categorySelection', [])
    .component(CategorySelectionComponent.name, new CategorySelectionComponent);
