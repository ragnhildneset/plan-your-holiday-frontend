
'use strict';

import template from './entry-page.template.html';



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
        let user = this.login.username;
        let password = this.login.password;

        this.UserService.login(user,password).then(()=> {
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
