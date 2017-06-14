
'use strict';

import template from './enter-journey.template.html';


class EnterJourneyComponent {
    constructor(){
        this.controller = EnterJourneyComponentController;
        this.template = template;
    }

    static get name() {
        return 'enterJourney';
    }
}

class EnterJourneyComponentController{
    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }

}

export default EnterJourneyComponent;
