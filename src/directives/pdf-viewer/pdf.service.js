export default class PDFService {
  constructor($log) {
    'ngInject';

    this.$log = $log;
    const methodNames = [
      "prev",
      "next",
      "zoomIn",
      "zoomOut",
      "zoomTo",
      "rotate",
      "getPageCount",
      "getCurrentPage",
      "goToPage",
      "load"
    ];

    const delegate = this;

    let instances = this._instances = [];
    this._registerInstance = function (instance, handle) {
      instance.delegateHandle = handle;
      instances.push(instance);

      return function deregister() {
        const index = instances.indexOf(instance);
        if (index !== -1) {
          instances.splice(index, 1);
        }
      };
    };

    this.$getByHandle = function (handle) {
      if (!handle) {
        return delegate;
      }
      return new InstanceForHandle(handle);
    };

    /*
     * Creates a new object that will have all the methodNames given,
     * and call them on the given the controller instance matching given
     * handle.
     * The reason we don't just let $getByHandle return the controller instance
     * itself is that the controller instance might not exist yet.
     *
     * We want people to be able to do
     * `var instance = $ionicScrollDelegate.$getByHandle('foo')` on controller
     * instantiation, but on controller instantiation a child directive
     * may not have been compiled yet!
     *
     * So this is our way of solving this problem: we create an object
     * that will only try to fetch the controller with given handle
     * once the methods are actually called.
     */
    function InstanceForHandle(handle) {
      this.handle = handle;
    }

    methodNames.forEach(function (methodName) {
      InstanceForHandle.prototype[methodName] = function () {
        const handle = this.handle;
        const args = arguments;
        let matchingInstancesFound = 0;
        let finalResult;
        let result;

        //This logic is repeated below; we could factor some of it out to a function
        //but don't because it lets this method be more performant (one loop versus 2)
        instances.forEach(function (instance) {
          if (instance.delegateHandle === handle) {
            matchingInstancesFound++;
            result = instance[methodName].apply(instance, args);
            //Only return the value from the first call
            if (matchingInstancesFound === 1) {
              finalResult = result;
            }
          }
        });

        if (!matchingInstancesFound) {
          return console.log("No matching instances found!");
        }

        return finalResult;
      };
      delegate[methodName] = function () {
        const args = arguments;
        let finalResult;
        let result;

        //This logic is repeated above
        instances.forEach(function (instance, index) {
          result = instance[methodName].apply(instance, args);
          //Only return the value from the first call
          if (index === 0) {
            finalResult = result;
          }
        });

        return finalResult;
      };
    });
  }
}


