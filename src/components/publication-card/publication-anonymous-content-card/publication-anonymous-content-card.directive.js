export default class PublicationAnonymousContentCardDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      template: '' +
        '<div class="publication-display-card" ng-class="{\'fullscreen\': vm.fullscreenCard}">' +
        '<div class="publication-display-card-header">' +
        '<div layout>' +
        '<md-button aria-label="{{\'ACTION.CLOSE\'| translate}}" class="generic-hit-area-button margin-left-4"' +
        'ng-click="vm.onCloseCard(card)" ng-show="vm.showCloseCardButton">' +
        '<md-icon md-font-icon="icon-cancel"></md-icon>' +
        '</md-button>' +
        '<md-button aria-label="{{\'ACTION.TOGGLE_FULLSCREEN\'| translate}}" class="generic-hit-area-button margin-right-4"' +
        'ng-click="vm.toggleFullscreenCard()" ng-show="vm.showFullScreenButton">' +
        '<md-icon md-font-icon="icon-fullscreen" ng-if="!vm.fullscreenCard"></md-icon>' +
        '<md-icon md-font-icon="icon-fullscreen-exit" ng-if="vm.fullscreenCard"></md-icon>' +
        '</md-button>' +
        '<div class="publication-display-card-header-divider"></div>' +
        '<p class="card-title margin-0 truncate" flex ng-bind="card.content.title"></p>' +
        '</div>' +
        '</div>' +
        '<div class="content-card-content" layout>' +
        '<div class="card-inner-content">' +
        '<div class="article-heading"' +
        'ng-style="{\'background-image\': \'url(\' + card.content.img + \')\'}">' +
        '<div class="article-heading-content">' +
        '<div class="article-heading-name" ng-bind-html="vm.getMarkedHtml(card.content.title)"></div>' +
        '<div class="article-heading-story" ng-bind-html="vm.getMarkedHtml(card.content.intro)"></div>' +
        '<div class="article-heading-title" ng-bind-html="vm.getMarkedHtml(card.content.chapter)"></div>' +
        '</div>' +
        '</div>' +
        '<div ng-repeat="(index, paragraph) in card.content.paragraphs">' +
        '<div ng-if="vm.containsParagraphText(paragraph)">' +
        '<div class="article-paragraph-content" ng-bind-html="vm.getTextHtml(paragraph)"></div>' +
        '</div>' +
        '<div ng-if="vm.containsParagraphImage(paragraph)">' +
        '<div class="article-paragraph-content" ng-bind-html="vm.getImgHtml(paragraph)"></div>' +
        '</div>' +
        '<div ng-if="vm.containsNugget(paragraph)">' +
        '<div class="article-paragraph-nugget" ng-bind-html="vm.getNuggetHtml(paragraph)"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="content-card-footer" layout ng-show="vm.showFooter">' +
        '<md-button aria-label="Share" class="toolbar-icon disabled" ng-class="vm.showShareLinkHolder ? \'active\' : \'\'" ng-click="vm.onShare(card)"><md-icon md-font-icon="icon-share"></md-icon></md-button>' +
        '<div class="share-link-holder" ng-if="vm.showShareLinkHolder">' +
        '<md-input-container class="md-block">' +
        '<label translate>Link</label>' +
        '<input ng-model="vm.sharableLink" disabled>' +
        '</md-input-container>' +
        '<md-button class="md-primary md-raised full-width margin-0"' +
        'ng-if="!vm.linkCopied"' +
        'clipboard supported="supported"' +
        'text="vm.sharableLink"' +
        'on-copied="vm.copySuccess()"' +
        'aria-label="Copy Link">Copy Link' +
        '</md-button>' +
        '<md-button class="md-black-and-white md-raised full-width margin-0"' +
        'ng-if="vm.linkCopied"' +
        'aria-label="Link Copied">Link Copied' +
        '</md-button>' +
        '</div>' +
        '<em-touch-card show-close="false"' +
        'card="card"' +
        'touch-visible="vm.showRequestTouchHolder && vm.showRequestTouchButton"></em-touch-card>' +
        '</div>' +
        '</div>',
      controller: 'BePublicationCardController',
      controllerAs: 'vm',
      scope: {
        card: '=',
        attributes: '=',
        showFooter: '=?',
        showCloseCardButton: '=?',
        showFullScreenButton: '=?',
        onNavigationLinkClick: '&',
        onCloseCardClick: '&'
      }
    };
  }
}
