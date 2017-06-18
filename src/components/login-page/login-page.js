'use strict';

import angular from 'angular';

import LoginPageComponent from './login-page.component.js';


console.log('Entro en login-page');
export default angular.module('loginPage', [])
    .component(LoginPageComponent.name, new LoginPageComponent);
