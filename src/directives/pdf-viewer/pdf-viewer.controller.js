/*global PDFJS:false*/

export default class PdfViewerController {

  constructor($scope, $element, $attrs, $document, $animate, $timeout, pdfService, $log, $q, $location) {
    'ngInject';

    this.$scope = $scope;
    this.$log = $log;
    this.$q = $q;
    this.$element = $element;
    this.$location = $location;
    this.$document = $document[0];
    this.$animate = $animate;
    this.$timeout = $timeout;
    // Register the instance!
    $scope.delegateHandle = $scope.$eval($attrs.delegateHandle);
    var deregisterInstance = pdfService._registerInstance(this, $scope.delegateHandle);
    // De-Register on destory!
    $scope.$on('$destroy', () => {
      deregisterInstance();
    });
    $scope.pageCount = 0;

    this.url = $scope.$eval($attrs.url);
    this.headers = $scope.$eval($attrs.headers);

    this.currentPage = 1;
    this.scale = $attrs.scale ? $attrs.scale : 1;

    this.$animate.addClass(this.$element, 'ng-enter').then( () => {
      this.$timeout(() => {
        if (this.url) this.load(this.url);
      }, 1000);
    });
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
      let pageId = `pageContainer${newVal}${this.$scope.delegateHandle}`;
      this.$location.hash(pageId);
    }
  }

  load(url) {
    var docInitParams = {};

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

        this.$element.removeClass('transparent');

        this.pdfDoc = _pdfDoc;

        this.$scope.$apply(() => {
          this.$scope.pageCount = _pdfDoc.numPages;

          let pdfContainer = angular.element(this.$element).find("div")[2];
          for (let i=0; i<_pdfDoc.numPages; i++) {
            let page = this.createEmptyPage(i+1);
            pdfContainer.append(page);
          }

          this.pdfDoc.getPage(1).then((page) => {this.handlePages(page)});

          angular.element(pdfContainer).bind('scroll', (evt) => {
            let currentPage = Math.round(evt.currentTarget.scrollTop / this.pageHeight) + 1;
            this.currentPage = currentPage;
            this.$scope.$broadcast("currentPageChanged");
          });
        });
      }, (error) => {
        this.$log.error(error);
        return this.$q.reject(error);
      })
  }

  handlePages(pdfPage)
  {
    let page = this.$document.getElementById(`pageContainer${this.currentPage}${this.$scope.delegateHandle}`);
    let canvas = page.querySelector('canvas');
    let wrapper = page.querySelector('.canvasWrapper');
    let container = page.querySelector('.textLayer');
    let canvasContext = canvas.getContext('2d');
    let viewport = pdfPage.getViewport(606 / pdfPage.getViewport(1.0).width)
    this.pageHeight = viewport.height;
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    page.style.width = `${viewport.width}px`;
    page.style.height = `${viewport.height}px`;
    wrapper.style.width = `${viewport.width}px`;
    wrapper.style.height = `${viewport.height}px`;
    container.style.width = `${viewport.width}px`;
    container.style.height = `${viewport.height}px`;

    pdfPage.render({
      canvasContext,
      viewport
    });

    pdfPage.getTextContent().then(textContent => {
      PDFJS.renderTextLayer({
        textContent,
        container,
        viewport,
        textDivs: []
      });
    });

    page.setAttribute('data-loaded', 'true');

    //Move to next page
    this.currentPage++;
    if ( this.pdfDoc !== null && this.currentPage <= this.$scope.pageCount )
    {
      this.pdfDoc.getPage( this.currentPage ).then((page) => {this.handlePages(page) });
    }
  }

  createEmptyPage(num) {
    let page = this.$document.createElement('div');
    let canvas = this.$document.createElement('canvas');
    let wrapper = this.$document.createElement('div');
    let textLayer = this.$document.createElement('div');

    page.className = 'page';
    wrapper.className = 'canvasWrapper';
    textLayer.className = 'textLayer';

    page.setAttribute('id', `pageContainer${num}${this.$scope.delegateHandle}`);
    page.setAttribute('data-loaded', 'false');
    page.setAttribute('data-page-number', num);

    canvas.setAttribute('id', `page${num}`);

    page.appendChild(wrapper);
    page.appendChild(textLayer);
    wrapper.appendChild(canvas);

    return page;
  }
}
