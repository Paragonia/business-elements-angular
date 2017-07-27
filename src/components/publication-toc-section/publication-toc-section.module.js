import PublicationTocSectionDirective from './publication-toc-section.directive';
import PublicationTocSectionController from './publication-toc-section.controller';

export default function () {
  angular.module('app.be-components.publication-toc-section', [])
    .controller('BePublicationTocSectionController', PublicationTocSectionController)
    .directive('bePublicationTocSection', () => new PublicationTocSectionDirective());
}
