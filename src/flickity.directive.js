/* global Flickity */

export function FlickityDirective(
    $timeout,
    FlickityService,
    FlickityConfig
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
        controller: () => {},
        controllerAs: 'vm',
    };

    return directive;


    function preLinkFunction($scope, $element, $attrs, $controller) {
        'ngInject';

        // Get the user's options or start with an empty object
        const userOptions = angular.fromJson($controller.bcFlickity || {});
        // Combine the user options with the default options
        $controller.options = angular.extend({}, FlickityConfig, userOptions);

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

        // Make sure this `create()` gets picked up in the next digest cycle
        $timeout(() => {

            // Initialize Flickity
            FlickityService.create($element[0], $controller.bcFlickityId, $controller.options)
                .then((flickityInstance) => {

                    // Expose the Flickity instance and ID
                    $controller.Flickity = flickityInstance.instance;
                    $controller.bcFlickityId = flickityInstance.id;

                })
            ;

        });

        // When the directive is being destroyed
        const onDestroy = $scope.$on('$destroy', (event) => {
            // Make sure we destroy the Flickity instance
            FlickityService.destroy($controller.bcFlickityId);
        });

    }


}
