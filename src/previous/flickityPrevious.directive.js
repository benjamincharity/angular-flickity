import { PreviousController } from './previous.controller';

export function FlickityPreviousDirective(
    $log, $timeout,
    FlickityConfig, FlickityService
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        scope: {},
        bindToController: {
            bcFlickityPrevious: '=?',
            bcFlickityId: '@?',
        },
        link: linkFunction,
        controller: FlickityPreviousController,
        controllerAs: 'vm',
    };

    return directive;


    /**
     * Link
     */
    function linkFunction(
        $scope, $element, $attrs, $controller
    ) {
        'ngInject';

        // Bind the click up to the required controller
        $element.on('click', () => {
            FlickityService.previous($controller.flickityId, $controller.wrapAround);
        });

    }


    /**
     * Controller
     */
    function FlickityPreviousController() {
    }

}



