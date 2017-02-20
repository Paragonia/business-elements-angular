function avatarSrc(md5, api) {
  return {
    restrict: "A",
    scope: {
      avatarSrc: "@",
      avatarResource: "@?"
    },
    link: function ($scope, $element, attrs) {
      $scope.$watchGroup(["avatarSrc", "avatarResource"], function () {
        const item = attrs.avatarSrc;

        const color = attrs["avatarColor"];
        const colorInput = attrs["avatarColorInput"];
        const shape = attrs["avatarShape"];
        const fontSize = attrs["avatarFontSize"] || "150%";
        const resourceUri = $scope.avatarResource;

        const url = getUri(item, color, shape, colorInput, fontSize, resourceUri);
        $element.attr("src", url);
      });

      function getUri(item, color, shape, colorInputOption, fontSize, resourceUri) {
        if (resourceUri) {
          // if we have picture just return the uri for it, else build the svg.
          return api.getDownloadUri(resourceUri, "avatar");
        }

        const addressee = item.split("@").find((element) => element.length > 0);

        let text;
        if (addressee.length <= 3) {
          text = addressee;
        } else {
          let initials = addressee
            .split(new RegExp(" |\\.", "g"))
            .filter((element) => element.length > 0)
            .map((element) => element.charAt(0).toUpperCase());

          initials = initials.slice(0, 3);
          text = initials.join("");
        }

        if (!color) {
          const colorInput = colorInputOption || item;
          color = "#" + md5(colorInput).substring(0, 6);
        }

        if (shape === 'rectangle') {
          const data = `
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
            <rect width="80" height="80" fill="${color}"/>
            <text x="50%"
                y="50%"
                text-anchor="middle"
                alignment-baseline="central"
                font-family="Roboto,Helvetica Neue,sans-serif"
                font-size="${fontSize}"
                fill="#ffffff">
                ${text}
            </text>
         </svg>
        `;
          return `data:image/svg+xml;utf8,${encodeURIComponent(data)}`;
        } else {
          const data = `
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80">
            <circle cx="40" cy="40" r="40" fill="${color}"/>
            <text x="50%"
                y="50%"
                text-anchor="middle"
                alignment-baseline="central"
                font-family="Roboto,Helvetica Neue,sans-serif"
                font-size="${fontSize}"
                fill="#ffffff">
                ${text}
            </text>
         </svg>
        `;
          return `data:image/svg+xml;utf8,${encodeURIComponent(data)}`;
        }

      }
    }
  };
}

avatarSrc.$inject = ["md5", "api"];
export default avatarSrc;
