
'use strict';

import template from './app-getstarted.template.html';
//SB: Importing the Servce for User
//import UserService from './../../services/user/user.service';
import './app-getstarted.style.css';

class AppGetstartedComponent {
    constructor(){
        this.controller = AppGetstartedComponentController;
        this.template = template;
    }

    static get name() {
        return 'appGetstarted';
    }
}

class AppGetstartedComponentController
{
    constructor($state){
        this.$state = $state;
        this.UserService = UserService;
    }

    login () {
      this.$state.go('login');
    };

    main () {
      this.$state.go('main');
    };

    static get $inject(){
        return ['$state'];
    }
}


export default AppGetstartedComponent;
