
'use strict';

import template from './app-getstarted.template.html';
import './app-getstarted.style.css';

class AppGetstartedComponent {
    constructor(){
        this.controller = AppGetstartedComponentController;
        this.template = template;
    }

    static get name() {
        return 'appGetstarted';
    }
}

class AppGetstartedComponentController{
    constructor($state){
        this.$state = $state;
    }

    static get $inject(){
        return ['$state'];
    }
}


export default AppGetstartedComponent;
