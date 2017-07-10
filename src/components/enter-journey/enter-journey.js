'use strict';

import angular from 'angular';

import EnterJourneyComponent from './enter-journey.component';

import './enter-journey.style.css';

export default angular.module('enterJourney', [])
    .component(EnterJourneyComponent.name, new EnterJourneyComponent);
