"use strict";
/*global angular*/


// further peer dependencies should be required here
require("business-elements");

// code for the module should be imported
import BusinessElementsApiProvider from "./services/business-elements-api.provider";
import stringUtil from "./util/string.util";
import resourceSrc from "./directives/resource-src.directive";
import avatarSrc from "./directives/avatar-src.directive";
import transcludeReplace from "./directives/transclude-replace.directive";
import backgroundSrc from "./directives/background-src.directive";
import validEmailaddress from "./directives/valid-emailaddress.directive";
import validHandle from "./directives/valid-handle.directive";

angular.module("businessElementsAngular", [])
  .provider("businessElementsApi", new BusinessElementsApiProvider())
  .provider("stringUtil", stringUtil)
  .directive("resourceSrc", resourceSrc)
  .directive("avatarSrc", avatarSrc)
  .directive("ngTranscludeReplace", transcludeReplace)
  .directive("backgroundSrc", backgroundSrc)
  .directive("validEmailaddress", validEmailaddress)
  .directive("validHandle", validHandle);

module.exports = "businessElementsAngular";