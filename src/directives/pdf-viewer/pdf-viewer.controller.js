/*global PDFJS:false*/

export default class PdfViewerController {

  constructor($scope, $element, $attrs, $log, $q, pdfService) {
    'ngInject';

    this.$scope = $scope;
    this.$log = $log;
    this.$q = $q;

    // Register the instance!

    //const delegateService = new DelegateService();
    $scope.delegateHandle = $scope.$eval($attrs.delegateHandle);
    let deregisterInstance = pdfService._registerInstance(this, $scope.delegateHandle);
    // De-Register on destory!
    $scope.$on('$destroy', deregisterInstance);
    $scope.pageCount = 0;

    this.url = $scope.$eval($attrs.url);
    this.headers = $scope.$eval($attrs.headers);

    this.currentPage = 1;
    this.angle = 0;
    this.scale = $attrs.scale ? $attrs.scale : 1;
    this.canvas = $element.find('canvas')[0];
    this.ctx = this.canvas.getContext('2d');

    if (this.url) {
      this.load(this.url);
    }
  }

  renderPage(num) {
    if (!angular.isNumber(num)) {
      num = parseInt(num);
    }
    if (!isFinite(num) || num <= 0 || num > this.$scope.pageCount || this.pdfDoc === null || angular.isUndefined(this.pdfDoc)) {
      return;
    }

    this.pdfDoc
      .getPage(num)
      .then((page) => {
        let viewport = page.getViewport(this.scale);
        this.canvas.height = viewport.height;
        this.canvas.width = viewport.width;

        let renderContext = {
          canvasContext: this.ctx,
          viewport: viewport
        };

        page.render(renderContext);
      });
  }

  transform() {
    this.canvas.style.webkitTransform = 'rotate(' + this.angle + 'deg)';
    this.canvas.style.MozTransform = 'rotate(' + this.angle + 'deg)';
    this.canvas.style.msTransform = 'rotate(' + this.angle + 'deg)';
    this.canvas.style.OTransform = 'rotate(' + this.angle + 'deg)';
    this.canvas.style.transform = 'rotate(' + this.angle + 'deg)';
  }

  prev() {
    if (this.currentPage <= 1) {
      return;
    }

    this.currentPage = parseInt(this.currentPage, 10) - 1;
    this.renderPage(this.currentPage);
  }

  next() {
    if (this.currentPage >= this.pdfDoc.numPages) {
      return;
    }

    this.currentPage = parseInt(this.currentPage, 10) + 1;
    this.renderPage(this.currentPage);
  }

  zoomIn(amount) {
    amount = amount || 0.2;
    this.scale = parseFloat(this.scale) + amount;
    this.renderPage(this.currentPage);
    return this.scale;
  }

  zoomOut(amount) {
    amount = amount || 0.2;
    this.scale = parseFloat(this.scale) - amount;
    this.scale = (this.scale > 0) ? this.scale : 0.1;
    this.renderPage(this.currentPage);
    return this.scale;
  }

  zoomTo(zoomToScale) {
    zoomToScale = (zoomToScale) ? zoomToScale : 1.0;
    this.scale = parseFloat(zoomToScale);
    this.renderPage(this.currentPage);
    return this.scale;
  }

  rotate() {
    if (this.angle === 0) {
      this.angle = 90;
    } else if (this.angle === 90) {
      this.angle = 180;
    } else if (this.angle === 180) {
      this.angle = 270;
    } else {
      this.angle = 0;
    }
    this.transform();
  }

  getPageCount() {
    return this.$scope.pageCount;
  }

  getCurrentPage () {
    return this.currentPage;
  }

  goToPage(newVal) {
    if (this.pdfDoc !== null && angular.isDefined(this.pdfDoc)) {
      this.currentPage = newVal;
      this.renderPage(newVal);
    }
  }

  load(url) {
    let docInitParams = {};

    if (angular.isString(url)) {
      docInitParams.url = url;
    } else {
      // use Uint8Array or request like `{data: new Uint8Array()}`.  See pdf.js for more details.
      docInitParams.data = url;
    }

    if (this.headers) {
      docInitParams.httpHeaders = this.headers;
    }

    return PDFJS
      .getDocument(docInitParams)
      .then((_pdfDoc) => {

        this.pdfDoc = _pdfDoc;
        this.$scope.$apply(() => {
          this.$scope.pageCount = _pdfDoc.numPages;
          this.renderPage(1);
        });
      }, function (error) {
        this.$log.error(error);
        return this.$q.reject(error);
      });
  }
}
