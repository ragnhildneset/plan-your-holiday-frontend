
'use strict';

import template from './feedback.template.html';
import './feedback.style.css';
import UserService from './../../services/users/user.service';
import AttractionsService from './../../services/attractions/attractions.service';


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
    constructor($state, $window, UserService, AttractionsService)
    {
        this.UserService = UserService
        this.AttractionsService = AttractionsService
        this.journey = {};
        this.$state = $state;
        this.$window = $window;
    }

    static get $inject() {
        return ['$state', '$window', UserService.name, AttractionsService.name];
    }

    rate() {
      var ratings = [];
      var schedule = this.travel.schedule;
      for (var i = 0; i < schedule.length; i++) {
        var attraction = {};
        var id = schedule[i].attractionId;
        attraction.attractionId = id;
        attraction.quality = this.rating[id].quality;
        attraction.popularity = this.rating[id].popularity;

        ratings.push(attraction);
      }
      this.AttractionsService.rate(ratings).then(()=> {
          this.$state.go('home');
        })
    }
}

export default FeedbackComponent;
