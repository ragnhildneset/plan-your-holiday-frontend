
'use strict';

import UserService from './../../services/users/user.service';
import template from './entry-page.template.html';
import './entry-page.style.css';



class EntryPageComponent {
    constructor(){
        this.controller = EntryPageComponentController;
        this.template = template;
    }

    static get name() {
        return 'entryPage';
    }
}

class EntryPageComponentController{
    constructor($state,UserService) {
        this.$state = $state;
        this.UserService = UserService;
    }

    $onInit() {
        this.login = {};
    }

    submit() {
        let loginid = this.login.loginid;
        let password = this.login.password;

        this.UserService.login(loginid,password).then(()=> {
            this.$state.go('enter-journey',{});
        });
    }

    getStarted () {
      this.$state.go('getstarted');
    };

    login () {
      this.$state.go('enter-journey');
    };

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default EntryPageComponent;
