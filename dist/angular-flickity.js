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
	
	var _flickity2 = __webpack_require__(2);
	
	var _flickity3 = __webpack_require__(3);
	
	var _flickityNext = __webpack_require__(4);
	
	var _flickityPrevious = __webpack_require__(5);
	
	angular.module('bc.Flickity', []).provider('FlickityConfig', _flickity.FlickityConfigProvider).directive('bcFlickity', _flickity2.FlickityDirective).service('FlickityService', _flickity3.FlickityService).directive('bcFlickityNext', _flickityNext.FlickityNextDirective).directive('bcFlickityPrevious', _flickityPrevious.FlickityPreviousDirective);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FlickityConfigProvider = exports.FlickityConfigProvider = (function () {
	    function FlickityConfigProvider() {
	        _classCallCheck(this, FlickityConfigProvider);
	
	        // Define Flickity defaults
	        this.accessibility = true;
	        this.autoPlay = false;
	        this.cellAlign = 'center';
	        this.cellSelector = undefined;
	        this.contain = false;
	        this.draggable = true;
	        this.freeScroll = false;
	        this.freeScrollFriction = false;
	        this.selectedAttraction = .025;
	        this.friction = .28;
	        this.initialIndex = 0;
	        this.lazyLoad = true;
	        this.percentPosition = true;
	        this.prevNextButtons = true;
	        this.pageDots = true;
	        this.resize = true;
	        this.rightToLeft = false;
	        this.setGallerySize = true;
	        this.watchCSS = false;
	        this.wrapAround = false;
	        this.imagesLoaded = true;
	        this.asNavFor = true;
	    }
	
	    _createClass(FlickityConfigProvider, [{
	        key: '$get',
	        value: function $get() {
	            return this;
	        }
	    }]);
	
	    return FlickityConfigProvider;
	})();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	FlickityDirective.$inject = ["$timeout", "FlickityConfig", "FlickityService"];
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
	 * <div bc-flickity flickity-options="{{ vm.options }}">
	 *   <div>
	 *   <div>
	 *   ...
	 * </div>
	 *
	 */
	function FlickityDirective($timeout, FlickityConfig, FlickityService) {
	    'ngInject';
	
	    linkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickity: '@?'
	        },
	        link: linkFunction,
	        controller: FlickityController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Link
	     */
	    function linkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Initialize Flickity
	        // Using a timeout ensures that any ng-repeats can finish running before we initialize
	
	        $timeout(function () {
	            var flickityInstance = FlickityService.create($element[0], $controller.flickityId, $controller.options);
	
	            // Expose the Flickity instance and ID
	            $controller.Flickity = flickityInstance.instance;
	            $controller.flickityId = flickityInstance.id;
	        });
	
	        // Clean up when being destroyed
	        var onDestroy = $scope.$on('$destroy', function (event) {
	            FlickityService.destroy($controller.flickityId);
	        });
	    }
	
	    /**
	     * Controller
	     */
	    function FlickityController() {
	
	        // Extend the default options with user configuration
	        this.options = angular.extend({}, FlickityConfig, angular.fromJson(this.bcFlickity));
	    }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* global Flickity */
	
	var FlickityService = exports.FlickityService = (function () {
	    FlickityService.$inject = ["$timeout"];
	    function FlickityService($timeout) {
	        'ngInject';
	
	        _classCallCheck(this, FlickityService);
	
	        this.$timeout = $timeout;
	
	        this.instances = [];
	    }
	
	    /**
	     * Create a new Flickity instance
	     *
	     * @param {Element} element
	     * @param {String} id
	     * @param {Object} options
	     * @return {Element} element
	     */
	
	    _createClass(FlickityService, [{
	        key: 'create',
	        value: function create(element) {
	            var id = arguments.length <= 1 || arguments[1] === undefined ? this.instances.length + 1 : arguments[1];
	            var options = arguments[2];
	
	            // Define the new instance
	            var instance = {
	                id: id,
	                instance: new Flickity(element, options)
	            };
	
	            // Save this instance to the array
	            this.instances.push(instance);
	
	            return instance;
	        }
	
	        /**
	         * Destroy a Flickity instance
	         *
	         * @param {String} id
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy(id) {
	            var _this = this;
	
	            var pauseBeforeDestruction = 2000;
	            var flickityIndex = this._getFlickityIndex(id);
	
	            if (flickityIndex < 0) {
	                return false;
	            }
	
	            // Pause to allow other scope cleanup to occur
	            // NOTE: Without this pause, Flickity is being destroyed before the view containing the
	            // directive can leave view
	            this.$timeout(function () {
	
	                // Destroy the Flickity instance
	                _this.instances[flickityIndex].instance.destroy();
	
	                // Remove the instance from the array
	                _this.instances.splice(flickityIndex, 1);
	            }, pauseBeforeDestruction);
	        }
	
	        /**
	         * Move to the next slide
	         *
	         * @param {Bool} isWrapped
	         */
	
	    }, {
	        key: 'next',
	        value: function next(id, isWrapped) {
	            var flickityIndex = this._getFlickityIndex(id);
	
	            if (flickityIndex < 0) {
	                return false;
	            }
	
	            // Trigger the next slide
	            this.instances[flickityIndex].instance.next(isWrapped);
	        }
	
	        /**
	         * Move to the previous slide
	         *
	         * @param {Bool} isWrapped
	         */
	
	    }, {
	        key: 'previous',
	        value: function previous(id, isWrapped) {
	            var flickityIndex = this._getFlickityIndex(id);
	
	            if (flickityIndex < 0) {
	                return false;
	            }
	
	            // Trigger the next slide
	            this.instances[flickityIndex].instance.previous(isWrapped);
	        }
	
	        /**
	         * Select a slide
	         *
	         * @param {String} id
	         * @param {Number} index
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         */
	
	    }, {
	        key: 'select',
	        value: function select(id, index) {
	            var isWrapped = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var isInstant = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            if (flickityIndex < 0) {
	                return false;
	            }
	
	            // Trigger the next slide
	            this.instances[flickityIndex].instance.select(index, isWrapped, isInstant);
	        }
	
	        /**
	         * Get the current slide index
	         *
	         * @param {String} id
	         * @return {Number} index
	         */
	
	    }, {
	        key: 'getSelectedIndex',
	        value: function getSelectedIndex(id) {
	            var flickityIndex = this._getFlickityIndex(id);
	
	            if (flickityIndex < 0) {
	                return false;
	            }
	
	            // Return the current index
	            return this.instances[flickityIndex].instance.selectedIndex;
	        }
	
	        //
	        // Helper methods
	        //
	
	        /**
	         * Find the index for a Flickity instance
	         *
	         * @param {String} id
	         * @return {Number} flickityIndex
	         */
	
	    }, {
	        key: '_getFlickityIndex',
	        value: function _getFlickityIndex(id) {
	            var negativeIndexForUnfound = -1;
	
	            // If no instances exist, cancel
	            if (this.instances.length < 1) {
	
	                return negativeIndexForUnfound;
	            } else {
	
	                // Find the instance by ID
	                var index = this.instances.findIndex(matchesId);
	
	                if (index === false) {
	                    return negativeIndexForUnfound;
	                } else {
	                    return index;
	                }
	            }
	
	            // Test to match an item in an array based on the id
	            function matchesId(item, index, array) {
	                if (item.id === id) {
	                    return item;
	                }
	            }
	        }
	    }]);
	
	    return FlickityService;
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	FlickityNextDirective.$inject = ["FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityNextDirective = FlickityNextDirective;
	function FlickityNextDirective(FlickityService) {
	    'ngInject';
	
	    linkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
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
	    function linkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // If no boolean was passed in, set to a default
	
	        if (typeof $scope.bcFlickityNext !== 'boolean') {
	            $scope.bcFlickityNext = true;
	        }
	
	        // Trigger next() method
	        $element.on('click', function () {
	            FlickityService.next($controller.flickityId, $scope.bcFlickityNext);
	        });
	    }
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	FlickityPreviousDirective.$inject = ["FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityPreviousDirective = FlickityPreviousDirective;
	function FlickityPreviousDirective(FlickityService) {
	    'ngInject';
	
	    linkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
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
	    function linkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // If no boolean was passed in, set to a default
	
	        if (typeof $scope.bcFlickityPrevious !== 'boolean') {
	            $scope.bcFlickityPrevious = true;
	        }
	
	        // Bind the click up to the required controller
	        $element.on('click', function () {
	            FlickityService.previous($controller.flickityId, $scope.bcFlickityPrevious);
	        });
	    }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-flickity.js.map