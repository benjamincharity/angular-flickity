export function FlickityPreviousDirective(
    FlickityService
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        require: '^bcFlickity',
        scope: {
            bcFlickityPrevious: '=?',
        },
        link: linkFunction,
    };

    return directive;


    /**
     * Link
     */
    function linkFunction(
        $scope, $element, $attrs, $controller
    ) {
        'ngInject';

        // If no boolean was passed in, set to a default
        if (typeof $scope.bcFlickityPrevious !== 'boolean') {
            $scope.bcFlickityPrevious = true;
        }

        // Bind the click up to the required controller
        $element.on('click', () => {
            FlickityService.previous($controller.flickityId, $scope.bcFlickityPrevious);
        });

    }



}



