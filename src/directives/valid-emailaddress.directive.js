export default function (stringUtil) {
  "ngInject";

  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, element, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        if (stringUtil.isEmailAddressValid(viewValue)) {
          ctrl.$setValidity("validEmailaddress", true);
          return viewValue;
        } else {
          ctrl.$setValidity("validEmailaddress", false);
          return undefined;
        }
      });
    }
  };
}
