
'use strict';

//SB: Importing User Service
import UserService from './../../services/users/user.service';
import template from './login-page.template.html';
import './login-page.style.css';


class LoginPageComponent {
    constructor()
    {
        
        //SB: This is what manages the logic
        this.controller = LoginPageComponentController;
        //SB: This is what manages the UI
        this.template = template;
    }

    static get name() {
        return 'loginPage';
    }
}

class LoginPageComponentController
{
    constructor($state,UserService)
    {
<<<<<<< HEAD
        this.$state = $state;

=======
        this.$state = $state;        
>>>>>>> 72897b7b04915db37c6c9cf5202ebae0dc5a033d
        this.UserService = UserService;

    }

    $onInit()
    {
        this.login = {};

    }

    //SB: This methode should evaluate the user in the DB
    submit()
    {

        //SB: The variables this.login.username are inicialized in the inputfield @ the .html file
        let user = this.login.username;
        let password = this.login.password;
        
        this.UserService.login(user,password).then(()=> {
            this.$state.go('home',{});
        });
    }

    getStarted () {
      this.$state.go('getstarted');
    };

    main () {
      this.$state.go('main');
    };

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default LoginPageComponent;
