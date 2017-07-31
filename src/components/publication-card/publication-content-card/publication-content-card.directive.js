export default class PublicationContentCardDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      template: '' +
        '<div class="card"> ' +
        '<div class="content-card-header"> ' +
        '<div layout> ' +
        '<md-button aria-label="Close" ng-click="vm.onCloseCard(card)" class="toolbar-icon"> ' +
        '<md-icon md-font-icon="icon-cancel"></md-icon> ' +
        '</md-button> ' +
        '<md-button aria-label="Toggle full screen mode" class="toolbar-icon" ng-click="vm.goToFullscreen()"> ' +
        '<md-icon md-font-icon="icon-fullscreen"></md-icon> ' +
        '</md-button> ' +
        '<p class="card-title margin-0 truncate" flex ng-bind="card.content.title"></p> ' +
        '</div> ' +
        '<hr/> ' +
        '</div> ' +
        '<div class="content-card-content authenticated-content-card-content" ng-class="vm.isDocument(card) ? \'pdf-card-content\' : \'\'"> ' +
        '<div ng-if="vm.isDocument(card)" class="card-inner-content pdf-viewer-container"> ' +
        '<pdf-viewer ' +
        'delegate-handle="card.id" ' +
        'url="vm.getPdfDownloadUri(card)" ' +
        'scale="1" ' +
        'show-toolbar="true" ' +
        'class="pdfViewer transparent"> ' +
        '</pdf-viewer> ' +
        '</div> ' +
        '<div ng-if="card.content.type !== \'documentView\'" class="card-inner-content"> ' +
        '<p class="no-margin card-type" ng-bind="vm.getCardType(card)"></p> ' +
        '<h1>{{card.content.title}}</h1> ' +
        '<p ng-if="card.content.maturity" class="margin-0 maturity"> ' +
        '<img ng-repeat="i in vm.getMaturity(card) track by $index" src="assets/images/maturity-1-s.svg"/> ' +
        '</p> ' +
        '<hr/> ' +
        '<div ng-if="card.content.intro && card.cardLayout !== \'responsive\'" class="fullWidthText italicText" ng-bind-html="vm.getMarkedContent(card.content.intro)"></div> ' +
        '<figure ng-if="card.content.img" class="fullwidth"> ' +
        '<img ng-src="{{card.content.img}}"/> ' +
        '</figure> ' +
        '<div ng-repeat="paragraph in card.content.paragraphs track by $index"> ' +
        '<div ng-if="vm.containsParagraphImage(paragraph)"> ' +
        '<div ng-bind-html="vm.getImgHtml(paragraph, $index)"></div> ' +
        '</div> ' +
        '<div ng-if="vm.containsText(paragraph)"> ' +
        '<div bind-html-compile="vm.getTextHtml(paragraph, $index)"></div> ' +
        '</div> ' +
        '<div ng-if="vm.containsDocument(paragraph)"> ' +
        '<a href="#" ng-click="vm.onClickDocumentLink(card.id, paragraph.value.title, paragraph.value.href)" ng-bind="paragraph.value.title"></a> ' +
        '</div> ' +
        '<div ng-if="vm.containsVideo(paragraph)"> ' +
        '<div class="responsive-embed-youtube"> ' +
        '<iframe title="Video player" ng-src="{{vm.getYoutubeUri(paragraph)}}" frameborder="0" allowFullScreen></iframe> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '<div class="content-card-footer" layout> ' +
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
        onDocumentLinkClick: '&',
        onPatternLinkClick: '&'
      }
    };
  }
}
