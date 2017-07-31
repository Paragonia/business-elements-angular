import PublicationContentCardDirective from './publication-content-card/publication-content-card.directive';
import PublicationArticleCardDirective from './publication-article-card/publication-article-card.directive';
import PublicationIndexCardDirective from './publication-index-card/publication-index-card.directive';
import PublicationPreviewCardDirective from './publication-preview-card/publication-preview-card.directive';
import PublicationCardController from './publication-card.controller';

export default function () {
  angular.module('app.be-components.publication-card', [])
    .controller('BePublicationCardController', PublicationCardController)
    .directive('bePublicationPreviewCard', () => new PublicationPreviewCardDirective())
    .directive('bePublicationContentCard', () => new PublicationContentCardDirective())
    .directive('bePublicationArticleCard', () => new PublicationArticleCardDirective())
    .directive('bePublicationIndexCard', () => new PublicationIndexCardDirective());
}
