function backgroundSrc(md5, api) {
  return {
    restrict: "A",
    scope: {
      backgroundSrc: "@",
      backgroundResource: "@?"
    },
    link: function ($scope, $element, attrs) {
      $scope.$watchGroup(["backgroundSrc", "backgroundResource"], function () {
        const displayText = attrs.backgroundSrc;

        const color = attrs["backgroundColor"];
        const colorInput = attrs["backgroundColorInput"];
        const resourceUri = $scope.backgroundResource;

        const url = getUri(displayText, color, colorInput, resourceUri);
        $element.attr("src", url);
      });

      function getUri(displayText, color, colorInputOption, resourceUri) {
        if (resourceUri) {
          // if we have picture just return the uri for it, else build the svg.
          return api.getDownloadUri(resourceUri, "thumbnail");
        }

        if (!color) {
          const colorInput = colorInputOption || displayText;
          color = "#" + md5(colorInput).substring(0, 6);
        }

        const data = `
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
            <rect width="80" height="80" fill="${color}" fill-opacity="0.2"/>
            <text x="40"
                y="35"
                text-anchor="middle"
                alignment-baseline="middle"
                font-family="Roboto,Helvetica Neue,sans-serif"
                font-size="8px"
                fill="#5f606c">
                ${displayText}
            </text>
         </svg>
        `;
        return `data:image/svg+xml;utf8,${encodeURIComponent(data)}`;
      }
    }
  };
}

backgroundSrc.$inject = ["md5", "api"];
export default backgroundSrc;
