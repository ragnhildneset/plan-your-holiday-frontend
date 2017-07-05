
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

    constructor($state){
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

    static get $inject(){
        return ['$state', AttractionsService.name];
    }
}




export default CategorySelectionComponent;
