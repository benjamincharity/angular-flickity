import { NextController } from './next.controller';

export function FlickityNextDirective(
    $log, $timeout,
    FlickityConfig, FlickityService
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        scope: {},
        bindToController: {
            bcFlickityNext: '=?',
            bcFlickityId: '@?',
        },
        link: linkFunction,
        controller: NextController,
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

        $element.on('click', () => {

            // Move to the next cell
            FlickityService.next($controller.flickityId, $scope.bcFlickityNext).then(() => {

            });

        });

    }


}



