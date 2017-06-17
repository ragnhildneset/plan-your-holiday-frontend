
'use strict';

import template from './partners.template.html';


class PartnersComponent {
    constructor(){
        this.controller = PartnersComponentController;
        this.template = template;
    }

    static get name() {
        return 'partners';
    }
}

class PartnersComponentController{
    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }


}

export default PartnersComponent;
