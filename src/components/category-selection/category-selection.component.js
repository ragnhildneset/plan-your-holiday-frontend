
'use strict';

import template from './category-selection.template.html';


class CategorySelectionComponent {
    constructor(){
        this.controller = CategorySelectionComponentController;
        this.template = template;
    }

    static get name() {
        return 'categorySelection';
    }
}

class CategorySelectionComponentController{
    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }


}




export default CategorySelectionComponent;
