
'use strict';

import template from './main.template.html';


class MainComponent {
    constructor(){
        this.controller = MainComponentController;
        this.template = template;
    }

    static get name() {
        return 'main';
    }
}

class MainComponentController{
    constructor($state){
        this.$state = $state;
    }

    selectCategories () {
      this.$state.go('categories');
    };

    static get $inject(){
        return ['$state'];
    }


}

export default MainComponent;
