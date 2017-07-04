
'use strict';

import template from './entry-page.template.html';



class EntryPageComponent {
    constructor(){
        this.controller = EntryPageComponentController;
        this.template = template;
    }

    static get name() {
        return 'entryPage';
    }
}

class EntryPageComponentController{
    constructor($state){
        this.$state = $state;
    }

    getStarted () {
      this.$state.go('getstarted');
    };

    login () {
      this.$state.go('main');
    };

    static get $inject(){
        return ['$state'];
    }




}

export default EntryPageComponent;
