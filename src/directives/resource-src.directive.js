"use strict";

export default function (businessElementsApi) {
  "ngInject";

  return {
    restrict: "A",
    scope: {
      resourceSrc: "@",
      onErrorCallback: "&"
    },
    link: ($scope, $element, attrs) => {
      $scope.$watch("resourceSrc", function() {
        const qualifier = attrs.resourceQualifier;
        const uri = businessElementsApi.getDownloadUri(attrs.resourceSrc, qualifier);
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
