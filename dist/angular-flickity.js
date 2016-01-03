(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("angular-flickity", [], factory);
	else if(typeof exports === 'object')
		exports["angular-flickity"] = factory();
	else
		root["angular-flickity"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _flickity = __webpack_require__(1);
	
	var _flickityNext = __webpack_require__(2);
	
	var _flickityPrevious = __webpack_require__(3);
	
	angular.module('bc.Flickity', []).directive('bcFlickity', _flickity.FlickityDirective).directive('bcFlickityNext', _flickityNext.FlickityNextDirective).directive('bcFlickityPrevious', _flickityPrevious.FlickityPreviousDirective);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityDirective = FlickityDirective;
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
	function FlickityDirective($timeout) {
	    'ngInject';
	
	    var directive = {
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
	            flickityFreeScrollFriction: '=?'
	        },
	        link: linkFunction,
	        controller: FlickityController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Link
	     */
	    function linkFunction($scope, $element, $attrs, vm) {
	
	        var defaultInitialIndex = 0;
	        var defaultFriction = .2;
	        var defaultCellAlign = 'center';
	
	        // Define the option object using any user defined options while falling back to defaults
	        var flickityOptions = {
	            accessibility: angular.isDefined(vm.flickityAccessibility) ? vm.flickityAccessibility : true,
	            autoPlay: angular.isDefined(vm.flickityAutoPlay) ? vm.flickityAutoPlay : false,
	            cellAlign: angular.isDefined(vm.flickityCellAlign) ? vm.flickityCellAlign : defaultCellAlign,
	            cellSelector: angular.isDefined(vm.flickityCellSelector) ? vm.flickityCellSelector : undefined,
	            contain: angular.isDefined(vm.flickityContain) ? vm.flickityContain : false,
	            draggable: angular.isDefined(vm.flickityDraggable) ? vm.flickityDraggable : true,
	            freeScroll: angular.isDefined(vm.flickityFreeScroll) ? vm.flickityFreeScroll : false,
	            freeScrollFriction: angular.isDefined(vm.flickityFreeScrollFriction) ? vm.flickityFreeScrollFriction : false,
	            selectedAttraction: angular.isDefined(vm.flickitySelectedAttraction) ? vm.flickitySelectedAttraction : true,
	            friction: angular.isDefined(vm.flickityFriction) ? vm.flickityFriction : defaultFriction,
	            initialIndex: angular.isDefined(vm.flickityInitialIndex) ? vm.flickityInitialIndex : defaultInitialIndex,
	            lazyLoad: angular.isDefined(vm.flickityLazyLoad) ? vm.flickityLazyLoad : true,
	            percentPosition: angular.isDefined(vm.flickityPercentPosition) ? vm.flickityPercentPosition : true,
	            prevNextButtons: angular.isDefined(vm.flickityPrevNextButton) ? vm.flickityPrevNextButton : true,
	            pageDots: angular.isDefined(vm.flickityPageDots) ? vm.flickityPageDots : true,
	            resize: angular.isDefined(vm.flickityResize) ? vm.flickityResize : true,
	            rightToLeft: angular.isDefined(vm.flickityRightToLeft) ? vm.flickityRightToLeft : false,
	            setGallerySize: angular.isDefined(vm.flickitySetGallerySize) ? vm.flickitySetGallerySize : true,
	            watchCSS: angular.isDefined(vm.flickityWatchCss) ? vm.flickityWatchCss : false,
	            wrapAround: angular.isDefined(vm.flickityWrapAround) ? vm.flickityWrapAround : false,
	            imagesLoaded: angular.isDefined(vm.flickityImagesLoaded) ? vm.flickityImagesLoaded : true,
	            asNavFor: angular.isDefined(vm.flickityAsNavFor) ? vm.flickityAsNavFor : true
	        };
	
	        if (angular.isDefined(vm.flickityArrowShape)) {
	            flickityOptions.arrowShape = vm.flickityArrowShape;
	        }
	
	        // Initialize Flickity
	        $timeout(function () {
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
	         * Move to the previous slide
	         */
	        function previous(isWrapped) {
	            this.Flickity.previous(isWrapped);
	        }
	    }
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityNextDirective = FlickityNextDirective;
	function FlickityNextDirective() {
	    'ngInject';
	
	    var directive = {
	        restrict: 'A',
	        require: '^bcFlickity',
	        scope: {
	            bcFlickityNext: '=?'
	        },
	        link: linkFunction
	    };
	
	    return directive;
	
	    /**
	     * Link
	     */
	    function linkFunction($scope, $element, $attrs, $ctrl) {
	
	        // If no boolean was passed in, set to a default
	        if (typeof $scope.bcFlickityNext !== 'boolean') {
	            $scope.bcFlickityNext = true;
	        }
	
	        // Bind the click up to the required controller
	        $element.on('click', function () {
	            $ctrl.next($scope.bcFlickityNext);
	        });
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityPreviousDirective = FlickityPreviousDirective;
	function FlickityPreviousDirective() {
	    'ngInject';
	
	    var directive = {
	        restrict: 'A',
	        require: '^bcFlickity',
	        scope: {
	            bcFlickityPrevious: '=?'
	        },
	        link: linkFunction
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
	        $element.on('click', function () {
	            $ctrl.previous($scope.bcFlickityPrevious);
	        });
	    }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-flickity.js.map