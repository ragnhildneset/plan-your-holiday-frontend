
'use strict';

import UserService from './../../services/users/user.service';
import template from './app-getstarted.template.html';
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
    constructor($state, UserService)
    {
        this.$state = $state;
        this.UserService = UserService;
    }

    signup()
    {

        //SB: The variables this.login.username are inicialized in the inputfield @ the .html file
        let username = this.signup.username;
        let email = this.signup.email;
        let loginid = this.signup.loginid;
        let password = this.signup.password;
        let birthdate = this.signup.birthdate;
        let density = this.signup.density;

        this.UserService.register(username, email, loginid, password, birthdate, density).then(()=> {
            this.$state.go('enter-journey',{});
        });
    }

    login () {
      this.$state.go('login');
    };

    enterJourney () {
      this.$state.go('enter-journey');
    };

    static get $inject(){
        return ['$state',UserService.name];
    }
}


export default AppGetstartedComponent;
