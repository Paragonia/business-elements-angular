import PublicationContentCardDirective from './publication-content-card/publication-content-card.directive';
import PublicationAnonymousContentCardDirective from './publication-anonymous-content-card/publication-anonymous-content-card.directive';
import PublicationLandingContentCardDirective from './publication-landing-content-card/publication-landing-content-card.directive';
import PublicationPreviewCardDirective from './publication-preview-card/publication-preview-card.directive';
import PublicationCardController from './publication-card.controller';

export default function () {
  angular.module('app.be-components.publication-card', [])
    .controller('BePublicationCardController', PublicationCardController)
    .directive('bePublicationPreviewCard', () => new PublicationPreviewCardDirective())
    .directive('bePublicationContentCard', () => new PublicationContentCardDirective())
    .directive('bePublicationAnonymousContentCard', () => new PublicationAnonymousContentCardDirective())
    .directive('bePublicationLandingContentCard', () => new PublicationLandingContentCardDirective());
}
