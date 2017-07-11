export default class PublicationTocSectionDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      replace: true,
      template: '' +
      '<div flex ng-class="sectionClass"> ' +
      '<md-list-item ' +
      'class="menu-title truncate no-focus" ' +
      'ng-if="showSectionHeader" ' +
      'ng-click="sectionVm.toggleSection(section)"> ' +
      '<md-icon md-font-icon="icon-caret-down" ng-if="section.open"></md-icon> ' +
      '<md-icon md-font-icon="icon-caret-right" ng-if="!section.open"></md-icon> ' +
      '<span>{{ section.classification }}</span> ' +
      '</md-list-item> ' +
      '<md-list-item class="menu-item" ' +
      'ng-show="section.open" ' +
      'ng-click="sectionVm.displayItemById(item.id)" ' +
      'ng-repeat-end ng-repeat="item in section.items"> ' +
      '<span>{{item.title}}</span> ' +
      '</md-list-item> ' +
      '<md-list flex ng-if="section.children" ng-show="section.open"> ' +
      '<div ng-repeat="sectionChild in section.children"> ' +
      '<be-publication-toc-section section-level="sectionChild.level" ' +
      'is-open="true" ' +
      'section="sectionChild" ' +
      'on-display-item-id="sectionVm.displayItemById(itemId)" ' +
      'show-section-header="true"> ' +
      '</be-publication-toc-section> ' +
      '</div> ' +
      '</md-list> ' +
      '</div >',
      controller: 'PublicationTocSectionController',
      controllerAs: 'sectionVm',
      scope: {
        onDisplayItemId: '&',
        section: '=',
        sectionLevel: '=',
        isOpen: '=',
        showSectionHeader: '<'
      }
    };
  }
}