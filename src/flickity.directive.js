/* global Flickity */

/**
 * Flickity.js
 * http://flickity.metafizzy.co/options.html
 *
 * Required markup
 *
 * <div bc-flickity flickity-draggable="true" ...>
 *   <div>
 *   <div>
 *   ...
 * </div>
 *
 */
export function FlickityDirective(
    $timeout
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        scope: {},
        bindToController: {
            flickityAccessibility: '=?',
            flickityAutoPlay: '=?',
            flickityCellAlign: '=?',
            flickityCellSelector: '=?',
            flickityContain: '=?',
            flickityDraggable: '=?',
            flickityFreeScroll: '=?',
            flickityFriction: '=?',
            flickityInitialIndex: '=?',
            flickityLazyLoad: '=?',
            flickityPercentPosition: '=?',
            flickityPrevNextButton: '=?',
            flickityArrowShape: '=?',
            flickityPageDots: '=?',
            flickityResize: '=?',
            flickityRightToLeft: '=?',
            flickitySetGallerySize: '=?',
            flickityWatchCss: '=?',
            flickityWrapAround: '=?',
            flickityImagesLoaded: '=?',
            flickityAsNavFor: '=?',
            flickitySelectedAttraction: '=?',
            flickityFreeScrollFriction: '=?',
        },
        link: linkFunction,
        controller: FlickityController,
        controllerAs: 'vm',
    };

    return directive;


    /**
     * Link
     */
    function linkFunction($scope, $element, $attrs, vm) {

        const defaultInitialIndex = 0;
        const defaultFriction = .2;
        const defaultCellAlign = 'center';

        // Define the option object using any user defined options while falling back to defaults
        const flickityOptions = {
            accessibility: angular.isDefined(vm.flickityAccessibility) ?
                vm.flickityAccessibility : true,
            autoPlay: angular.isDefined(vm.flickityAutoPlay) ?
                vm.flickityAutoPlay : false,
            cellAlign: angular.isDefined(vm.flickityCellAlign) ?
                vm.flickityCellAlign : defaultCellAlign,
            cellSelector: angular.isDefined(vm.flickityCellSelector) ?
                vm.flickityCellSelector : undefined,
            contain: angular.isDefined(vm.flickityContain) ?
                vm.flickityContain : false,
            draggable: angular.isDefined(vm.flickityDraggable) ?
                vm.flickityDraggable : true,
            freeScroll: angular.isDefined(vm.flickityFreeScroll) ?
                vm.flickityFreeScroll : false,
            freeScrollFriction: angular.isDefined(vm.flickityFreeScrollFriction) ?
                vm.flickityFreeScrollFriction : false,
            selectedAttraction: angular.isDefined(vm.flickitySelectedAttraction) ?
                vm.flickitySelectedAttraction : true,
            friction: angular.isDefined(vm.flickityFriction) ?
                vm.flickityFriction : defaultFriction,
            initialIndex: angular.isDefined(vm.flickityInitialIndex) ?
                vm.flickityInitialIndex : defaultInitialIndex,
            lazyLoad: angular.isDefined(vm.flickityLazyLoad) ?
                vm.flickityLazyLoad : true,
            percentPosition: angular.isDefined(vm.flickityPercentPosition) ?
                vm.flickityPercentPosition : true,
            prevNextButtons: angular.isDefined(vm.flickityPrevNextButton) ?
                vm.flickityPrevNextButton : true,
            pageDots: angular.isDefined(vm.flickityPageDots) ?
                vm.flickityPageDots : true,
            resize: angular.isDefined(vm.flickityResize) ?
                vm.flickityResize : true,
            rightToLeft: angular.isDefined(vm.flickityRightToLeft) ?
                vm.flickityRightToLeft : false,
            setGallerySize: angular.isDefined(vm.flickitySetGallerySize) ?
                vm.flickitySetGallerySize : true,
            watchCSS: angular.isDefined(vm.flickityWatchCss) ?
                vm.flickityWatchCss : false,
            wrapAround: angular.isDefined(vm.flickityWrapAround) ?
                vm.flickityWrapAround : false,
            imagesLoaded: angular.isDefined(vm.flickityImagesLoaded) ?
                vm.flickityImagesLoaded : true,
            asNavFor: angular.isDefined(vm.flickityAsNavFor) ?
                vm.flickityAsNavFor : true,
        };

        if (angular.isDefined(vm.flickityArrowShape)) {
            flickityOptions.arrowShape = vm.flickityArrowShape;
        }


        // Initialize Flickity
        $timeout(() => {
            vm.Flickity = new Flickity($element[0], flickityOptions);
        });

    }


    /**
     * Controller
     */
    function FlickityController() {

        this.next = next;
        this.previous = previous;




        /**
         * Move to the next slide
         */
        function next(isWrapped) {
            this.Flickity.next(isWrapped);
        }


        /**
         * Move to the next slide
         */
        function previous(isWrapped) {
            this.Flickity.previous(isWrapped);
        }

    }

}


