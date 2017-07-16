'use strict';

import angular from 'angular';

import FeedbackComponent from './feedback.component';

export default angular.module('feedback', [])
    .component(FeedbackComponent.name, new FeedbackComponent);
