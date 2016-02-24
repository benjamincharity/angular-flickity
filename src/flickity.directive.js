/* global Flickity */
import { FlickityController } from './flickity.controller';

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
    FlickityService
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        scope: {},
        bindToController: {
            bcFlickity: '@?',
            bcFlickityId: '@?',
            bcFlickityEvents: '=?',
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

        // If no ID was passed in
        if (!$controller.bcFlickityId) {
            // Use the element's ID if one exists
            if ($attrs.id) {
                $controller.bcFlickityId = $attrs.id;
            }
        }

        // Using a timeout ensures that any ng-repeats can finish running before we initialize
        $timeout(() => {
            // Initialize Flickity
            FlickityService.create($element[0], $controller.bcFlickityId, $controller.options)
                .then((flickityInstance) => {
                    console.log('created flickity: ', flickityInstance);
                    // Expose the Flickity instance and ID
                    $controller.Flickity = flickityInstance.instance;
                    $controller.bcFlickityId = flickityInstance.id;
                    $controller.bindEvents();
                });
        });


        // Clean up when being destroyed
        const onDestroy = $scope.$on('$destroy', (event) => {
            FlickityService.destroy($controller.bcFlickityId);
        });

    }


}


