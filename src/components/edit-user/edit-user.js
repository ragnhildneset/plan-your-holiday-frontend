'use strict';

import angular from 'angular';

import EditUserComponent from './edit-user.component';
import './edit-user.style.css';


export default angular.module('editUser', [])
    .component(EditUserComponent.name, new EditUserComponent);
