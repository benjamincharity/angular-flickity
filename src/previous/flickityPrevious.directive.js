import { PreviousController } from './previous.controller';

export function FlickityPreviousDirective(
    $log, $timeout, $rootScope,
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
        compile: () => {
            return {
                pre: preLinkFunction,
            };
        },
        controller: PreviousController,
        controllerAs: 'vm',
    };

    return directive;


    /**
     * Pre Link
     */
    function preLinkFunction(
        $scope, $element, $attrs, $controller
    ) {
        'ngInject';

        // Get the ID
        const ID = $controller.flickityId;

        // Define the broadcast names to listen for
        const selectEvent = `Flickity:${ID}:cellSelect`;
        const settleEvent = `Flickity:${ID}:settle`;

        // Listen
        const cellSelect = $rootScope.$on(selectEvent, (event, data) => {
            _disableButtonIfNeeded(data.instance.selectedIndex);
        });
        const settle = $rootScope.$on(settleEvent, (event, data) => {
            _disableButtonIfNeeded(data.instance.selectedIndex);
        });


        $element.on('click', () => {

            // Move to the next cell
            FlickityService.previous($controller.flickityId, $controller.wrapAround)
                .then((instance) => {
                    _disableButtonIfNeeded(instance.instance.selectedIndex);
                })
            ;

        });




        /**
         * Disable button if needed
         *
         * @param {number} index
         */
        function _disableButtonIfNeeded(index) {
            // Disable button if at the beginning and we shouldn't wrap
            if (!$controller.wrapAround && index === 0) {
                $attrs.$set('disabled', 'disabled');
            } else {
                $attrs.$set('disabled', false);
            }
        }

    }


}

