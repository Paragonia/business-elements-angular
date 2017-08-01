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
                '<img ng-repeat="i in vm.getMaturity(card) track by $index" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSIxMC4zMDdweCIgaGVpZ2h0PSIxMS44OTlweCIgdmlld0JveD0iNy44NDcgMC41NSAxMC4zMDcgMTEuODk5IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDcuODQ3IDAuNTUgMTAuMzA3IDExLjg5OSIKCSB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBvbHlnb24gZmlsbD0iIzMzMzMzMyIgcG9pbnRzPSI3Ljg0NywzLjUyNCA3Ljg0Nyw5LjQ3NyAxMywxMi40NDkgMTguMTUzLDkuNDc3IDE4LjE1MywzLjUyNCAxMywwLjU1ICIvPgo8L3N2Zz4K"/> ' +
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
