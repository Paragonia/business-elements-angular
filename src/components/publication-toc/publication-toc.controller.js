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

  displayItemById(itemId, itemUrl) {
    this.setSectionOpenBasedOnSelectedItem(this.sections, itemId);
    this.$scope.onDisplayItemId({itemId: itemId, itemUrl: itemUrl});
  }

  setSectionOpenBasedOnSelectedItem(sectionsArray, itemId) {
    // if section does not have any siblings, it is always opened
    const hasOneSection = this.isSingleSection(sectionsArray);

    return sectionsArray.reduce((acc, sectionElement) => {
      const doesChildItemMatchesSelectedItemId = angular.isDefined(sectionElement.items.find((item) => {
        const foundItem = item.id === itemId;
        item.selected = foundItem;
        return foundItem;
      }));
      if (!doesChildItemMatchesSelectedItemId) {
        acc = this.setSectionOpenBasedOnSelectedItem(sectionElement.children, itemId);
      } else {
        acc = true;
      }
      if (!hasOneSection && !acc) {
        sectionElement.open = acc;
      }
      return acc;
    }, false);
  }

  convertToSections(sectionsArray, sectionLevel) {
    // if section does not have any siblings, it is always opened
    const hasOneSection = this.isSingleSection(sectionsArray);

    return sectionsArray.reduce((acc, sectionElement) => {
      if (sectionElement.item.type === "Classification") {
        const section = {
          "classification" : sectionElement.item.data.classification,
          "items" : this.parsingService.convertToSectionItems(sectionElement.children),
          "level" : sectionLevel,
          'open' : hasOneSection
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

  isSingleSection(sectionsArray) {
    return sectionsArray.length === 1;
  }

  isSingleRootSection() {
    return this.isSingleSection(this.sections);
  }
}