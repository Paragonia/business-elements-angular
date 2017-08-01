export default class PublicationPreviewCardDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      template: '' +
        '<div class="publication-card">' +
        '<div class="publication-card__content">' +
        '<img ng-src="{{card.content.img}}" ng-if="card.content.img"/>' +
        '<div class="landing-heading-story" ng-bind-html="vm.getFirstTitle(card) | limitTo: 20"></div>' +
        '<div class="landing-heading-title" ng-bind-html="vm.getFirstDescription(card) | limitTo: 100"></div>' +
        '</div>' +
        '<p class="publication-card__title">{{card.content.title}}</p>' +
        '</div>' +
        '</div>',
      controller: 'BePublicationCardController',
      controllerAs: 'vm',
      scope: {
        card: '='
      }
    };
  }
}
