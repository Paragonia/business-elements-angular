import PublicationTocDirective from './publication-toc.directive';
import PublicationTocController from './publication-toc.controller';

export default function () {
  angular.module('app.be-components.publication-toc', [])
    .controller('BePublicationTocController', PublicationTocController)
    .directive('bePublicationToc', () => new PublicationTocDirective());
}
