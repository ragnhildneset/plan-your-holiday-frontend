
'use strict';

import template from './login-page.template.html';
import './login-page.style.css';

class LoginPageComponent {
    constructor(){
        this.controller = LoginPageComponentController;
        this.template = template;
    }

    static get name() {
        return 'loginPage';
    }
}

class LoginPageComponentController{
    constructor($state){
        this.$state = $state;
    }

    getStarted () {
      this.$state.go('getstarted');
    };

    static get $inject(){
        return ['$state'];
    }
}


export default LoginPageComponent;
