export default class PublicationContentCardDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      template: '' +
        '<div class="publication-display-card" ng-class="{\'fullscreen\': vm.fullscreenCard}">' +
        '<div class="publication-display-card-header">' +
        '<div layout>' +
        '<md-button aria-label="{{\'ACTION.CLOSE\'| translate}}" class="generic-hit-area-button margin-left-4" ng-click="vm.closeCard(card)"><md-icon md-font-icon="icon-cancel"></md-icon></md-button>' +
        '<md-button aria-label="{{\'ACTION.TOGGLE_FULLSCREEN\'| translate}}" class="generic-hit-area-button margin-right-4" ng-click="vm.toggleFullscreenCard()">' +
        '<md-icon md-font-icon="icon-fullscreen" ng-if="!vm.fullscreenCard"></md-icon>' +
        '<md-icon md-font-icon="icon-fullscreen-exit" ng-if="vm.fullscreenCard"></md-icon>' +
        '</md-button>' +
        '<div class="publication-display-card-header-divider"></div>' +
        '<p class="card-title margin-0 truncate" flex>{{card.classification}} :: {{card.description}}</p>' +
        '</div>' +
        '</div>' +
        '<div class="publication-display-card__content">' +
        '<img ng-src="{{card.content.img}}"/>' +
        '<p class="publication-display-card__title">{{card.content.title}}</p>' +
        '<p>' +
        '<strong>{{card.content.chapter}}</strong>' +
        '<div>{{card.content.intro}}</div>' +
        '</p>' +
        '<div ng-repeat="paragraph in card.content.paragraphs track by $index" class="paragraphs">' +
        '<be-text ng-if="vm.isTextPreview(paragraph)" value="paragraph.displayValue"></be-text>' +
        '<be-image ng-if="vm.isImagePreview(paragraph)" value="paragraph.displayValue"></be-image>' +
        '<be-rating ng-if="vm.isRatingPreview(paragraph)" value="paragraph.displayValue" ></be-rating>' +
        '<be-markdown ng-if="vm.isMarkdownPreview(paragraph)" value="paragraph.displayValue"></be-markdown>' +
        '<be-youtube ng-if="vm.isYoutubePreview(paragraph)" value="paragraph.displayValue"></be-youtube>' +
        '<be-link ng-if="vm.isLinkPreview(paragraph)" value="paragraph.displayValue"></be-link>' +
        '<be-document ng-if="vm.isDocumentPreview(paragraph)" value="paragraph.displayValue" display-image="vm.displayPDFImage"></be-document>' +
        '</div>' +
        '</div>' +
        '<div class="publication-display-card-footer" layout>' +
        '</div>' +
        '</div>',
      controller: 'BePublicationCardController',
      controllerAs: 'vm',
      scope: {
        card: '=',
        attributes: '='
      }
    };
  }
}
