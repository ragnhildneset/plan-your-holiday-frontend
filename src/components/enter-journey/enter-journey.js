'use strict';

import angular from 'angular';

import EnterJourneyComponent from './enter-journey.component';


export default angular.module('enterJourney', [])
    .component(EnterJourneyComponent.name, new EnterJourneyComponent);
