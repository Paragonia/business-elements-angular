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

  openSectionCards(items) {
    if (this.$scope.section.children && angular.isArray(this.$scope.section.children)) {
      this.$scope.section.open = true;
      if(items) {
        this.$scope.onDisplaySectionItems({items: items});
      } else if (this.$scope.section.children.items) {
        let items = this.$scope.section.children.items;
        this.$scope.onDisplaySectionItems({items: items});
      }
    }
  }

  displayItemById(itemId, itemUrl) {
    this.$scope.onDisplayItemId({itemId: itemId, itemUrl: itemUrl});
  }
}
