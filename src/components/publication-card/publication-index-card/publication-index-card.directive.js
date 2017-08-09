export default class PublicationIndexCardDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      template: '' +
        '<div class="generic-display-card position-relative"> ' +
          '<div class="generic-display-card_header"> ' +
            '<div layout> ' +
              '<md-button aria-label="{{\'ACTION.CLOSE\'| translate}}" class="generic-hit-area-button generic-hit-area-button__40 margin-left-4" ' +
                'ng-click="vm.onCloseCard(card)" ng-show="vm.showCloseCardButton"> ' +
                '<md-icon md-font-icon="icon-cancel"></md-icon> ' +
              '</md-button> ' +
              '<md-button aria-label="{{\'ACTION.TOGGLE_FULLSCREEN\'| translate}}" class="generic-hit-area-button generic-hit-area-button__40 margin-right-4" ' +
                'ng-click="vm.onFullScreenCard()" ng-show="vm.showFullScreenButton"> ' +
                '<md-icon md-font-icon="icon-fullscreen" ng-if="!vm.showExitFullScreenButton"></md-icon> ' +
                '<md-icon md-font-icon="icon-fullscreen-exit" ng-if="vm.showExitFullScreenButton"></md-icon> ' +
              '</md-button> ' +
              '<div class="generic-display-card_vertical-divider"></div> ' +
              '<p class="generic-display-card_header-title margin-0 truncate" flex ng-bind="card.content.title"></p> ' +
            '</div> ' +
          '</div> ' +
          '<div class="generic-display-card_content"> ' +
            '<div class="index-card_content-container" ng-style="{\'background-image\': \'url(\' + card.content.img + \')\'}"> ' +
              '<div class="index-card_content-info">' +
                '<div class="index-card_content-title" ng-bind-html="vm.getFirstTitle(card)"></div> ' +
                '<div class="index-card_content-intro" ng-bind-html="vm.getFirstDescription(card)"></div> ' +
              '</div> ' +
            '</div> ' +
          '</div> ' +
          '<div class="index-card_content-action no-focus" ng-bind-html="vm.getFirstNugget(card)" ng-click="vm.onNavigateTo(card, \'nugget\')"></div> ' +
          '<div class="generic-display-card_footer"> ' +
            '<md-button aria-label="Share" class="generic-full-area-button generic-full-area-button__48" ng-class="vm.showShareLinkHolder ? \'active\' : \'\'" ' +
              'ng-click="vm.onShare(card)" ng-show="vm.showSocialShareButton"> ' +
              '<md-icon md-font-icon="icon-share"></md-icon> ' +
            '</md-button> ' +
            '<div class="generic-display-card_share" ng-if="vm.showShareLinkHolder"> ' +
              '<md-input-container class="md-block"> ' +
                '<label translate>Link</label> ' +
                '<input ng-model="vm.sharableLink" disabled> ' +
              '</md-input-container> ' +
              '<md-button class="md-primary md-raised full-width margin-0" ' +
                'ng-if="!vm.linkCopied" ' +
                'clipboard supported="supported" ' +
                'text="vm.sharableLink" ' +
                'on-copied="vm.copySuccess()" ' +
                'aria-label="Copy Link">Copy Link ' +
              '</md-button> ' +
              '<md-button class="md-black-and-white md-raised full-width margin-0" ' +
                'ng-if="vm.linkCopied" ' +
                'aria-label="Link Copied">Link Copied ' +
              '</md-button> ' +
            '</div> ' +
          '</div> ' +
        '</div >',
      controller: 'BePublicationCardController',
      controllerAs: 'vm',
      scope: {
        card: '=',
        showSocialShareButton: '=?',
        showCloseCardButton: '=?',
        showFullScreenButton: '=?',
        showExitFullScreenButton: '=?',
        onNavigationLinkClick: '&',
        onFullScreenCardClick: '&',
        onCloseCardClick: '&'
      }
    };
  }
}
