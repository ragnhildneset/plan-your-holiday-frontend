
'use strict';

import template from './app-footer.template.html';
import './app-footer.style.css';

class AppFooterComponent {
    constructor(){
        this.controller = AppFooterComponentController;
        this.template = template;

    }

    static get name() {
        return 'appFooter';
    }


}

class AppFooterComponentController{
    constructor(){
      
    }

}


export default AppFooterComponent;
