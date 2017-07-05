
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

class CategorySelectionComponentController{
    constructor($state){
        this.$state = $state;
        this.AttractionsService = AttractionsService;
    }

    static get $inject(){
        return ['$state', AttractionsService.name];
    }


}




export default CategorySelectionComponent;
