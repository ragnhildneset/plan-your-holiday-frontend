
'use strict';

import UserService from './../../services/users/user.service';

import template from './app-header.template.html';
import './app-header.style.css';

class AppHeaderComponent {
    constructor(){
        this.controller = AppHeaderComponentController;
        this.template = template;
    }

    static get name() {
        return 'appHeader';
    }
}

class AppHeaderComponentController{
    constructor($state, UserService){
        this.$state = $state;
        this.UserService = UserService;
    }

    home () {
      this.$state.go('home');
    };

    partners () {
      this.$state.go('partners');
    };

    about () {
      this.$state.go('about');
    };

    login () {
      this.$state.go('login');
    };

    editUser () {
      this.$state.go('edit-user');
    };

    // Development shortcut
    selectCategories () {
      this.$state.go('categories');
    };

    // Development for Travel
    showTravel () {
      this.$state.go('travel');
    };

    enterJourney () {
      this.$state.go('enter-journey');
    };

    isAuthenticated(){
      return this.UserService.isAuthenticated();
    }

    getCurrentUser(){
      let user = this.UserService.getCurrentUser();
      return user.username;
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}


export default AppHeaderComponent;
