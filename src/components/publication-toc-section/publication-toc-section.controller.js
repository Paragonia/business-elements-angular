export default class PublicationTocSectionController {
  constructor($scope) {
    'ngInject';

    this.$scope = $scope;

    // css class to enable indenting of child sections.
    this.$scope.sectionClass = "section-level-" + this.$scope.sectionLevel;
    this.$scope.section.open = this.$scope.isOpen;
  }

  toggleSection(section) {
    if (section.children && angular.isArray(section.children)) {
      section.open = !section.open;
    }
  }

  displayItemById(itemId, itemUrl) {
    this.$scope.onDisplayItemId({itemId: itemId, itemUrl: itemUrl});
  }
}
