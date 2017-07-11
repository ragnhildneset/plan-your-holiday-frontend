
'use strict';

import template from './enter-journey.template.html';
import UserService from './../../services/users/user.service';


class EnterJourneyComponent {
    constructor(){
        this.controller = EnterJourneyComponentController;
        this.template = template;
        this.bindings = {
            cities: '<',
        }
    }

    static get name() {
        return 'enterJourney';
    }
}

class EnterJourneyComponentController{
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

    submit() {
        this.$window.localStorage['journey'] = JSON.stringify(this.journey);
        this.$state.go('categories');
    };
}

export default EnterJourneyComponent;
