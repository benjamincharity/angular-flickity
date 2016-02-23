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
        controller: FlickityNextController,
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

        // Trigger next() method
        $element.on('click', () => {
            FlickityService.next($controller.flickityId, $scope.bcFlickityNext);
        });

    }


    /**
     * Controller
     */
    function FlickityNextController() {

        // Assign or fall back to default
        this.wrapAround = this.bcFlickityNext || FlickityConfig.wrapAround;

        if (this.bcFlickityId) {
            this.flickityId = this.bcFlickityId;
        } else {
            $timeout(() => {
                FlickityService.getFirst()
                    .then((instance) => {
                        this.flickityId = instance.id;
                    })
                    .catch((error) => {
                        $log.warn(error);
                    })
                ;
            });
        }
    }

}



