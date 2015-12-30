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
	
	angular.module('bc.Flickity', []).directive('bcFlickity', _flickity.FlickityDirective);

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
	        scope: {
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
	        link: linkFunction
	    };
	
	    return directive;
	
	    /**
	     * Link
	     */
	    function linkFunction($scope, $element) {
	
	        var defaultInitialIndex = 0;
	        var defaultFriction = .2;
	        var defaultCellAlign = 'center';
	
	        // Define the option object using any user defined options while falling back to defaults
	        var flickityOptions = {
	            accessibility: angular.isDefined($scope.flickityAccessibility) ? $scope.flickityAccessibility : true,
	            autoPlay: angular.isDefined($scope.flickityAutoPlay) ? $scope.flickityAutoPlay : false,
	            cellAlign: angular.isDefined($scope.flickityCellAlign) ? $scope.flickityCellAlign : defaultCellAlign,
	            cellSelector: angular.isDefined($scope.flickityCellSelector) ? $scope.flickityCellSelector : undefined,
	            contain: angular.isDefined($scope.flickityContain) ? $scope.flickityContain : false,
	            draggable: angular.isDefined($scope.flickityDraggable) ? $scope.flickityDraggable : true,
	            freeScroll: angular.isDefined($scope.flickityFreeScroll) ? $scope.flickityFreeScroll : false,
	            freeScrollFriction: angular.isDefined($scope.flickityFreeScrollFriction) ? $scope.flickityFreeScrollFriction : false,
	            selectedAttraction: angular.isDefined($scope.flickitySelectedAttraction) ? $scope.flickitySelectedAttraction : true,
	            friction: angular.isDefined($scope.flickityFriction) ? $scope.flickityFriction : defaultFriction,
	            initialIndex: angular.isDefined($scope.flickityInitialIndex) ? $scope.flickityInitialIndex : defaultInitialIndex,
	            lazyLoad: angular.isDefined($scope.flickityLazyLoad) ? $scope.flickityLazyLoad : true,
	            percentPosition: angular.isDefined($scope.flickityPercentPosition) ? $scope.flickityPercentPosition : true,
	            prevNextButtons: angular.isDefined($scope.flickityPrevNextButton) ? $scope.flickityPrevNextButton : true,
	            pageDots: angular.isDefined($scope.flickityPageDots) ? $scope.flickityPageDots : true,
	            resize: angular.isDefined($scope.flickityResize) ? $scope.flickityResize : true,
	            rightToLeft: angular.isDefined($scope.flickityRightToLeft) ? $scope.flickityRightToLeft : false,
	            setGallerySize: angular.isDefined($scope.flickitySetGallerySize) ? $scope.flickitySetGallerySize : true,
	            watchCSS: angular.isDefined($scope.flickityWatchCss) ? $scope.flickityWatchCss : false,
	            wrapAround: angular.isDefined($scope.flickityWrapAround) ? $scope.flickityWrapAround : false,
	            imagesLoaded: angular.isDefined($scope.flickityImagesLoaded) ? $scope.flickityImagesLoaded : true,
	            asNavFor: angular.isDefined($scope.flickityAsNavFor) ? $scope.flickityAsNavFor : true
	        };
	
	        if (angular.isDefined($scope.flickityArrowShape)) {
	            flickityOptions.arrowShape = $scope.flickityArrowShape;
	        }
	
	        // Initialize Flickity
	        $timeout(function () {
	            new Flickity($element[0], flickityOptions);
	        });
	    }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-flickity.js.map