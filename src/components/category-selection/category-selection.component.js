
'use strict';

import template from './category-selection.template.html';
import AttractionsService from './../../services/attractions/attractions.service';
import UserService from './../../services/users/user.service';
import TravelService from './../../services/travel/travel.service';


class CategorySelectionComponent {
    constructor(){
        this.controller = CategorySelectionComponentController;
        this.template = template;
        this.bindings = {
            attractions: '<',
        }
    }

    static get name() {
        return 'categorySelection';
    }
}

class CategorySelectionComponentController {

    constructor($state, $window, AttractionsService, UserService, TravelService){
        this.$state = $state;
        this.$window = $window;
        this.AttractionsService = AttractionsService;
        this.UserService = UserService;
        this.TravelService = TravelService;
        this.mustsees = [];
    }

    // simulates a click on a certain box and adds/removes it to/from the list of selected Must-Sees
    click(index) {
      if(this.isContained(index) == -1) {
        this.mustsees[this.mustsees.length] = index;
      }
      else {
        this.mustsees.splice(this.isContained(index), 1);
      }
      //console.log(this.selection.toString());
    }

    // calculates whether a given index is already contained in the field selection
    isContained(index) {
      for(var i = 0; i < this.mustsees.length; i++) {
        if(this.mustsees[i] == index) {
          return i;
        }
      }
      return -1;
    }

    calculate() {
      // Set up required data
      this.density = 3; // mocked value
      if(this.UserService.isAuthenticated()) {
        console.log("User " + this.UserService.getCurrentUser().username + " is currently logged in");
        this.density = this.UserService.getCurrentUser().density;
      }

      var arrival = new Date(JSON.parse(this.$window.localStorage['journey']).arrival);
      var departure = new Date(JSON.parse(this.$window.localStorage['journey']).departure);

      var timeDiff = Math.abs(arrival.getTime() - departure.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      this.duration = 4;
      if(diffDays > 0) {
        this.duration = diffDays;
      }

      var requiredAttractions = this.duration * this.density;

      this.sliderSelection = [$('#Monuments').val(), $('#Museums').val(), $('#Parks').val(), $('#Churches').val()];
      var sum = 0;
      for(var i = 0; i < this.sliderSelection.length; i++) {
        sum = sum + parseInt(this.sliderSelection[i]);
      }
      if(sum == 0) {
        this.sliderSelection = [1, 1, 1, 1];
        sum = 4;
      }

      this.attractionWeight = [
        Math.round(this.density * this.duration * (parseInt(this.sliderSelection[0])/sum)), // Monuments
        Math.round(this.density * this.duration * (parseInt(this.sliderSelection[1])/sum)), // Museums
        Math.round(this.density * this.duration * (parseInt(this.sliderSelection[2])/sum)), // Parks
        Math.round(this.density * this.duration * (parseInt(this.sliderSelection[3])/sum))  // Churches
      ];

      while((this.attractionWeight[0] + this.attractionWeight[1] + this.attractionWeight[2] + this.attractionWeight[3]) < requiredAttractions) {
        switch(Math.floor((Math.random() * 4))) {
          case 0: this.attractionWeight[0] = this.attractionWeight[0] + 1; break;
          case 1: this.attractionWeight[1] = this.attractionWeight[1] + 1; break;
          case 2: this.attractionWeight[2] = this.attractionWeight[2] + 1; break;
          case 3: this.attractionWeight[3] = this.attractionWeight[3] + 1; break;
          default: this.attractionWeight[0] = this.attractionWeight[0] + 1; break;
        }
      }

      // Within these arrays all the relevant attractions for the schedule are stored
      this.monuments = [];
      this.museums = [];
      this.parks = [];
      this.churches = [];

      // add all selected must-sees to the arrays
      for(var i = 0; i < this.mustsees.length; i++) {
        for(var j = 0; j < this.attractions.length; j++) {
          if(this.mustsees[i] == this.attractions[j]._id) {
            switch(this.attractions[j].category) {
              case "Monuments": this.monuments.push(this.attractions[j]); break;
              case "Museums": this.museums.push(this.attractions[j]); break;
              case "Parks": this.parks.push(this.attractions[j]); break;
              case "Churches": this.churches.push(this.attractions[j]); break;
              default: console.log("Undefined category"); break;
            }
          }
        }
      }
      // the pool is a copy of the attractions with the already selected must-sees removed
      this.pool = this.attractions.slice(0);
      this.removeAlreadySelected();

      // adding the best attractions of each category to the fields until they required amount is reached
      while(this.monuments.length < this.attractionWeight[0]) {
        this.monuments.push(this.pool[this.getBestOfCategory("Monuments")]);
        this.pool.splice(this.getBestOfCategory("Monuments"), 1);
      }
      while(this.museums.length < this.attractionWeight[1]) {
        this.museums.push(this.pool[this.getBestOfCategory("Museums")]);
        this.pool.splice(this.getBestOfCategory("Museums"), 1);
      }
      while(this.parks.length < this.attractionWeight[2]) {
        this.parks.push(this.pool[this.getBestOfCategory("Parks")]);
        this.pool.splice(this.getBestOfCategory("Parks"), 1);
      }
      while(this.churches.length < this.attractionWeight[3]) {
        this.churches.push(this.pool[this.getBestOfCategory("Churches")]);
        this.pool.splice(this.getBestOfCategory("Churches"), 1);
      }

      // The Selection is the full set of selected attractions for the schedule
      this.selection = this.monuments.concat(this.museums).concat(this.parks).concat(this.churches);

      // create a travel-object
      var schedule = [];
      var current = 0;
      // calculate the schedule
      for(var i = 0; i < this.duration; i++) {
        var last = null;
        for(var j = 0; j < this.density; j++) {
          var start = 0;
          if(last == null) {
            start = new Date(arrival);
            start.setDate(arrival.getDate() + parseInt(i));
          }
          else {
            start = new Date(last);
            start.setHours(start.getHours() + 1);
          }
          var end = new Date(start);
          end.setMinutes(end.getMinutes() + this.selection[current].duration);

          this.start = "" + start.getFullYear() + "." + start.getMonth() + "." + start.getDay() + " " + start.getHours() + ":" + start.getMinutes();
          this.end = "" + end.getFullYear() + "." + end.getMonth() + "." + end.getDay() + " " + end.getHours() + ":" + end.getMinutes();

          var activity = {'attractionID': this.selection[current]._id,
              'url':this.selection[current].url,
              'attractionname': this.selection[current].title,
              'startTime': this.start,
              'endTime': this.end};
          last = end;
          schedule[i*this.density + j] = activity;
          current = current + 1;
        }
      }

      var username = "johndoe" + Math.random();
      if(this.UserService.isAuthenticated()) {
        username = this.UserService.getCurrentUser().username;
      }

      var travel = {
          'username': username,
          'arrival': arrival,
          'departure': departure,
          'schedule': schedule
        };

      // very dirty workaround!
      // TODO fix this
      this.TravelService.create(travel).then(data => {
        this.TravelService.getbyUser(username).then(data => {
          console.log(data._id);
          this.$state.go('travel',{ travelID: data._id});
        });
      });
    }

    removeAlreadySelected() {
      var all = this.monuments.concat(this.museums).concat(this.parks).concat(this.churches);
      for(var i = 0; i < all.length; i++) {
        this.pool.splice(this.indexOfDuplicate(all[i]), 1);
      }
    }

    indexOfDuplicate(index) {
      for(var i = 0; i < this.mustsees.length; i++) {
        if(this.mustsees[i] == index) {
          return i;
        }
      }
      return -1;
    }

    getBestOfCategory(category) {
      for(var i = 0; i < this.pool.length; i++) {
        if(this.pool[i].category == category) {
          return i;
        }
      }
      return -1;
    }

    printPool() {
      console.log("Current Pool:");
      for(var i = 0; i < this.pool.length; i++) {
        console.log("(" + (i+1) + ") " + this.pool[i].title);
      }
    }

    printAttractions() {
      console.log("Current Attractions:");
      for(var i = 0; i < this.attractions.length; i++) {
        console.log("(" + (i+1) + ") " + this.attractions[i].title);
      }
    }

    printSelection() {
      console.log("Current Selection:");
      for(var i = 0; i < this.selection.length; i++) {
        console.log("(" + (i+1) + ") " + this.selection[i].title);
      }
    }

    printWeights() {
      console.log('Attractions in ' + this.duration + ' days (density: ' + this.density + '):');
      console.log(' ' + this.attractionWeight[0] + ' Monuments');
      console.log(' ' + this.attractionWeight[1] + ' Museums');
      console.log(' ' + this.attractionWeight[2] + ' Parks');
      console.log(' ' + this.attractionWeight[3] + ' Churches');
    }

    printSelectedMustSees() {
      console.log("Currently selected attractions");
      for(var i = 0; i < this.monuments.length; i++){
        console.log(' ' + (i+1) + '. Monument: ' + this.monuments[i].title);
      }
      for(var i = 0; i < this.museums.length; i++){
        console.log(' ' + (i+1) + '. Museum: ' + this.museums[i].title);
      }
      for(var i = 0; i < this.parks.length; i++){
        console.log(' ' + (i+1) + ' Park: ' + this.parks[i].title);
      }
      for(var i = 0; i < this.churches.length; i++){
        console.log(' ' + (i+1) + ' Church: ' + this.churches[i].title);
      }
    }

    static get $inject(){
        return ['$state', '$window', AttractionsService.name, UserService.name, TravelService.name];
    }
}




export default CategorySelectionComponent;
