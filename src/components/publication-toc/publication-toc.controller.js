export default class PublicationTocController {
  constructor($scope, parsingService) {
    'ngInject';

    this.$scope = $scope;
    this.parsingService = parsingService;

    this.$doCheck = () => {
      if (this.$scope.toc && (this.$scope.toc !== this.oldToc)) {
        this.oldToc = this.$scope.toc;
        this.sections = this.createSections(this.$scope.toc);
      }
    };
  }

  displayItemById(itemId) {
    this.$scope.onDisplayItemId({itemId: itemId});
  }

  convertToSections(sectionsArray, sectionLevel) {
    return sectionsArray.reduce((acc, sectionElement) => {
      if (sectionElement.item.type === "Classification") {
        const section = {
          "classification" : sectionElement.item.data.classification,
          "items" : this.parsingService.convertToSectionItems(sectionElement.children),
          "level" : sectionLevel
        };

        if (this.parsingService.hasChildSections(sectionElement)) {
          section.children = [].concat(this.convertToSections(sectionElement.children, sectionLevel + 1));
        } else {
          section.children = [];
        }
        acc.push(section);
      }
      return acc;
    }, []);
  }

  createSections(toc) {
    if (toc) {
      return [].concat(this.convertToSections(toc, 0));
    } else {
      return [];
    }
  }



}
