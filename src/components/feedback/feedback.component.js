
'use strict';

import template from './feedback.template.html';
import UserService from './../../services/users/user.service';


class FeedbackComponent {
    constructor(){
        this.controller = FeedbackComponentController;
        this.template = template;
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
