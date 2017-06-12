
'use strict';

import template from './view-attractions.template.html';
import AttractionsService from './../../services/attractions/attractions.service';


class ViewAttractionsComponent {
    constructor(){
        this.controller = ViewAttractionsComponentController;
        this.template = template;
        this.bindings = {
            attractions: '<',
        }
    }

    static get name() {
        return 'viewAttractions';
    }
}

class ViewAttractionsComponentController{
    constructor($state,AttractionsService){
        this.$state = $state;
        this.AttractionsService = AttractionsService;
        console.log("hi", attractions);

    }

    static get $inject(){
        return ['$state', AttractionsService.name];
    }

}


export default ViewAttractionsComponent;
