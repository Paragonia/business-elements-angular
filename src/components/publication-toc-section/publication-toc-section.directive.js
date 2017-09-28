export default class PublicationTocSectionDirective {

  constructor() {
    'ngInject';

    return {
      restrict: 'E',
      replace: true,
      template: '' +
      '<div flex ng-class="sectionClass">' +
        '<div ' +
          'class="menu-title menu-item" ' +
          'ng-if="showSectionHeader" layout layout-align="start center">' +
          '<md-icon ng-click="sectionVm.toggleSection(section)" md-font-icon="icon-caret-down" ng-if="section.open" class="no-focus"></md-icon>' +
          '<md-icon ng-click="sectionVm.toggleSection(section)" md-font-icon="icon-caret-right" ng-if="!section.open" class="no-focus"></md-icon>' +
          '<p class="menu-item-label truncate no-focus" ng-click="sectionVm.openSectionCards(section.items)">{{ section.classification }}</p>' +
        '</div>' +
        '<div class="menu-item" ' +
          'ng-show="section.open" ' +
          'ng-repeat-end ng-repeat="item in section.items" ng-class="{\'selected-menu-item\':item.selected}"> ' +
          '<p class="menu-item-label truncate no-focus" ng-click="sectionVm.displayItemById(item.id)">{{item.title}}</p>' +
        '</div>' +
        '<div flex class="be-toc__section-children" ng-if="section.children" ng-show="section.open">' +
          '<div ng-repeat="sectionChild in section.children">' +
            '<be-publication-toc-section section-level="sectionChild.level" ' +
              'is-open="sectionChild.open" ' +
              'section="sectionChild" ' +
              'on-display-section-items="sectionVm.openSectionCards(items)" ' +
              'on-display-item-id="sectionVm.displayItemById(itemId)" ' +
              'show-section-header="true">' +
            '</be-publication-toc-section>' +
          '</div>' +
        '</div>' +
      '</div >',
      controller: 'BePublicationTocSectionController',
      controllerAs: 'sectionVm',
      scope: {
        onDisplaySectionItems: '&',
        onDisplayItemId: '&',
        section: '=',
        sectionLevel: '=',
        isOpen: '=',
        showSectionHeader: '<'
      }
    };
  }
}
