export default function (stringUtil) {
  "ngInject";

  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, element, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        if (stringUtil.isHandleValid(viewValue)) {
          ctrl.$setValidity("validHandle", true);
          return viewValue;
        } else {
          ctrl.$setValidity("validHandle", false);
          return undefined;
        }
      });
    }
  };
}
