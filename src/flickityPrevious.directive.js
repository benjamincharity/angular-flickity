export function FlickityPreviousDirective(
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
    function linkFunction($scope, $element, $attrs, $ctrl) {

        // If no boolean was passed in, set to a default
        if (typeof $scope.bcFlickityPrevious !== 'boolean') {
            $scope.bcFlickityPrevious = true;
        }

        // Bind the click up to the required controller
        $element.on('click', () => {
            $ctrl.previous($scope.bcFlickityPrevious);
        });

    }



}



