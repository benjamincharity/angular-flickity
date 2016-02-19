/* global Flickity */

/**
 * Flickity.js
 * http://flickity.metafizzy.co/options.html
 *
 * Required markup
 *
 * <div bc-flickity flickity-draggable="true" ...>
 *   <div>
 *   <div>
 *   ...
 * </div>
 *
 */
export function FlickityDirective(
    $timeout,
    FlickityProvider, FlickityService
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        scope: {},
        bindToController: {
            flickityOptions: '=?',
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

        // Extend the default options with user configuration
        const flickityOptions = angular.extend({}, FlickityProvider, $controller.flickityOptions);

        console.log('flickityOptions: ', flickityOptions);


        // Initialize Flickity
        // Using a timeout ensures that any ng-repeats can finish running before we initialize
        $timeout(() => {
            const flickityInstance =
                FlickityService.create($element[0], $controller.flickityId, flickityOptions);

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



    }


}


