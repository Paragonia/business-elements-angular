export default class PublicationArticleCardDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      template: '' +
        '<div class="generic-display-card">' +
          '<div class="generic-display-card_header">' +
            '<div layout>' +
              '<md-button aria-label="{{\'ACTION.CLOSE\'| translate}}" class="generic-hit-area-button generic-hit-area-button__40 margin-left-4"' +
                'ng-click="vm.onCloseCard(card)" ng-show="vm.showCloseCardButton">' +
                '<md-icon md-font-icon="icon-cancel"></md-icon>' +
              '</md-button>' +
              '<md-button aria-label="{{\'ACTION.TOGGLE_FULLSCREEN\'| translate}}" class="generic-hit-area-button generic-hit-area-button__40 margin-right-4"' +
                'ng-click="vm.onFullScreenCard(card)" ng-show="vm.showFullScreenButton">' +
                '<md-icon md-font-icon="icon-fullscreen" ng-if="!vm.showExitFullScreenButton"></md-icon>' +
                '<md-icon md-font-icon="icon-fullscreen-exit" ng-if="vm.showExitFullScreenButton"></md-icon>' +
              '</md-button>' +
              '<div class="generic-display-card_vertical-divider"></div>' +
              '<p class="generic-display-card_header-title margin-0 truncate" flex ng-bind="card.content.title"></p>' +
            '</div>' +
          '</div>' +
          '<div class="generic-display-card_content">' +
            '<div class="article-card_content-header"' +
              'ng-style="{\'background-image\': \'url(\' + card.content.img + \')\'}">' +
              '<div class="article-card_content-header-info">' +
                '<div class="article-card_content-header-title" ng-bind-html="vm.getMarkedHtml(card.content.title)"></div>' +
                '<div class="article-card_content-header-intro" ng-bind-html="vm.getMarkedHtml(card.content.intro)"></div>' +
              '</div>' +
            '</div>' +
            '<div class="article-card_content-container" ng-class="{\'no-action-call\': !vm.hasNugget}">' +
              '<div ng-repeat="(index, paragraph) in card.content.paragraphs">' +
                '<div ng-if="vm.containsParagraphText(paragraph)">' +
                  '<div class="article-card_content-details" be-compile="vm.getTextHtml(paragraph)"></div>' +
                '</div>' +
                '<div ng-if="vm.containsParagraphImage(paragraph)">' +
                  '<div class="article-card_content-details" ng-bind-html="vm.getImgHtml(paragraph)"></div>' +
                '</div>' +
                '<div ng-if="vm.containsNugget(paragraph)">' +
                  '<div class="article-card_content-action" ng-bind-html="vm.getNuggetHtml(paragraph)"></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="generic-display-card_footer" layout>' +
            '<md-button aria-label="Share" class="generic-full-area-button generic-full-area-button__48" ng-class="vm.showShareLinkHolder ? \'active\' : \'\'" ng-click="vm.onShare(card)" ng-show="vm.showSocialShareButton"><md-icon md-font-icon="icon-share"></md-icon></md-button>' +
            '<div class="generic-display-card_share" ng-if="vm.showShareLinkHolder">' +
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
              'touch-visible="vm.showRequestTouchHolder && vm.showRequestTouchButton">' +
            '</em-touch-card>' +
          '</div>' +
        '</div>',
      controller: 'BePublicationCardController',
      controllerAs: 'vm',
      scope: {
        card: '=',
        showSocialShareButton: '=?',
        showCloseCardButton: '=?',
        showFullScreenButton: '=?',
        showExitFullScreenButton: '=?',
        onNavigationLinkClick: '&',
        onCloseCardClick: '&',
        onFullScreenCardClick: '&',
        onDocumentLinkClick: '&',
        onPatternLinkClick: '&'
      }
    };
  }
}
