'use strict';

import angular from 'angular';

import LoginPageComponent from './login-page.component.js';
import './login-page.style.css';


export default angular.module('loginPage', [])
    .component(LoginPageComponent.name, new LoginPageComponent);
