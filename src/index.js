"use strict";
/*global angular:false PDFJS:false*/


// further peer dependencies should be required here
require("business-elements");
require('pdfjs-dist');
PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker');

// code for the module should be imported
import BusinessElementsApiProvider from "./services/business-elements-api.provider";
import stringUtil from "./util/string.util";
import resourceSrc from "./directives/resource-src.directive";
import avatarSrc from "./directives/avatar-src.directive";
import transcludeReplace from "./directives/transclude-replace.directive";
import validEmailaddress from "./directives/valid-emailaddress.directive";
import validHandle from "./directives/valid-handle.directive";
import pdfViewer from "./directives/pdf-viewer/pdf-viewer.directive";
import pdfViewerToolbar from "./directives/pdf-viewer/pdf-viewer-toolbar.directive";
import PdfViewerController from './directives/pdf-viewer/pdf-viewer.controller';
import PdfViewerToolbarController from './directives/pdf-viewer/pdf-viewer-toolbar.controller';
import PdfService from './directives/pdf-viewer/pdf.service';


angular.module("businessElementsAngular", [])
  .provider("businessElementsApi", new BusinessElementsApiProvider())
  .provider("stringUtil", stringUtil)
  .factory('pdfService', () => {return new PdfService();})
  .controller('PdfViewerController', PdfViewerController)
  .controller('PdfViewerToolbarController', PdfViewerToolbarController)
  .directive("resourceSrc", resourceSrc)
  .directive("avatarSrc", avatarSrc)
  .directive("ngTranscludeReplace", transcludeReplace)
  .directive("validEmailaddress", validEmailaddress)
  .directive("validHandle", validHandle)
  .directive("pdfViewer", pdfViewer)
  .directive("pdfViewerToolbar", pdfViewerToolbar);

module.exports = "businessElementsAngular";
