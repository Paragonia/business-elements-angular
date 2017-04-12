export default function pdfViewer() {
  return {
    restrict: 'E',
    template: '<pdf-viewer-toolbar ng-if="showToolbar" delegate-handle="delegateHandle" page-count="pageCount"></pdf-viewer-toolbar><canvas></canvas>',
    scope: true,
    controller: 'PdfViewerController',
    link: function (scope, element, attrs) {
      scope.showToolbar = scope.$eval(attrs.showToolbar) || false;
    }
  };
}
