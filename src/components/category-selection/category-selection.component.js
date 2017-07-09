
'use strict';

import template from './category-selection.template.html';
import AttractionsService from './../../services/attractions/attractions.service';


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

    constructor($state, AttractionsService){
        this.$state = $state;
        this.AttractionsService = AttractionsService;
        this.selection = [];
    }

    // simulates a click on a certain box and adds/removes it to/from the list of selected Must-Sees
    click(index) {
      //console.log('Clicked ' + index);

      if(this.isContained(index) == -1) {
        this.selection[this.selection.length] = index;
      }
      else {
        this.selection.splice(this.isContained(index), 1);
      }


      //console.log(this.selection.toString());
    }

    // calculates whether a given index is already contained in the field selection
    isContained(index) {
      for(var i = 0; i < this.selection.length; i++) {
        if(this.selection[i] == index) {
          return i;
        }
      }
      return -1;
    }

    calculate() {
      console.log('start calculating schedule');

      // Set up required data
      // TODO replace hardcoded value with value from the user
      this.density = 3;
      // TODO replace hardcoded value with value from the travel selection
      this.duration = 5;
      // TODO replace hardcoded values with values from the sliders
      this.attractionWeight = [
        Math.round(this.density * this.duration * 0.3), // Monuments
        Math.round(this.density * this.duration * 0.2), // Museums
        Math.round(this.density * this.duration * 0.4), // Parks
        Math.round(this.density * this.duration * 0.1)  // Churches
      ];

      console.log('Attractions in ' + this.duration + ' days (density: ' + this.density + '):');
      console.log(' ' + this.attractionWeight[0] + ' Monuments');
      console.log(' ' + this.attractionWeight[1] + ' Museums');
      console.log(' ' + this.attractionWeight[2] + ' Parks');
      console.log(' ' + this.attractionWeight[3] + ' Churches');

      var data = '';

      console.log("Attractions:");
      for(var i = 0; i < this.attractions.length; i++)
      {
        console.log(' (' + (i+1) + ') ' + this.attractions[i].title);
      }

      this.AttractionsService.getTop(this.attractionWeight[0], 'Monuments').then(this.calculateWith(data));
    }

    calculateWith(data) {
      console.log(data);
    }

    static get $inject(){
        return ['$state', AttractionsService.name];
    }
}




export default CategorySelectionComponent;
