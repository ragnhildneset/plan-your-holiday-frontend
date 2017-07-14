
'use strict';

import template from './edit-user.template.html';
import UserService from './../../services/users/user.service';


class EditUserComponent {
    constructor(){
        this.controller = EditUserComponentController;
        this.template = template;
    }

    static get name() {
        return 'editUser';
    }
}

class EditUserComponentController{
    constructor($state, UserService){
        this.$state = $state;
        this.UserService = UserService;

        this.username = this.UserService.getCurrentUser().username;
        console.log(this.username);
    }

    static get $inject(){
        return ['$state', UserService.name];
    }
}

export default EditUserComponent;
