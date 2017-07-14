
'use strict';

import template from './feedback.template.html';
import './feedback.style.css';
import UserService from './../../services/users/user.service';


class FeedbackComponent {
    constructor(){
        this.controller = FeedbackComponentController;
        this.template = template;
        this.bindings = {
            travel: '<',
        }
    }

    static get name() {
        return 'feedback';
    }
}

class FeedbackComponentController{
    constructor($state, $window, UserService)
    {
        this.UserService = UserService;
        this.journey = {};
        this.$state = $state;
        this.$window = $window;
    }

    static get $inject() {
        return ['$state', '$window', UserService.name];
    }
}

export default FeedbackComponent;
