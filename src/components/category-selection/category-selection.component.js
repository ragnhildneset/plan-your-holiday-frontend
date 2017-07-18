
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

        // asynchronous setup
        this.density = 3; // mocked value
        if(this.UserService.isAuthenticated()) {
          this.UserService.getPreferences(this.UserService.getCurrentUser().loginid).then(data => {
            this.density = data.density;
          })
        }
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

      var arrival = new Date(JSON.parse(this.$window.localStorage['journey']).arrival);
      var departure = new Date(JSON.parse(this.$window.localStorage['journey']).departure);

      var timeDiff = Math.abs(arrival.getTime() - departure.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      this.duration = 4;
      if(diffDays > 2) {
        this.duration = diffDays-2;
      }
      else {
        var username = this.UserService.getCurrentUser().loginid;

        var travel = {
            'username': username,
            'destination': JSON.parse(this.$window.localStorage['journey']).cityId,
            'arrival': arrival,
            'departure': departure
          };

        this.TravelService.create(travel).then(data => {
          this.$state.go('travel', { travelID: data });
        });
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
      this.pool = this.attractions.slice();
      this.removeAlreadySelected();
      this.selection = this.monuments.concat(this.museums).concat(this.parks).concat(this.churches);
      this.printWeights();

      // adding the best attractions of each category to the fields until they required amount is reached
      while(this.getNumberOf("Monuments")<this.attractionWeight[0] && this.selection.length<(this.duration*this.density)) {
        this.selection.push(this.pool[this.getBestOfCategory("Monuments")]);
        this.pool.splice(this.getBestOfCategory("Monuments"), 1);
      }
      while(this.getNumberOf("Museums")<this.attractionWeight[1] && this.selection.length<(this.duration*this.density)) {
        this.selection.push(this.pool[this.getBestOfCategory("Museums")]);
        this.pool.splice(this.getBestOfCategory("Museums"), 1);
      }
      while(this.getNumberOf("Parks")<this.attractionWeight[2] && this.selection.length<(this.duration*this.density)) {
        this.selection.push(this.pool[this.getBestOfCategory("Parks")]);
        this.pool.splice(this.getBestOfCategory("Parks"), 1);
      }
      while(this.getNumberOf("Churches")<this.attractionWeight[3] && this.selection.length<(this.duration*this.density)) {
        this.selection.push(this.pool[this.getBestOfCategory("Churches")]);
        this.pool.splice(this.getBestOfCategory("Churches"), 1);
      }
      this.shuffleSelection(this.selection.length);

      // create a travel-object
      var schedule = [];
      var current = 0;
      //console.log("calculating for " + this.duration + " days and density " + this.density);
      // calculate the schedule
      for(var i = 0; i < this.duration; i++) {
        var last = null;
        for(var j = 0; j < this.density; j++) {
          var start = 0;
          if(last == null) {
            start = new Date(arrival);
            start.setDate(arrival.getDate() + parseInt(i) + 1);
            start.setHours(10);
          }
          else {
            start = new Date(last);
            start.setHours(start.getHours() + 1);
          }
          var end = new Date(start);
          end.setMinutes(end.getMinutes() + this.selection[current].duration);

          this.start = "" + start.getFullYear() + "-" + (start.getMonth()+1) + "-" + start.getDate() + " " + start.getHours() + ":";
          if(start.getMinutes()<10) {
            this.start = this.start + "0";
          }
          this.start = this.start + start.getMinutes();
          this.end = "" + end.getFullYear() + "-" + (end.getMonth()+1) + "-" + end.getDate() + " " + end.getHours() + ":";
          if(end.getMinutes()<10) {
            this.end = this.end + "0";
          }
          this.end = this.end + end.getMinutes();


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
        username = this.UserService.getCurrentUser().loginid;
      }

      console.log("cityID: " + JSON.parse(this.$window.localStorage['journey']).cityId);
      var travel = {
          'username': username,
          'destination': JSON.parse(this.$window.localStorage['journey']).cityname,
          'arrival': arrival,
          'departure': departure,
          'schedule': schedule
        };

      this.TravelService.create(travel).then(data => {
        this.$state.go('travel', { travelID: data });
      });
    }

    removeAlreadySelected() {
      var all = this.monuments.concat(this.museums).concat(this.parks).concat(this.churches);
      for(var i = 0; i < all.length; i++) {
        for(var j = 0; j < this.pool.length; j++) {
          if(all[i]._id == this.pool[j]._id) {
            this.pool.splice(j, 1);
          }
        }
      }
    }

    getBestOfCategory(category) {
      for(var i = 0; i < this.pool.length; i++) {
        if(this.pool[i].category == category) {
          return i;
        }
      }
      return -1;
    }

    shuffleSelection(n) {
      if(this.selection.length > 1) {
        for(var i = 0; i < n; i++){
          var x = Math.floor((Math.random() * this.selection.length));
          var y = 0;
          do {
            y = Math.floor((Math.random() * this.selection.length));
          }
          while(x == y)

          var s = this.selection[x];
          this.selection[x] = this.selection[y];
          this.selection[y] = s;
        }
      }
    }

    getNumberOf(category) {
      if(this.selection == null) {
        return 0;
      }
      if(this.selection.length == 0) {
        return 0;
      }
      var n = 0;
      for(var i = 0; i < this.selection.length; i++){
        if(this.selection[i].category == category) {
          n = n + 1;
        }
      }
      return n;
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
