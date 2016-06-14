/* global Flickity */
import { FlickityController } from './flickity.controller';

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
        },
        compile: () => {
            return {
                pre: preLinkFunction,
                post: postLinkFunction,
            };
        },
        controller: FlickityController,
        controllerAs: 'vm',
    };

    return directive;


    function preLinkFunction($scope, $element, $attrs, $controller) {
        'ngInject';

        // If no ID was passed in
        if (!$controller.bcFlickityId) {
            // Use the element's ID if one exists
            if ($attrs.id) {
                $controller.bcFlickityId = $attrs.id;
            }
        }

    }

    /**
     * Post Link
     */
    function postLinkFunction($scope, $element, $attrs, $controller) {
        'ngInject';

        // Make sure the DOM has initialized
        $timeout(() => {

            // Initialize Flickity
            FlickityService.create($element[0], $controller.bcFlickityId, $controller.options)
                .then((flickityInstance) => {

                    // Expose the Flickity instance and ID
                    $controller.Flickity = flickityInstance.instance;
                    $controller.bcFlickityId = flickityInstance.id;

                });
        }, 0);

        // When the directive is being destroyed
        const onDestroy = $scope.$on('$destroy', (event) => {
            // Make sure we destroy the Flickity instance
            FlickityService.destroy($controller.bcFlickityId);
        });

    }


}
