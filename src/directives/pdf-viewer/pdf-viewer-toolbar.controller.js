export default class PdfViewerToolbarController {
  constructor($scope, pdfService) {
    'ngInject';

    $scope.pdfService = pdfService;
  }
}
