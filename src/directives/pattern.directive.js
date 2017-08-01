export default function PatternDirective() {
  return {
    restrict: 'E',
    scope: true,
    transclude: true,
    template: "<a href='' ng-click='openPattern()' ng-transclude></a>",
    link: function (scope, element) {

      /**
       * Trying to find the scope variable name in scope tree.
       * @param aScope the scope on which the variable is looked for.
       * @param scopeVariableName the variable name
       */
      let findScopeReference = (aScope, scopeVariableName) => {
        let variable = aScope[scopeVariableName];
        if (variable) {
          return variable;
        } else {
          if (aScope.$parent) {
            /* continue with parentScope */
            return findScopeReference(aScope.$parent, scopeVariableName);
          } else {
            return undefined;
          }
        }
      };

      const patternName = element[0].textContent;
      const patterns = findScopeReference(scope, "patterns");
      let foundPattern;
      if (patterns) {
        foundPattern = patterns.find((aPattern) => aPattern.pattern === patternName);
      }

      /**
       * The click action of the link, will resolve a scoped method "OnPatternLinkClick"
       * and execute it with the resolved pattern as argument.
       */
      scope.openPattern = () => {
        if (foundPattern) {
          const clickMethod = findScopeReference(scope, "onPatternLinkClick");
          if (clickMethod) {
            clickMethod({cardId: foundPattern.contentId});
          }
        }
      };

    }
  }
};

