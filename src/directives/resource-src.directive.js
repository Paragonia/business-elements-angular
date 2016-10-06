"use strict";

function resourceSrc(businessElementsApi) {
  return {
    restrict: "A",
    scope: {
      resourceSrc: "@",
      onErrorCallback: "&"
    },
    link: ($scope, $element, attrs) => {
      $scope.$watch("resourceSrc", function() {
        const qualifier = attrs.resourceQualifier;
        const isPublic = attrs.resourcePublic || false;
        const uri = isPublic ? businessElementsApi.getPublicDownloadUri(attrs.resourceSrc, qualifier) : businessElementsApi.getDownloadUri(attrs.resourceSrc, qualifier);
        $element.attr("src", uri);

        $element.on("error", function() {
          if ($scope.onErrorCallback) {
            $scope.onErrorCallback();
          }
        });
      });
    }
  };
}

resourceSrc.$inject = ["businessElementsApi"];
export default resourceSrc;

