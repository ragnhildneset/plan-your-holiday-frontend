'use strict';

import template from './view-travel.template.html';
import TravelService from './../../services/travel/travel.service';
import UserService from './../../services/users/user.service';

class ViewTravelComponent {
    constructor(){
        this.controller = ViewTravelComponentController;
        this.template = template;
        this.bindings = {
            travel: '<',
        }
    }

    static get name() {
        return 'viewTravel';
    }
}

class ViewTravelComponentController{
    constructor($state,TravelService,UserService){
        this.$state = $state;
        this.TravelService = TravelService;
        this.UserService = UserService;

        console.log(this.travel);
    }

    static get $inject(){
        return ['$state', TravelService.name, UserService.name];
    }

    delete() {
        if (this.UserService.isAuthenticated()) {
            let _id = this.travel['_id'];

            this.TravelService.delete(_id).then(response => {
                this.$state.go('travel',{});
            });
        } else {
            this.$state.go('login',{});
        }
    };

    getPosterURL(){
        let posterURL = 'http://placehold.it/32x32';
        if (this.travel.hasOwnProperty('posters')) {
            if (this.travel.posters.hasOwnProperty('thumbnail')) {
                posterURL = this.travel.posters.thumbnail;
            } else if (this.travel.posters.hasOwnProperty('profile')) {
                posterURL = this.travel.posters.profile;
            } else if (this.travel.posters.hasOwnProperty('detailed')) {
                posterURL = this.travel.posters.detailed;
            } else {
                posterURL = this.travel.posters.original;
            }
        }
        return posterURL;
    }

    newtravel() {
      console.log(this.travel);
    }
}

export default ViewTravelComponent;
