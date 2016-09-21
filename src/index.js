"use strict";
/*global angular*/


// further peer dependencies should be required here
require("business-elements");

// code for the module should be imported
import BusinessElementsApiProvider from "./services/business-elements-api.provider";
import resourceSrc from "./directives/resource-src.directive";
import avatarSrc from "./directives/avatar-src.directive";
import transcludeReplace from "./directives/transclude-replace.directive";

angular.module("businessElementsAngular", [])
  .provider("businessElementsApi", new BusinessElementsApiProvider())
  .directive("resourceSrc", resourceSrc)
  .directive("avatarSrc", avatarSrc)
  .directive("ngTranscludeReplace", transcludeReplace);

module.exports = "businessElementsAngular";
