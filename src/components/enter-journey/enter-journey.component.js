
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
      for(var i = 0; i < this.cities.length; i++) {
        if(this.cities[i]._id == this.journey.cityId) {
          this.journey.cityname = this.cities[i].name;
          console.log(this.journey.cityname);
        }
      }
        this.$window.localStorage['journey'] = JSON.stringify(this.journey);

        var _id = this.journey.cityId;
        this.$state.go('categories', { cityId:_id});

    };
}

export default EnterJourneyComponent;
