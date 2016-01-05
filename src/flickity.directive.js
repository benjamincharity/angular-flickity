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
    $timeout,
    FlickityService
) {
    'ngInject';

    const directive = {
        restrict: 'A',
        scope: {},
        bindToController: {
            flickityId: '=?',
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
    function linkFunction($scope, $element, $attrs, $controller) {

        const defaultInitialIndex = 0;
        const defaultFriction = .2;
        const defaultCellAlign = 'center';

        // Define the option object using any user defined options while falling back to defaults
        const flickityOptions = {
            accessibility: angular.isDefined($controller.flickityAccessibility) ?
                $controller.flickityAccessibility : true,
            autoPlay: angular.isDefined($controller.flickityAutoPlay) ?
                $controller.flickityAutoPlay : false,
            cellAlign: angular.isDefined($controller.flickityCellAlign) ?
                $controller.flickityCellAlign : defaultCellAlign,
            cellSelector: angular.isDefined($controller.flickityCellSelector) ?
                $controller.flickityCellSelector : undefined,
            contain: angular.isDefined($controller.flickityContain) ?
                $controller.flickityContain : false,
            draggable: angular.isDefined($controller.flickityDraggable) ?
                $controller.flickityDraggable : true,
            freeScroll: angular.isDefined($controller.flickityFreeScroll) ?
                $controller.flickityFreeScroll : false,
            freeScrollFriction: angular.isDefined($controller.flickityFreeScrollFriction) ?
                $controller.flickityFreeScrollFriction : false,
            selectedAttraction: angular.isDefined($controller.flickitySelectedAttraction) ?
                $controller.flickitySelectedAttraction : true,
            friction: angular.isDefined($controller.flickityFriction) ?
                $controller.flickityFriction : defaultFriction,
            initialIndex: angular.isDefined($controller.flickityInitialIndex) ?
                $controller.flickityInitialIndex : defaultInitialIndex,
            lazyLoad: angular.isDefined($controller.flickityLazyLoad) ?
                $controller.flickityLazyLoad : true,
            percentPosition: angular.isDefined($controller.flickityPercentPosition) ?
                $controller.flickityPercentPosition : true,
            prevNextButtons: angular.isDefined($controller.flickityPrevNextButton) ?
                $controller.flickityPrevNextButton : true,
            pageDots: angular.isDefined($controller.flickityPageDots) ?
                $controller.flickityPageDots : true,
            resize: angular.isDefined($controller.flickityResize) ?
                $controller.flickityResize : true,
            rightToLeft: angular.isDefined($controller.flickityRightToLeft) ?
                $controller.flickityRightToLeft : false,
            setGallerySize: angular.isDefined($controller.flickitySetGallerySize) ?
                $controller.flickitySetGallerySize : true,
            watchCSS: angular.isDefined($controller.flickityWatchCss) ?
                $controller.flickityWatchCss : false,
            wrapAround: angular.isDefined($controller.flickityWrapAround) ?
                $controller.flickityWrapAround : false,
            imagesLoaded: angular.isDefined($controller.flickityImagesLoaded) ?
                $controller.flickityImagesLoaded : true,
            asNavFor: angular.isDefined($controller.flickityAsNavFor) ?
                $controller.flickityAsNavFor : true,
        };

        if (angular.isDefined($controller.flickityArrowShape)) {
            flickityOptions.arrowShape = $controller.flickityArrowShape;
        }


        // Initialize Flickity
        // Using a timeout ensures that any ng-repeats can finish running before we initialize
        $timeout(() => {
            const flickityInstance = FlickityService.create($element[0], $controller.flickityId, flickityOptions);

            // Expose the Flickity instance and ID
            $controller.Flickity = flickityInstance.instance;
            $controller.flickityId = flickityInstance.id;
        });

    }


    /**
     * Controller
     */
    function FlickityController() {




    }


}


