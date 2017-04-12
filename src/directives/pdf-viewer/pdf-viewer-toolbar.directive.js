export default function pdfViewerToolbar() {
    return {
      restrict: 'E',
      template: '' +
      '<div layout="row" layout-align="center center" class="pdf-toolbar">' +
        '<div>' +
          '<input type="text" class="field-dark" ' +
          'min=1 ng-model="currentPage" ng-change="goToPage()" ' +
          'style="width: 10%"> ' +
          ' / {{pageCount}}' +
        '</div>' +
      '</div>' +
      '<hr class="pdf-toolbar-hr" />',
      scope: {pageCount: '=', delegateHandle: '='},
      controller: 'PdfViewerToolbarController',
      link: function (scope, element, attrs) {
        const id = scope.delegateHandle;
        scope.currentPage = 1;
        scope.prev = function () {
          scope.pdfService
            .$getByHandle(id)
            .prev();
          updateCurrentPage();
        };
        scope.next = function () {
          scope.pdfService
            .$getByHandle(id)
            .next();
          updateCurrentPage();
        };
        scope.zoomIn = function () {
          scope.pdfService
            .$getByHandle(id)
            .zoomIn();
        };
        scope.zoomOut = function () {
          scope.pdfService
            .$getByHandle(id)
            .zoomOut();
        };
        scope.rotate = function () {
          scope.pdfService
            .$getByHandle(id)
            .rotate();
        };
        scope.goToPage = function () {
          scope.pdfService
            .$getByHandle(id)
            .goToPage(scope.currentPage);
        };

        const updateCurrentPage = function () {
          scope.currentPage = scope.pdfService
            .$getByHandle(id)
            .getCurrentPage();
        };
      }
    };
}
