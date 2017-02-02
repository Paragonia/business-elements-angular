export default function (stringUtil) {
  "ngInject";

  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, element, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        if (stringUtil.isEmailAddressValid(viewValue)) {
          ctrl.$setValidity("validEmailAddress", true);
          return viewValue;
        } else {
          ctrl.$setValidity("validEmailAddress", false);
          return undefined;
        }
      });
    }
  };
}
