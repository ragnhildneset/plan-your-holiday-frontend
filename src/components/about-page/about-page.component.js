
'use strict';

import template from './about-page.template.html';


class AboutPageComponent {
    constructor(){
        this.controller = AboutPageComponentController;
        this.template = template;
    }

    static get name() {
        return 'aboutPage';
    }
}

class AboutPageComponentController{
    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }


}

export default AboutPageComponent;
