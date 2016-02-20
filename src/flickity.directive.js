/* global Flickity */

/**
 * Flickity.js
 * http://flickity.metafizzy.co/options.html
 *
 * Required markup
 *
 * <div bc-flickity flickity-options="{{ vm.myCustomOptions }}">
 *   <div>
 *   <div>
 *   ...
 * </div>
 *
 */
export function FlickityDirective(
    $timeout,
    FlickityConfig, FlickityService
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        scope: {},
        bindToController: {
            bcFlickity: '@?',
        },
        link: linkFunction,
        controller: FlickityController,
        controllerAs: 'vm',
    };

    return directive;


    /**
     * Link
     */
    function linkFunction($scope, $element, $attrs, $controller) {
        'ngInject';

        // Using a timeout ensures that any ng-repeats can finish running before we initialize
        $timeout(() => {
            // Initialize Flickity
            const flickityInstance =
                FlickityService.create($element[0], $controller.flickityId, $controller.options);

            // Expose the Flickity instance and ID
            $controller.Flickity = flickityInstance.instance;
            $controller.flickityId = flickityInstance.id;
        });


        // Clean up when being destroyed
        const onDestroy = $scope.$on('$destroy', (event) => {
            FlickityService.destroy($controller.flickityId);
        });

    }


    /**
     * Controller
     */
    function FlickityController() {

        // Extend the default options with user configuration
        this.options = angular.extend({}, FlickityConfig, angular.fromJson(this.bcFlickity));

    }


}


