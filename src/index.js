"use strict";

/*global angular*/

import BusinessElementsApiProvider from "./services/business-elements-api.provider";
import resourceSrc from "./directives/resource-src.directive";

export default function () {
  angular.module("businessElements", [])
    .provider("businessElementsApi", new BusinessElementsApiProvider())
    .directive("resourceSrc", resourceSrc);
}
