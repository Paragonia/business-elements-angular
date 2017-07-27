export default class PublicationTocDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      replace: true,
      template: '' +
        '<md-list flex> ' +
        '<div ng-repeat="section in vm.sections"> ' +
        '<be-publication-toc-section section-level="section.level" ' +
        'is-open="section.open" ' +
        'section="section" ' +
        'on-display-item-id="vm.displayItemById(itemId, itemUrl)" ' +
        'show-section-header="!vm.isSingleRootSection()"> ' +
        '</be-publication-toc-section> ' +
        '</div> ' +
        '</md-list >',
      controller: 'BePublicationTocController',
      controllerAs: 'vm',
      scope: {
        onDisplayItemId: '&',
        toc: '='
      }
    };
  }
}


