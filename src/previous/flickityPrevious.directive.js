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

        // Assign or fall back to default
        this.wrapAround = this.bcFlickityPrevious || FlickityConfig.wrapAround;

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



