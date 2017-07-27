/* global require:false */

require('./publication-toc/publication-toc.module').default();
require('./publication-toc-section/publication-toc-section.module').default();
require('./publication-card/publication-card.module').default();

export default function () {
  angular.module('app.be-components', [
    'app.be-components.publication-toc',
    'app.be-components.publication-toc-section',
    'app.be-components.publication-card'
  ]);
}