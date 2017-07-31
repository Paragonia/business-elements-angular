export default class PublicationContentCardDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      template: '' +
        '<div class="generic-display-card" ng-class="{\'fullscreen\': vm.fullScreenCard}">' +
          '<div class="generic-display-card_header content-card_header">' +
            '<div layout> ' +
              '<md-button aria-label="{{\'ACTION.CLOSE\'| translate}}" class="generic-hit-area-button generic-hit-area-button__40 margin-left-4"' +
                'ng-click="vm.onCloseCard(card)" ng-show="vm.showCloseCardButton">' +
                '<md-icon md-font-icon="icon-cancel"></md-icon>' +
              '</md-button>' +
              '<md-button aria-label="{{\'ACTION.TOGGLE_FULLSCREEN\'| translate}}" class="generic-hit-area-button generic-hit-area-button__40 margin-right-4"' +
                'ng-click="vm.toggleFullScreenCard(card)" ng-show="vm.showFullScreenButton">' +
                '<md-icon md-font-icon="icon-fullscreen" ng-if="!vm.fullScreenCard"></md-icon>' +
                '<md-icon md-font-icon="icon-fullscreen-exit" ng-if="vm.fullScreenCard"></md-icon>' +
              '</md-button>' +
              '<div class="generic-display-card_vertical-divider"></div>' +
              '<p class="generic-display-card_header-title margin-0 truncate" flex ng-bind="card.content.title"></p> ' +
            '</div> ' +
          '</div> ' +
          '<div class="generic-display-card_content content-card_content" ng-class="vm.isDocument(card) ? \'pdf-card-content\' : \'\'"> ' +
            '<div ng-if="vm.isDocument(card)" class="pdf-viewer-container"> ' +
              '<pdf-viewer ' +
              'delegate-handle="card.id" ' +
              'url="vm.getPdfDownloadUri(card)" ' +
              'scale="1" ' +
              'show-toolbar="true"> ' +
              '</pdf-viewer> ' +
            '</div> ' +
            '<div ng-if="card.content.type !== \'documentView\'"> ' +
              '<p class="content-card_content-type" ng-bind="vm.getCardType(card)"></p> ' +
              '<h1>{{card.content.title}}</h1> ' +
              '<p ng-if="card.content.maturity" class="content-card_content-maturity"> ' +
                '<img ng-repeat="i in vm.getMaturity(card) track by $index" src="assets/images/maturity-1-s.svg"/> ' +
              '</p> ' +
              '<hr/> ' +
              '<div ng-if="card.content.intro && card.cardLayout !== \'responsive\'" class="content-card_content-intro" ng-bind-html="vm.getMarkedContent(card.content.intro)"></div> ' +
              '<figure ng-if="card.content.img" class="content-card_content-main-image"> ' +
                '<img ng-src="{{card.content.img}}"/> ' +
              '</figure> ' +
              '<div ng-repeat="paragraph in card.content.paragraphs track by $index" class="content-card_content-details"> ' +
                '<div ng-if="vm.containsParagraphImage(paragraph)"> ' +
                  '<div be-compile="vm.getImgHtml(paragraph, $index)"></div> ' +
                '</div> ' +
                '<div ng-if="vm.containsText(paragraph)"> ' +
                  '<div be-compile="vm.getContentTextHtml(paragraph, $index)"></div> ' +
                '</div> ' +
                '<div ng-if="vm.containsDocument(paragraph)"> ' +
                  '<p>' +
                    '<a href="#" ng-click="vm.onClickDocumentLink(card.id, paragraph.value.title, paragraph.value.href)" ng-bind="paragraph.value.title"></a> ' +
                  '</p>' +
                '</div> ' +
                '<div ng-if="vm.containsVideo(paragraph)"> ' +
                  '<div class="responsive-embed-youtube"> ' +
                    '<iframe title="Video player" ng-src="{{vm.getYoutubeUri(paragraph)}}" frameborder="0" allowFullScreen></iframe> ' +
                  '</div> ' +
                '</div> ' +
              '</div> ' +
            '</div> ' +
          '</div> ' +
          '<div class="generic-display-card_footer" layout> ' +
          '</div> ' +
        '</div> ',
      controller: 'BePublicationCardController',
      controllerAs: 'vm',
      scope: {
        card: '=',
        showCloseCardButton: '=?',
        showFullScreenButton: '=?',
        onNavigationLinkClick: '&',
        onCloseCardClick: '&',
        onFullScreenCardClick: '&',
        onDocumentLinkClick: '&',
        onPatternLinkClick: '&'
      }
    };
  }
}
