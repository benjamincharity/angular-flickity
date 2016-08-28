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
	
	var _flickity3 = __webpack_require__(21);
	
	var _flickityNext = __webpack_require__(23);
	
	var _flickityPrevious = __webpack_require__(25);
	
	angular.module('bc.Flickity', []).provider('FlickityConfig', _flickity.FlickityConfigProvider).service('FlickityService', _flickity2.FlickityService).directive('bcFlickity', _flickity3.FlickityDirective).directive('bcFlickityNext', _flickityNext.FlickityNextDirective).directive('bcFlickityPrevious', _flickityPrevious.FlickityPreviousDirective);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FlickityConfigProvider = exports.FlickityConfigProvider = function () {
	    function FlickityConfigProvider() {
	        _classCallCheck(this, FlickityConfigProvider);
	
	        // Define Flickity defaults
	        this.accessibility = true;
	        this.adaptiveHeight = false;
	        this.autoPlay = false;
	        this.cellAlign = 'center';
	        this.cellSelector = undefined;
	        this.contain = false;
	        this.draggable = true;
	        this.dragThreshold = 3;
	        this.freeScroll = false;
	        this.freeScrollFriction = false;
	        this.selectedAttraction = .025;
	        this.friction = .28;
	        this.groupCells = false;
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
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityService = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* global Flickity */
	var FlickityService = exports.FlickityService = function () {
	    FlickityService.$inject = ["$timeout", "$q", "$rootScope", "$log"];
	    function FlickityService($timeout, $q, $rootScope, $log) {
	        'ngInject';
	
	        _classCallCheck(this, FlickityService);
	
	        this.$timeout = $timeout;
	        this.$q = $q;
	        this.$rootScope = $rootScope;
	        this.$log = $log;
	
	        this.instances = [];
	    }
	
	    /**
	     * Create a new Flickity instance
	     *
	     * @param {Element} element
	     * @param {String} id
	     * @param {Object} options
	     * @return {Object} instance
	     */
	
	
	    _createClass(FlickityService, [{
	        key: 'create',
	        value: function create(element) {
	            var _this = this;
	
	            var id = arguments.length <= 1 || arguments[1] === undefined ? this.instances.length + 1 : arguments[1];
	            var options = arguments[2];
	
	
	            // Check to see if the ID is already in use
	            if (this._findObjectById(this.instances, id)) {
	                var index = this._getFlickityIndex(id);
	                this.$log.error('This ID is already in use: ', this.instances[index]);
	
	                return false;
	            }
	
	            // Define the new instance
	            var instance = {
	                id: id,
	                instance: new Flickity(element, options)
	            };
	
	            // Save this instance to the array
	            this.instances.push(instance);
	
	            return this.$q(function (resolve) {
	
	                // Bind to all events
	                _this._bindEvents(id).then(function () {
	                    resolve(instance);
	                });
	            });
	        }
	
	        /**
	         * Destroy a Flickity instance
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'destroy',
	        value: function destroy(id) {
	            var _this2 = this;
	
	            var pauseBeforeDestruction = 100;
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                }
	
	                // Pause to allow other scope cleanup to occur
	                // NOTE: Without this pause, Flickity is being destroyed before the view containing the
	                // directive can leave view
	                _this2.$timeout(function () {
	
	                    // Destroy the Flickity instance
	                    _this2.instances[flickityIndex].instance.destroy();
	
	                    // Remove the instance from the array
	                    _this2.instances.splice(flickityIndex, 1);
	
	                    resolve('Instance ' + id + ' destroyed.');
	                }, pauseBeforeDestruction);
	            });
	        }
	
	        /**
	         * Move to the next slide
	         *
	         * @param {string} id
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'next',
	        value: function next(id, isWrapped, isInstant) {
	            var _this3 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the next slide
	                    _this3.instances[flickityIndex].instance.next(isWrapped, isInstant);
	
	                    resolve(_this3.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Move to the previous slide
	         *
	         * @param {string} id
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'previous',
	        value: function previous(id, isWrapped, isInstant) {
	            var _this4 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the previous slide
	                    _this4.instances[flickityIndex].instance.previous(isWrapped, isInstant);
	
	                    resolve(_this4.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Select a slide
	         *
	         * @param {String} id
	         * @param {Integer} index
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'select',
	        value: function select(id, index) {
	            var _this5 = this;
	
	            var isWrapped = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var isInstant = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the selected slide
	                    _this5.instances[flickityIndex].instance.select(index, isWrapped, isInstant);
	
	                    resolve(_this5.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Select a slide of a cell
	         *
	         * @param {String} id
	         * @param {Integer|String} value
	         * @param {Bool} isWrapped
	         * @param {Bool} isInstant
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'selectCell',
	        value: function selectCell(id, value) {
	            var _this6 = this;
	
	            var isWrapped = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var isInstant = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the selected slide
	                    _this6.instances[flickityIndex].instance.selectCell(value, isWrapped, isInstant);
	
	                    resolve(_this6.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the current slide index
	         *
	         * @param {String} id
	         * @return {Integer} selectedIndex
	         */
	
	    }, {
	        key: 'selectedIndex',
	        value: function selectedIndex(id) {
	            var _this7 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Return the current index
	                    resolve(_this7.instances[flickityIndex].instance.selectedIndex);
	                }
	            });
	        }
	
	        /**
	         * Resize the gallery and re-position cells.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'resize',
	        value: function resize(id) {
	            var _this8 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Trigger the resize
	                    _this8.instances[flickityIndex].instance.resize();
	
	                    resolve(_this8.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Position cells at selected position.
	         * Trigger reposition after the size of a cell has been changed.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'reposition',
	        value: function reposition(id) {
	            var _this9 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Trigger the resize
	                    _this9.instances[flickityIndex].instance.reposition();
	
	                    resolve(_this9.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Re-collect all cell elements in `flickity-slider`.
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'reloadCells',
	        value: function reloadCells(id) {
	            var _this10 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Reload cells
	                    _this10.instances[flickityIndex].instance.reloadCells();
	
	                    resolve(_this10.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the Flickity instance
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'get',
	        value: function get(id) {
	            var _this11 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    resolve(_this11.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the first Flickity instance
	         *
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'getFirst',
	        value: function getFirst() {
	            var _this12 = this;
	
	            return this.$q(function (resolve, reject) {
	                if (!_this12.instances || _this12.instances.length < 1) {
	                    reject('No instances exist');
	                } else {
	                    resolve(_this12.instances[0]);
	                }
	            });
	        }
	
	        /**
	         * Get the Flickity instance
	         *
	         * @param {Element} element
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'getByElement',
	        value: function getByElement(element) {
	            return this.$q(function (resolve, reject) {
	                var instance = Flickity.data(element);
	
	                if (instance) {
	                    resolve(instance);
	                } else {
	                    reject('Instance not found for ' + element);
	                }
	            });
	        }
	
	        /**
	         * Prepend elements and create cells to the beginning of the gallery.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'prepend',
	        value: function prepend(id, elements) {
	            var _this13 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Prepend the slides
	                    _this13.instances[flickityIndex].instance.prepend(elements);
	
	                    resolve(_this13.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Append elements and create cells to the end of the gallery.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'append',
	        value: function append(id, elements) {
	            var _this14 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Append the slides
	                    _this14.instances[flickityIndex].instance.append(elements);
	
	                    resolve(_this14.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Insert elements into the gallery and create cells at the desired index.
	         *
	         * @param {String} id
	         * @param {*} element(s) - jQuery object, Array of Elements, Element, or NodeList
	         * @param {Integer} index - Zero based index
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'insert',
	        value: function insert(id, elements, index) {
	            var _this15 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    // Insert the slides
	                    _this15.instances[flickityIndex].instance.insert(elements, index);
	
	                    resolve(_this15.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the elements of the cells
	         *
	         * @param {String} id
	         * @return {Array} cellElements
	         */
	
	    }, {
	        key: 'getCellElements',
	        value: function getCellElements(id) {
	            var _this16 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    resolve(_this16.instances[flickityIndex].instance.getCellElements());
	                }
	            });
	        }
	
	        /**
	         * Get the elements of the cells
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove(id, elements) {
	            var _this17 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    _this17.instances[flickityIndex].instance.remove(elements);
	
	                    resolve(_this17.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get the currently selected cell element
	         *
	         * @param {String} id
	         * @return {Element} selectedCellElement
	         */
	
	    }, {
	        key: 'selectedElement',
	        value: function selectedElement(id) {
	            var _this18 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    resolve(_this18.instances[flickityIndex].instance.selectedElement);
	                }
	            });
	        }
	
	        /**
	         * Get an array of all cells
	         *
	         * @param {String} id
	         * @return {Array} cells
	         */
	
	    }, {
	        key: 'cells',
	        value: function cells(id) {
	            var _this19 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            return this.$q(function (resolve, reject) {
	                if (flickityIndex < 0) {
	                    reject('Instance ' + id + ' not found');
	                } else {
	                    resolve(_this19.instances[flickityIndex].instance.cells);
	                }
	            });
	        }
	
	        //
	        // Helper methods
	        //
	
	
	        /**
	         * Find the index for a Flickity instance
	         *
	         * @param {String} id
	         * @return {Integer} flickityIndex
	         */
	
	    }, {
	        key: '_getFlickityIndex',
	        value: function _getFlickityIndex(id) {
	            var foundIndex = void 0;
	
	            // If no instances exist
	            if (!this.instances.length) {
	
	                foundIndex = -1;
	            } else {
	                // if instances do exist
	
	                // Check the ID of each instance
	                this.instances.forEach(function (instance, index) {
	
	                    // If it matches our ID, set the index
	                    if (instance.id === id) {
	                        foundIndex = index;
	                    }
	                });
	            }
	
	            return foundIndex;
	        }
	    }, {
	        key: '_bindEvents',
	        value: function _bindEvents(id) {
	            var _this20 = this;
	
	            var flickityIndex = this._getFlickityIndex(id);
	
	            if (flickityIndex < 0) {
	                return false;
	            }
	
	            return this.$q(function (resolve) {
	                var ID = _this20.instances[flickityIndex].id;
	
	                _this20.instances[flickityIndex].instance.on('select', function () {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':select', _this20.instances[flickityIndex]);
	                });
	
	                _this20.instances[flickityIndex].instance.on('settle', function () {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':settle', _this20.instances[flickityIndex]);
	                });
	
	                _this20.instances[flickityIndex].instance.on('scroll', function (progress, positionX) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':scroll', {
	                        progress: progress,
	                        positionX: positionX
	                    });
	                });
	
	                _this20.instances[flickityIndex].instance.on('dragStart', function (event, pointer) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':dragStart', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this20.instances[flickityIndex].instance.on('dragMove', function (event, pointer, moveVector) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':dragMove', {
	                        event: event,
	                        pointer: pointer,
	                        moveVector: moveVector
	                    });
	                });
	
	                _this20.instances[flickityIndex].instance.on('dragEnd', function (event, pointer) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':dragEnd', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this20.instances[flickityIndex].instance.on('pointerDown', function (event, pointer) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':pointerDown', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this20.instances[flickityIndex].instance.on('pointerMove', function (event, pointer, moveVector) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':pointerMove', {
	                        event: event,
	                        pointer: pointer,
	                        moveVector: moveVector
	                    });
	                });
	
	                _this20.instances[flickityIndex].instance.on('pointerUp', function (event, pointer) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':pointerUp', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this20.instances[flickityIndex].instance.on('staticClick', function (event, pointer, cellElement, cellIndex) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':staticClick', {
	                        event: event,
	                        pointer: pointer,
	                        cellElement: cellElement,
	                        cellIndex: cellIndex
	                    });
	                });
	
	                _this20.instances[flickityIndex].instance.on('lazyLoad', function (event, cellElement) {
	                    _this20.$rootScope.$emit('Flickity:' + ID + ':lazyLoad', {
	                        event: event,
	                        cellElement: cellElement
	                    });
	                });
	
	                resolve(true);
	            });
	        }
	
	        /**
	         * Find an object within an array by ID
	         *
	         * @param {Array} source
	         * @param {String} id
	         * @return {Object} match
	         */
	
	    }, {
	        key: '_findObjectById',
	        value: function _findObjectById(source, id) {
	            return source.filter(function (object) {
	                return object.id === id;
	            })[0];
	        }
	    }]);
	
	    return FlickityService;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Flickity v2.0.3
	 * Touch, responsive, flickable carousels
	 *
	 * Licensed GPLv3 for open source use
	 * or Flickity Commercial License for commercial use
	 *
	 * http://flickity.metafizzy.co
	 * Copyright 2016 Metafizzy
	 */
	
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(4),
	      __webpack_require__(12),
	      __webpack_require__(15),
	      __webpack_require__(17),
	      __webpack_require__(18),
	      __webpack_require__(19),
	      __webpack_require__(20)
	    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      require('./flickity'),
	      require('./drag'),
	      require('./prev-next-button'),
	      require('./page-dots'),
	      require('./player'),
	      require('./add-remove-cell'),
	      require('./lazyload')
	    );
	  }
	
	})( window, function factory( Flickity ) {
	  /*jshint strict: false*/
	  return Flickity;
	});


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Flickity main
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(5),
	      __webpack_require__(6),
	      __webpack_require__(7),
	      __webpack_require__(9),
	      __webpack_require__(10),
	      __webpack_require__(11)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
	      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('ev-emitter'),
	      require('get-size'),
	      require('fizzy-ui-utils'),
	      require('./cell'),
	      require('./slide'),
	      require('./animate')
	    );
	  } else {
	    // browser global
	    var _Flickity = window.Flickity;
	
	    window.Flickity = factory(
	      window,
	      window.EvEmitter,
	      window.getSize,
	      window.fizzyUIUtils,
	      _Flickity.Cell,
	      _Flickity.Slide,
	      _Flickity.animatePrototype
	    );
	  }
	
	}( window, function factory( window, EvEmitter, getSize,
	  utils, Cell, Slide, animatePrototype ) {
	
	'use strict';
	
	// vars
	var jQuery = window.jQuery;
	var getComputedStyle = window.getComputedStyle;
	var console = window.console;
	
	function moveElements( elems, toElem ) {
	  elems = utils.makeArray( elems );
	  while ( elems.length ) {
	    toElem.appendChild( elems.shift() );
	  }
	}
	
	// -------------------------- Flickity -------------------------- //
	
	// globally unique identifiers
	var GUID = 0;
	// internal store of all Flickity intances
	var instances = {};
	
	function Flickity( element, options ) {
	  var queryElement = utils.getQueryElement( element );
	  if ( !queryElement ) {
	    if ( console ) {
	      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
	    }
	    return;
	  }
	  this.element = queryElement;
	  // do not initialize twice on same element
	  if ( this.element.flickityGUID ) {
	    var instance = instances[ this.element.flickityGUID ];
	    instance.option( options );
	    return instance;
	  }
	
	  // add jQuery
	  if ( jQuery ) {
	    this.$element = jQuery( this.element );
	  }
	  // options
	  this.options = utils.extend( {}, this.constructor.defaults );
	  this.option( options );
	
	  // kick things off
	  this._create();
	}
	
	Flickity.defaults = {
	  accessibility: true,
	  // adaptiveHeight: false,
	  cellAlign: 'center',
	  // cellSelector: undefined,
	  // contain: false,
	  freeScrollFriction: 0.075, // friction when free-scrolling
	  friction: 0.28, // friction when selecting
	  namespaceJQueryEvents: true,
	  // initialIndex: 0,
	  percentPosition: true,
	  resize: true,
	  selectedAttraction: 0.025,
	  setGallerySize: true
	  // watchCSS: false,
	  // wrapAround: false
	};
	
	// hash of methods triggered on _create()
	Flickity.createMethods = [];
	
	var proto = Flickity.prototype;
	// inherit EventEmitter
	utils.extend( proto, EvEmitter.prototype );
	
	proto._create = function() {
	  // add id for Flickity.data
	  var id = this.guid = ++GUID;
	  this.element.flickityGUID = id; // expando
	  instances[ id ] = this; // associate via id
	  // initial properties
	  this.selectedIndex = 0;
	  // how many frames slider has been in same position
	  this.restingFrames = 0;
	  // initial physics properties
	  this.x = 0;
	  this.velocity = 0;
	  this.originSide = this.options.rightToLeft ? 'right' : 'left';
	  // create viewport & slider
	  this.viewport = document.createElement('div');
	  this.viewport.className = 'flickity-viewport';
	  this._createSlider();
	
	  if ( this.options.resize || this.options.watchCSS ) {
	    window.addEventListener( 'resize', this );
	  }
	
	  Flickity.createMethods.forEach( function( method ) {
	    this[ method ]();
	  }, this );
	
	  if ( this.options.watchCSS ) {
	    this.watchCSS();
	  } else {
	    this.activate();
	  }
	
	};
	
	/**
	 * set options
	 * @param {Object} opts
	 */
	proto.option = function( opts ) {
	  utils.extend( this.options, opts );
	};
	
	proto.activate = function() {
	  if ( this.isActive ) {
	    return;
	  }
	  this.isActive = true;
	  this.element.classList.add('flickity-enabled');
	  if ( this.options.rightToLeft ) {
	    this.element.classList.add('flickity-rtl');
	  }
	
	  this.getSize();
	  // move initial cell elements so they can be loaded as cells
	  var cellElems = this._filterFindCellElements( this.element.children );
	  moveElements( cellElems, this.slider );
	  this.viewport.appendChild( this.slider );
	  this.element.appendChild( this.viewport );
	  // get cells from children
	  this.reloadCells();
	
	  if ( this.options.accessibility ) {
	    // allow element to focusable
	    this.element.tabIndex = 0;
	    // listen for key presses
	    this.element.addEventListener( 'keydown', this );
	  }
	
	  this.emitEvent('activate');
	
	  var index;
	  var initialIndex = this.options.initialIndex;
	  if ( this.isInitActivated ) {
	    index = this.selectedIndex;
	  } else if ( initialIndex !== undefined ) {
	    index = this.cells[ initialIndex ] ? initialIndex : 0;
	  } else {
	    index = 0;
	  }
	  // select instantly
	  this.select( index, false, true );
	  // flag for initial activation, for using initialIndex
	  this.isInitActivated = true;
	};
	
	// slider positions the cells
	proto._createSlider = function() {
	  // slider element does all the positioning
	  var slider = document.createElement('div');
	  slider.className = 'flickity-slider';
	  slider.style[ this.originSide ] = 0;
	  this.slider = slider;
	};
	
	proto._filterFindCellElements = function( elems ) {
	  return utils.filterFindElements( elems, this.options.cellSelector );
	};
	
	// goes through all children
	proto.reloadCells = function() {
	  // collection of item elements
	  this.cells = this._makeCells( this.slider.children );
	  this.positionCells();
	  this._getWrapShiftCells();
	  this.setGallerySize();
	};
	
	/**
	 * turn elements into Flickity.Cells
	 * @param {Array or NodeList or HTMLElement} elems
	 * @returns {Array} items - collection of new Flickity Cells
	 */
	proto._makeCells = function( elems ) {
	  var cellElems = this._filterFindCellElements( elems );
	
	  // create new Flickity for collection
	  var cells = cellElems.map( function( cellElem ) {
	    return new Cell( cellElem, this );
	  }, this );
	
	  return cells;
	};
	
	proto.getLastCell = function() {
	  return this.cells[ this.cells.length - 1 ];
	};
	
	proto.getLastSlide = function() {
	  return this.slides[ this.slides.length - 1 ];
	};
	
	// positions all cells
	proto.positionCells = function() {
	  // size all cells
	  this._sizeCells( this.cells );
	  // position all cells
	  this._positionCells( 0 );
	};
	
	/**
	 * position certain cells
	 * @param {Integer} index - which cell to start with
	 */
	proto._positionCells = function( index ) {
	  index = index || 0;
	  // also measure maxCellHeight
	  // start 0 if positioning all cells
	  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
	  var cellX = 0;
	  // get cellX
	  if ( index > 0 ) {
	    var startCell = this.cells[ index - 1 ];
	    cellX = startCell.x + startCell.size.outerWidth;
	  }
	  var len = this.cells.length;
	  for ( var i=index; i < len; i++ ) {
	    var cell = this.cells[i];
	    cell.setPosition( cellX );
	    cellX += cell.size.outerWidth;
	    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
	  }
	  // keep track of cellX for wrap-around
	  this.slideableWidth = cellX;
	  // slides
	  this.updateSlides();
	  // contain slides target
	  this._containSlides();
	  // update slidesWidth
	  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
	};
	
	/**
	 * cell.getSize() on multiple cells
	 * @param {Array} cells
	 */
	proto._sizeCells = function( cells ) {
	  cells.forEach( function( cell ) {
	    cell.getSize();
	  });
	};
	
	// --------------------------  -------------------------- //
	
	proto.updateSlides = function() {
	  this.slides = [];
	  if ( !this.cells.length ) {
	    return;
	  }
	
	  var slide = new Slide( this );
	  this.slides.push( slide );
	  var isOriginLeft = this.originSide == 'left';
	  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';
	
	  var canCellFit = this._getCanCellFit();
	
	  this.cells.forEach( function( cell, i ) {
	    // just add cell if first cell in slide
	    if ( !slide.cells.length ) {
	      slide.addCell( cell );
	      return;
	    }
	
	    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
	      ( cell.size.outerWidth - cell.size[ nextMargin ] );
	
	    if ( canCellFit.call( this, i, slideWidth ) ) {
	      slide.addCell( cell );
	    } else {
	      // doesn't fit, new slide
	      slide.updateTarget();
	
	      slide = new Slide( this );
	      this.slides.push( slide );
	      slide.addCell( cell );
	    }
	  }, this );
	  // last slide
	  slide.updateTarget();
	  // update .selectedSlide
	  this.updateSelectedSlide();
	};
	
	proto._getCanCellFit = function() {
	  var groupCells = this.options.groupCells;
	  if ( !groupCells ) {
	    return function() {
	      return false;
	    };
	  } else if ( typeof groupCells == 'number' ) {
	    // group by number. 3 -> [0,1,2], [3,4,5], ...
	    var number = parseInt( groupCells, 10 );
	    return function( i ) {
	      return ( i % number ) !== 0;
	    };
	  }
	  // default, group by width of slide
	  // parse '75%
	  var percentMatch = typeof groupCells == 'string' &&
	    groupCells.match(/^(\d+)%$/);
	  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
	  return function( i, slideWidth ) {
	    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
	  };
	};
	
	// alias _init for jQuery plugin .flickity()
	proto._init =
	proto.reposition = function() {
	  this.positionCells();
	  this.positionSliderAtSelected();
	};
	
	proto.getSize = function() {
	  this.size = getSize( this.element );
	  this.setCellAlign();
	  this.cursorPosition = this.size.innerWidth * this.cellAlign;
	};
	
	var cellAlignShorthands = {
	  // cell align, then based on origin side
	  center: {
	    left: 0.5,
	    right: 0.5
	  },
	  left: {
	    left: 0,
	    right: 1
	  },
	  right: {
	    right: 0,
	    left: 1
	  }
	};
	
	proto.setCellAlign = function() {
	  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
	  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
	};
	
	proto.setGallerySize = function() {
	  if ( this.options.setGallerySize ) {
	    var height = this.options.adaptiveHeight && this.selectedSlide ?
	      this.selectedSlide.height : this.maxCellHeight;
	    this.viewport.style.height = height + 'px';
	  }
	};
	
	proto._getWrapShiftCells = function() {
	  // only for wrap-around
	  if ( !this.options.wrapAround ) {
	    return;
	  }
	  // unshift previous cells
	  this._unshiftCells( this.beforeShiftCells );
	  this._unshiftCells( this.afterShiftCells );
	  // get before cells
	  // initial gap
	  var gapX = this.cursorPosition;
	  var cellIndex = this.cells.length - 1;
	  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
	  // get after cells
	  // ending gap between last cell and end of gallery viewport
	  gapX = this.size.innerWidth - this.cursorPosition;
	  // start cloning at first cell, working forwards
	  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
	};
	
	proto._getGapCells = function( gapX, cellIndex, increment ) {
	  // keep adding cells until the cover the initial gap
	  var cells = [];
	  while ( gapX > 0 ) {
	    var cell = this.cells[ cellIndex ];
	    if ( !cell ) {
	      break;
	    }
	    cells.push( cell );
	    cellIndex += increment;
	    gapX -= cell.size.outerWidth;
	  }
	  return cells;
	};
	
	// ----- contain ----- //
	
	// contain cell targets so no excess sliding
	proto._containSlides = function() {
	  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
	    return;
	  }
	  var isRightToLeft = this.options.rightToLeft;
	  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
	  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
	  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
	  // content is less than gallery size
	  var isContentSmaller = contentWidth < this.size.innerWidth;
	  // bounds
	  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
	  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
	  // contain each cell target
	  this.slides.forEach( function( slide ) {
	    if ( isContentSmaller ) {
	      // all cells fit inside gallery
	      slide.target = contentWidth * this.cellAlign;
	    } else {
	      // contain to bounds
	      slide.target = Math.max( slide.target, beginBound );
	      slide.target = Math.min( slide.target, endBound );
	    }
	  }, this );
	};
	
	// -----  ----- //
	
	/**
	 * emits events via eventEmitter and jQuery events
	 * @param {String} type - name of event
	 * @param {Event} event - original event
	 * @param {Array} args - extra arguments
	 */
	proto.dispatchEvent = function( type, event, args ) {
	  var emitArgs = event ? [ event ].concat( args ) : args;
	  this.emitEvent( type, emitArgs );
	
	  if ( jQuery && this.$element ) {
	    // default trigger with type if no event
	    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
	    var $event = type;
	    if ( event ) {
	      // create jQuery event
	      var jQEvent = jQuery.Event( event );
	      jQEvent.type = type;
	      $event = jQEvent;
	    }
	    this.$element.trigger( $event, args );
	  }
	};
	
	// -------------------------- select -------------------------- //
	
	/**
	 * @param {Integer} index - index of the slide
	 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
	 * @param {Boolean} isInstant - will immediately set position at selected cell
	 */
	proto.select = function( index, isWrap, isInstant ) {
	  if ( !this.isActive ) {
	    return;
	  }
	  index = parseInt( index, 10 );
	  this._wrapSelect( index );
	
	  if ( this.options.wrapAround || isWrap ) {
	    index = utils.modulo( index, this.slides.length );
	  }
	  // bail if invalid index
	  if ( !this.slides[ index ] ) {
	    return;
	  }
	  this.selectedIndex = index;
	  this.updateSelectedSlide();
	  if ( isInstant ) {
	    this.positionSliderAtSelected();
	  } else {
	    this.startAnimation();
	  }
	  if ( this.options.adaptiveHeight ) {
	    this.setGallerySize();
	  }
	
	  this.dispatchEvent('select');
	  // old v1 event name, remove in v3
	  this.dispatchEvent('cellSelect');
	};
	
	// wraps position for wrapAround, to move to closest slide. #113
	proto._wrapSelect = function( index ) {
	  var len = this.slides.length;
	  var isWrapping = this.options.wrapAround && len > 1;
	  if ( !isWrapping ) {
	    return index;
	  }
	  var wrapIndex = utils.modulo( index, len );
	  // go to shortest
	  var delta = Math.abs( wrapIndex - this.selectedIndex );
	  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
	  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
	  if ( !this.isDragSelect && backWrapDelta < delta ) {
	    index += len;
	  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
	    index -= len;
	  }
	  // wrap position so slider is within normal area
	  if ( index < 0 ) {
	    this.x -= this.slideableWidth;
	  } else if ( index >= len ) {
	    this.x += this.slideableWidth;
	  }
	};
	
	proto.previous = function( isWrap, isInstant ) {
	  this.select( this.selectedIndex - 1, isWrap, isInstant );
	};
	
	proto.next = function( isWrap, isInstant ) {
	  this.select( this.selectedIndex + 1, isWrap, isInstant );
	};
	
	proto.updateSelectedSlide = function() {
	  var slide = this.slides[ this.selectedIndex ];
	  // selectedIndex could be outside of slides, if triggered before resize()
	  if ( !slide ) {
	    return;
	  }
	  // unselect previous selected slide
	  this.unselectSelectedSlide();
	  // update new selected slide
	  this.selectedSlide = slide;
	  slide.select();
	  this.selectedCells = slide.cells;
	  this.selectedElements = slide.getCellElements();
	  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
	  // Remove in v3?
	  this.selectedCell = slide.cells[0];
	  this.selectedElement = this.selectedElements[0];
	};
	
	proto.unselectSelectedSlide = function() {
	  if ( this.selectedSlide ) {
	    this.selectedSlide.unselect();
	  }
	};
	
	/**
	 * select slide from number or cell element
	 * @param {Element or Number} elem
	 */
	proto.selectCell = function( value, isWrap, isInstant ) {
	  // get cell
	  var cell;
	  if ( typeof value == 'number' ) {
	    cell = this.cells[ value ];
	  } else {
	    // use string as selector
	    if ( typeof value == 'string' ) {
	      value = this.element.querySelector( value );
	    }
	    // get cell from element
	    cell = this.getCell( value );
	  }
	  // select slide that has cell
	  for ( var i=0; cell && i < this.slides.length; i++ ) {
	    var slide = this.slides[i];
	    var index = slide.cells.indexOf( cell );
	    if ( index != -1 ) {
	      this.select( i, isWrap, isInstant );
	      return;
	    }
	  }
	};
	
	// -------------------------- get cells -------------------------- //
	
	/**
	 * get Flickity.Cell, given an Element
	 * @param {Element} elem
	 * @returns {Flickity.Cell} item
	 */
	proto.getCell = function( elem ) {
	  // loop through cells to get the one that matches
	  for ( var i=0; i < this.cells.length; i++ ) {
	    var cell = this.cells[i];
	    if ( cell.element == elem ) {
	      return cell;
	    }
	  }
	};
	
	/**
	 * get collection of Flickity.Cells, given Elements
	 * @param {Element, Array, NodeList} elems
	 * @returns {Array} cells - Flickity.Cells
	 */
	proto.getCells = function( elems ) {
	  elems = utils.makeArray( elems );
	  var cells = [];
	  elems.forEach( function( elem ) {
	    var cell = this.getCell( elem );
	    if ( cell ) {
	      cells.push( cell );
	    }
	  }, this );
	  return cells;
	};
	
	/**
	 * get cell elements
	 * @returns {Array} cellElems
	 */
	proto.getCellElements = function() {
	  return this.cells.map( function( cell ) {
	    return cell.element;
	  });
	};
	
	/**
	 * get parent cell from an element
	 * @param {Element} elem
	 * @returns {Flickit.Cell} cell
	 */
	proto.getParentCell = function( elem ) {
	  // first check if elem is cell
	  var cell = this.getCell( elem );
	  if ( cell ) {
	    return cell;
	  }
	  // try to get parent cell elem
	  elem = utils.getParent( elem, '.flickity-slider > *' );
	  return this.getCell( elem );
	};
	
	/**
	 * get cells adjacent to a slide
	 * @param {Integer} adjCount - number of adjacent slides
	 * @param {Integer} index - index of slide to start
	 * @returns {Array} cells - array of Flickity.Cells
	 */
	proto.getAdjacentCellElements = function( adjCount, index ) {
	  if ( !adjCount ) {
	    return this.selectedSlide.getCellElements();
	  }
	  index = index === undefined ? this.selectedIndex : index;
	
	  var len = this.slides.length;
	  if ( 1 + ( adjCount * 2 ) >= len ) {
	    return this.getCellElements();
	  }
	
	  var cellElems = [];
	  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
	    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
	    var slide = this.slides[ slideIndex ];
	    if ( slide ) {
	      cellElems = cellElems.concat( slide.getCellElements() );
	    }
	  }
	  return cellElems;
	};
	
	// -------------------------- events -------------------------- //
	
	proto.uiChange = function() {
	  this.emitEvent('uiChange');
	};
	
	proto.childUIPointerDown = function( event ) {
	  this.emitEvent( 'childUIPointerDown', [ event ] );
	};
	
	// ----- resize ----- //
	
	proto.onresize = function() {
	  this.watchCSS();
	  this.resize();
	};
	
	utils.debounceMethod( Flickity, 'onresize', 150 );
	
	proto.resize = function() {
	  if ( !this.isActive ) {
	    return;
	  }
	  this.getSize();
	  // wrap values
	  if ( this.options.wrapAround ) {
	    this.x = utils.modulo( this.x, this.slideableWidth );
	  }
	  this.positionCells();
	  this._getWrapShiftCells();
	  this.setGallerySize();
	  this.emitEvent('resize');
	  // update selected index for group slides, instant
	  // TODO: position can be lost between groups of various numbers
	  var selectedElement = this.selectedElements && this.selectedElements[0];
	  this.selectCell( selectedElement, false, true );
	};
	
	// watches the :after property, activates/deactivates
	proto.watchCSS = function() {
	  var watchOption = this.options.watchCSS;
	  if ( !watchOption ) {
	    return;
	  }
	
	  var afterContent = getComputedStyle( this.element, ':after' ).content;
	  // activate if :after { content: 'flickity' }
	  if ( afterContent.indexOf('flickity') != -1 ) {
	    this.activate();
	  } else {
	    this.deactivate();
	  }
	};
	
	// ----- keydown ----- //
	
	// go previous/next if left/right keys pressed
	proto.onkeydown = function( event ) {
	  // only work if element is in focus
	  if ( !this.options.accessibility ||
	    ( document.activeElement && document.activeElement != this.element ) ) {
	    return;
	  }
	
	  if ( event.keyCode == 37 ) {
	    // go left
	    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
	    this.uiChange();
	    this[ leftMethod ]();
	  } else if ( event.keyCode == 39 ) {
	    // go right
	    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
	    this.uiChange();
	    this[ rightMethod ]();
	  }
	};
	
	// -------------------------- destroy -------------------------- //
	
	// deactivate all Flickity functionality, but keep stuff available
	proto.deactivate = function() {
	  if ( !this.isActive ) {
	    return;
	  }
	  this.element.classList.remove('flickity-enabled');
	  this.element.classList.remove('flickity-rtl');
	  // destroy cells
	  this.cells.forEach( function( cell ) {
	    cell.destroy();
	  });
	  this.unselectSelectedSlide();
	  this.element.removeChild( this.viewport );
	  // move child elements back into element
	  moveElements( this.slider.children, this.element );
	  if ( this.options.accessibility ) {
	    this.element.removeAttribute('tabIndex');
	    this.element.removeEventListener( 'keydown', this );
	  }
	  // set flags
	  this.isActive = false;
	  this.emitEvent('deactivate');
	};
	
	proto.destroy = function() {
	  this.deactivate();
	  window.removeEventListener( 'resize', this );
	  this.emitEvent('destroy');
	  if ( jQuery && this.$element ) {
	    jQuery.removeData( this.element, 'flickity' );
	  }
	  delete this.element.flickityGUID;
	  delete instances[ this.guid ];
	};
	
	// -------------------------- prototype -------------------------- //
	
	utils.extend( proto, animatePrototype );
	
	// -------------------------- extras -------------------------- //
	
	/**
	 * get Flickity instance from element
	 * @param {Element} elem
	 * @returns {Flickity}
	 */
	Flickity.data = function( elem ) {
	  elem = utils.getQueryElement( elem );
	  var id = elem && elem.flickityGUID;
	  return id && instances[ id ];
	};
	
	utils.htmlInit( Flickity, 'flickity' );
	
	if ( jQuery && jQuery.bridget ) {
	  jQuery.bridget( 'flickity', Flickity );
	}
	
	Flickity.Cell = Cell;
	
	return Flickity;
	
	}));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * EvEmitter v1.0.3
	 * Lil' event emitter
	 * MIT License
	 */
	
	/* jshint unused: true, undef: true, strict: true */
	
	( function( global, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module, window */
	  if ( true ) {
	    // AMD - RequireJS
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.EvEmitter = factory();
	  }
	
	}( typeof window != 'undefined' ? window : this, function() {
	
	"use strict";
	
	function EvEmitter() {}
	
	var proto = EvEmitter.prototype;
	
	proto.on = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // set events hash
	  var events = this._events = this._events || {};
	  // set listeners array
	  var listeners = events[ eventName ] = events[ eventName ] || [];
	  // only add once
	  if ( listeners.indexOf( listener ) == -1 ) {
	    listeners.push( listener );
	  }
	
	  return this;
	};
	
	proto.once = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // add event
	  this.on( eventName, listener );
	  // set once flag
	  // set onceEvents hash
	  var onceEvents = this._onceEvents = this._onceEvents || {};
	  // set onceListeners object
	  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
	  // set flag
	  onceListeners[ listener ] = true;
	
	  return this;
	};
	
	proto.off = function( eventName, listener ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var index = listeners.indexOf( listener );
	  if ( index != -1 ) {
	    listeners.splice( index, 1 );
	  }
	
	  return this;
	};
	
	proto.emitEvent = function( eventName, args ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var i = 0;
	  var listener = listeners[i];
	  args = args || [];
	  // once stuff
	  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];
	
	  while ( listener ) {
	    var isOnce = onceListeners && onceListeners[ listener ];
	    if ( isOnce ) {
	      // remove listener
	      // remove before trigger to prevent recursion
	      this.off( eventName, listener );
	      // unset once flag
	      delete onceListeners[ listener ];
	    }
	    // trigger listener
	    listener.apply( this, args );
	    // get next listener
	    i += isOnce ? 0 : 1;
	    listener = listeners[i];
	  }
	
	  return this;
	};
	
	return EvEmitter;
	
	}));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * getSize v2.0.2
	 * measure size of elements
	 * MIT license
	 */
	
	/*jshint browser: true, strict: true, undef: true, unused: true */
	/*global define: false, module: false, console: false */
	
	( function( window, factory ) {
	  'use strict';
	
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return factory();
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.getSize = factory();
	  }
	
	})( window, function factory() {
	'use strict';
	
	// -------------------------- helpers -------------------------- //
	
	// get a number from a string, not a percentage
	function getStyleSize( value ) {
	  var num = parseFloat( value );
	  // not a percent like '100%', and a number
	  var isValid = value.indexOf('%') == -1 && !isNaN( num );
	  return isValid && num;
	}
	
	function noop() {}
	
	var logError = typeof console == 'undefined' ? noop :
	  function( message ) {
	    console.error( message );
	  };
	
	// -------------------------- measurements -------------------------- //
	
	var measurements = [
	  'paddingLeft',
	  'paddingRight',
	  'paddingTop',
	  'paddingBottom',
	  'marginLeft',
	  'marginRight',
	  'marginTop',
	  'marginBottom',
	  'borderLeftWidth',
	  'borderRightWidth',
	  'borderTopWidth',
	  'borderBottomWidth'
	];
	
	var measurementsLength = measurements.length;
	
	function getZeroSize() {
	  var size = {
	    width: 0,
	    height: 0,
	    innerWidth: 0,
	    innerHeight: 0,
	    outerWidth: 0,
	    outerHeight: 0
	  };
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    size[ measurement ] = 0;
	  }
	  return size;
	}
	
	// -------------------------- getStyle -------------------------- //
	
	/**
	 * getStyle, get style of element, check for Firefox bug
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	 */
	function getStyle( elem ) {
	  var style = getComputedStyle( elem );
	  if ( !style ) {
	    logError( 'Style returned ' + style +
	      '. Are you running this code in a hidden iframe on Firefox? ' +
	      'See http://bit.ly/getsizebug1' );
	  }
	  return style;
	}
	
	// -------------------------- setup -------------------------- //
	
	var isSetup = false;
	
	var isBoxSizeOuter;
	
	/**
	 * setup
	 * check isBoxSizerOuter
	 * do on first getSize() rather than on page load for Firefox bug
	 */
	function setup() {
	  // setup once
	  if ( isSetup ) {
	    return;
	  }
	  isSetup = true;
	
	  // -------------------------- box sizing -------------------------- //
	
	  /**
	   * WebKit measures the outer-width on style.width on border-box elems
	   * IE & Firefox<29 measures the inner-width
	   */
	  var div = document.createElement('div');
	  div.style.width = '200px';
	  div.style.padding = '1px 2px 3px 4px';
	  div.style.borderStyle = 'solid';
	  div.style.borderWidth = '1px 2px 3px 4px';
	  div.style.boxSizing = 'border-box';
	
	  var body = document.body || document.documentElement;
	  body.appendChild( div );
	  var style = getStyle( div );
	
	  getSize.isBoxSizeOuter = isBoxSizeOuter = getStyleSize( style.width ) == 200;
	  body.removeChild( div );
	
	}
	
	// -------------------------- getSize -------------------------- //
	
	function getSize( elem ) {
	  setup();
	
	  // use querySeletor if elem is string
	  if ( typeof elem == 'string' ) {
	    elem = document.querySelector( elem );
	  }
	
	  // do not proceed on non-objects
	  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
	    return;
	  }
	
	  var style = getStyle( elem );
	
	  // if hidden, everything is 0
	  if ( style.display == 'none' ) {
	    return getZeroSize();
	  }
	
	  var size = {};
	  size.width = elem.offsetWidth;
	  size.height = elem.offsetHeight;
	
	  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';
	
	  // get all measurements
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    var value = style[ measurement ];
	    var num = parseFloat( value );
	    // any 'auto', 'medium' value will be 0
	    size[ measurement ] = !isNaN( num ) ? num : 0;
	  }
	
	  var paddingWidth = size.paddingLeft + size.paddingRight;
	  var paddingHeight = size.paddingTop + size.paddingBottom;
	  var marginWidth = size.marginLeft + size.marginRight;
	  var marginHeight = size.marginTop + size.marginBottom;
	  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	  var borderHeight = size.borderTopWidth + size.borderBottomWidth;
	
	  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
	
	  // overwrite width and height if we can get it from style
	  var styleWidth = getStyleSize( style.width );
	  if ( styleWidth !== false ) {
	    size.width = styleWidth +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
	  }
	
	  var styleHeight = getStyleSize( style.height );
	  if ( styleHeight !== false ) {
	    size.height = styleHeight +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
	  }
	
	  size.innerWidth = size.width - ( paddingWidth + borderWidth );
	  size.innerHeight = size.height - ( paddingHeight + borderHeight );
	
	  size.outerWidth = size.width + marginWidth;
	  size.outerHeight = size.height + marginHeight;
	
	  return size;
	}
	
	return getSize;
	
	});


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Fizzy UI utils v2.0.3
	 * MIT license
	 */
	
	/*jshint browser: true, undef: true, unused: true, strict: true */
	
	( function( window, factory ) {
	  // universal module definition
	  /*jshint strict: false */ /*globals define, module, require */
	
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(8)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( matchesSelector ) {
	      return factory( window, matchesSelector );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('desandro-matches-selector')
	    );
	  } else {
	    // browser global
	    window.fizzyUIUtils = factory(
	      window,
	      window.matchesSelector
	    );
	  }
	
	}( window, function factory( window, matchesSelector ) {
	
	'use strict';
	
	var utils = {};
	
	// ----- extend ----- //
	
	// extends objects
	utils.extend = function( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	};
	
	// ----- modulo ----- //
	
	utils.modulo = function( num, div ) {
	  return ( ( num % div ) + div ) % div;
	};
	
	// ----- makeArray ----- //
	
	// turn element or nodeList into an array
	utils.makeArray = function( obj ) {
	  var ary = [];
	  if ( Array.isArray( obj ) ) {
	    // use object if already an array
	    ary = obj;
	  } else if ( obj && typeof obj.length == 'number' ) {
	    // convert nodeList to array
	    for ( var i=0; i < obj.length; i++ ) {
	      ary.push( obj[i] );
	    }
	  } else {
	    // array of single index
	    ary.push( obj );
	  }
	  return ary;
	};
	
	// ----- removeFrom ----- //
	
	utils.removeFrom = function( ary, obj ) {
	  var index = ary.indexOf( obj );
	  if ( index != -1 ) {
	    ary.splice( index, 1 );
	  }
	};
	
	// ----- getParent ----- //
	
	utils.getParent = function( elem, selector ) {
	  while ( elem != document.body ) {
	    elem = elem.parentNode;
	    if ( matchesSelector( elem, selector ) ) {
	      return elem;
	    }
	  }
	};
	
	// ----- getQueryElement ----- //
	
	// use element as selector string
	utils.getQueryElement = function( elem ) {
	  if ( typeof elem == 'string' ) {
	    return document.querySelector( elem );
	  }
	  return elem;
	};
	
	// ----- handleEvent ----- //
	
	// enable .ontype to trigger from .addEventListener( elem, 'type' )
	utils.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};
	
	// ----- filterFindElements ----- //
	
	utils.filterFindElements = function( elems, selector ) {
	  // make array of elems
	  elems = utils.makeArray( elems );
	  var ffElems = [];
	
	  elems.forEach( function( elem ) {
	    // check that elem is an actual element
	    if ( !( elem instanceof HTMLElement ) ) {
	      return;
	    }
	    // add elem if no selector
	    if ( !selector ) {
	      ffElems.push( elem );
	      return;
	    }
	    // filter & find items if we have a selector
	    // filter
	    if ( matchesSelector( elem, selector ) ) {
	      ffElems.push( elem );
	    }
	    // find children
	    var childElems = elem.querySelectorAll( selector );
	    // concat childElems to filterFound array
	    for ( var i=0; i < childElems.length; i++ ) {
	      ffElems.push( childElems[i] );
	    }
	  });
	
	  return ffElems;
	};
	
	// ----- debounceMethod ----- //
	
	utils.debounceMethod = function( _class, methodName, threshold ) {
	  // original method
	  var method = _class.prototype[ methodName ];
	  var timeoutName = methodName + 'Timeout';
	
	  _class.prototype[ methodName ] = function() {
	    var timeout = this[ timeoutName ];
	    if ( timeout ) {
	      clearTimeout( timeout );
	    }
	    var args = arguments;
	
	    var _this = this;
	    this[ timeoutName ] = setTimeout( function() {
	      method.apply( _this, args );
	      delete _this[ timeoutName ];
	    }, threshold || 100 );
	  };
	};
	
	// ----- docReady ----- //
	
	utils.docReady = function( callback ) {
	  var readyState = document.readyState;
	  if ( readyState == 'complete' || readyState == 'interactive' ) {
	    // do async to allow for other scripts to run. metafizzy/flickity#441
	    setTimeout( callback );
	  } else {
	    document.addEventListener( 'DOMContentLoaded', callback );
	  }
	};
	
	// ----- htmlInit ----- //
	
	// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
	utils.toDashed = function( str ) {
	  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
	    return $1 + '-' + $2;
	  }).toLowerCase();
	};
	
	var console = window.console;
	/**
	 * allow user to initialize classes via [data-namespace] or .js-namespace class
	 * htmlInit( Widget, 'widgetName' )
	 * options are parsed from data-namespace-options
	 */
	utils.htmlInit = function( WidgetClass, namespace ) {
	  utils.docReady( function() {
	    var dashedNamespace = utils.toDashed( namespace );
	    var dataAttr = 'data-' + dashedNamespace;
	    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
	    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
	    var elems = utils.makeArray( dataAttrElems )
	      .concat( utils.makeArray( jsDashElems ) );
	    var dataOptionsAttr = dataAttr + '-options';
	    var jQuery = window.jQuery;
	
	    elems.forEach( function( elem ) {
	      var attr = elem.getAttribute( dataAttr ) ||
	        elem.getAttribute( dataOptionsAttr );
	      var options;
	      try {
	        options = attr && JSON.parse( attr );
	      } catch ( error ) {
	        // log error, do not initialize
	        if ( console ) {
	          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
	          ': ' + error );
	        }
	        return;
	      }
	      // initialize
	      var instance = new WidgetClass( elem, options );
	      // make available via $().data('namespace')
	      if ( jQuery ) {
	        jQuery.data( elem, namespace, instance );
	      }
	    });
	
	  });
	};
	
	// -----  ----- //
	
	return utils;
	
	}));


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * matchesSelector v2.0.1
	 * matchesSelector( element, '.selector' )
	 * MIT license
	 */
	
	/*jshint browser: true, strict: true, undef: true, unused: true */
	
	( function( window, factory ) {
	  /*global define: false, module: false */
	  'use strict';
	  // universal module definition
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.matchesSelector = factory();
	  }
	
	}( window, function factory() {
	  'use strict';
	
	  var matchesMethod = ( function() {
	    var ElemProto = Element.prototype;
	    // check for the standard method name first
	    if ( ElemProto.matches ) {
	      return 'matches';
	    }
	    // check un-prefixed
	    if ( ElemProto.matchesSelector ) {
	      return 'matchesSelector';
	    }
	    // check vendor prefixes
	    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];
	
	    for ( var i=0; i < prefixes.length; i++ ) {
	      var prefix = prefixes[i];
	      var method = prefix + 'MatchesSelector';
	      if ( ElemProto[ method ] ) {
	        return method;
	      }
	    }
	  })();
	
	  return function matchesSelector( elem, selector ) {
	    return elem[ matchesMethod ]( selector );
	  };
	
	}));


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Flickity.Cell
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(6)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( getSize ) {
	      return factory( window, getSize );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('get-size')
	    );
	  } else {
	    // browser global
	    window.Flickity = window.Flickity || {};
	    window.Flickity.Cell = factory(
	      window,
	      window.getSize
	    );
	  }
	
	}( window, function factory( window, getSize ) {
	
	'use strict';
	
	function Cell( elem, parent ) {
	  this.element = elem;
	  this.parent = parent;
	
	  this.create();
	}
	
	var proto = Cell.prototype;
	
	proto.create = function() {
	  this.element.style.position = 'absolute';
	  this.x = 0;
	  this.shift = 0;
	};
	
	proto.destroy = function() {
	  // reset style
	  this.element.style.position = '';
	  var side = this.parent.originSide;
	  this.element.style[ side ] = '';
	};
	
	proto.getSize = function() {
	  this.size = getSize( this.element );
	};
	
	proto.setPosition = function( x ) {
	  this.x = x;
	  this.updateTarget();
	  this.renderPosition( x );
	};
	
	// setDefaultTarget v1 method, backwards compatibility, remove in v3
	proto.updateTarget = proto.setDefaultTarget = function() {
	  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
	  this.target = this.x + this.size[ marginProperty ] +
	    this.size.width * this.parent.cellAlign;
	};
	
	proto.renderPosition = function( x ) {
	  // render position of cell with in slider
	  var side = this.parent.originSide;
	  this.element.style[ side ] = this.parent.getPositionValue( x );
	};
	
	/**
	 * @param {Integer} factor - 0, 1, or -1
	**/
	proto.wrapShift = function( shift ) {
	  this.shift = shift;
	  this.renderPosition( this.x + this.parent.slideableWidth * shift );
	};
	
	proto.remove = function() {
	  this.element.parentNode.removeChild( this.element );
	};
	
	return Cell;
	
	}));


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// slide
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.Flickity = window.Flickity || {};
	    window.Flickity.Slide = factory();
	  }
	
	}( window, function factory() {
	'use strict';
	
	function Slide( parent ) {
	  this.parent = parent;
	  this.isOriginLeft = parent.originSide == 'left';
	  this.cells = [];
	  this.outerWidth = 0;
	  this.height = 0;
	}
	
	var proto = Slide.prototype;
	
	proto.addCell = function( cell ) {
	  this.cells.push( cell );
	  this.outerWidth += cell.size.outerWidth;
	  this.height = Math.max( cell.size.outerHeight, this.height );
	  // first cell stuff
	  if ( this.cells.length == 1 ) {
	    this.x = cell.x; // x comes from first cell
	    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
	    this.firstMargin = cell.size[ beginMargin ];
	  }
	};
	
	proto.updateTarget = function() {
	  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
	  var lastCell = this.getLastCell();
	  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
	  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
	  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
	};
	
	proto.getLastCell = function() {
	  return this.cells[ this.cells.length - 1 ];
	};
	
	proto.select = function() {
	  this.changeSelectedClass('add');
	};
	
	proto.unselect = function() {
	  this.changeSelectedClass('remove');
	};
	
	proto.changeSelectedClass = function( method ) {
	  this.cells.forEach( function( cell ) {
	    cell.element.classList[ method ]('is-selected');
	  });
	};
	
	proto.getCellElements = function() {
	  return this.cells.map( function( cell ) {
	    return cell.element;
	  });
	};
	
	return Slide;
	
	}));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// animate
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( utils ) {
	      return factory( window, utils );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('fizzy-ui-utils')
	    );
	  } else {
	    // browser global
	    window.Flickity = window.Flickity || {};
	    window.Flickity.animatePrototype = factory(
	      window,
	      window.fizzyUIUtils
	    );
	  }
	
	}( window, function factory( window, utils ) {
	
	'use strict';
	
	// -------------------------- requestAnimationFrame -------------------------- //
	
	// get rAF, prefixed, if present
	var requestAnimationFrame = window.requestAnimationFrame ||
	  window.webkitRequestAnimationFrame;
	
	// fallback to setTimeout
	var lastTime = 0;
	if ( !requestAnimationFrame )  {
	  requestAnimationFrame = function( callback ) {
	    var currTime = new Date().getTime();
	    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
	    var id = setTimeout( callback, timeToCall );
	    lastTime = currTime + timeToCall;
	    return id;
	  };
	}
	
	// -------------------------- animate -------------------------- //
	
	var proto = {};
	
	proto.startAnimation = function() {
	  if ( this.isAnimating ) {
	    return;
	  }
	
	  this.isAnimating = true;
	  this.restingFrames = 0;
	  this.animate();
	};
	
	proto.animate = function() {
	  this.applyDragForce();
	  this.applySelectedAttraction();
	
	  var previousX = this.x;
	
	  this.integratePhysics();
	  this.positionSlider();
	  this.settle( previousX );
	  // animate next frame
	  if ( this.isAnimating ) {
	    var _this = this;
	    requestAnimationFrame( function animateFrame() {
	      _this.animate();
	    });
	  }
	};
	
	
	var transformProperty = ( function () {
	  var style = document.documentElement.style;
	  if ( typeof style.transform == 'string' ) {
	    return 'transform';
	  }
	  return 'WebkitTransform';
	})();
	
	proto.positionSlider = function() {
	  var x = this.x;
	  // wrap position around
	  if ( this.options.wrapAround && this.cells.length > 1 ) {
	    x = utils.modulo( x, this.slideableWidth );
	    x = x - this.slideableWidth;
	    this.shiftWrapCells( x );
	  }
	
	  x = x + this.cursorPosition;
	  // reverse if right-to-left and using transform
	  x = this.options.rightToLeft && transformProperty ? -x : x;
	  var value = this.getPositionValue( x );
	  // use 3D tranforms for hardware acceleration on iOS
	  // but use 2D when settled, for better font-rendering
	  this.slider.style[ transformProperty ] = this.isAnimating ?
	    'translate3d(' + value + ',0,0)' : 'translateX(' + value + ')';
	
	  // scroll event
	  var firstSlide = this.slides[0];
	  if ( firstSlide ) {
	    var positionX = -this.x - firstSlide.target;
	    var progress = positionX / this.slidesWidth;
	    this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
	  }
	};
	
	proto.positionSliderAtSelected = function() {
	  if ( !this.cells.length ) {
	    return;
	  }
	  this.x = -this.selectedSlide.target;
	  this.positionSlider();
	};
	
	proto.getPositionValue = function( position ) {
	  if ( this.options.percentPosition ) {
	    // percent position, round to 2 digits, like 12.34%
	    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
	  } else {
	    // pixel positioning
	    return Math.round( position ) + 'px';
	  }
	};
	
	proto.settle = function( previousX ) {
	  // keep track of frames where x hasn't moved
	  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
	    this.restingFrames++;
	  }
	  // stop animating if resting for 3 or more frames
	  if ( this.restingFrames > 2 ) {
	    this.isAnimating = false;
	    delete this.isFreeScrolling;
	    // render position with translateX when settled
	    this.positionSlider();
	    this.dispatchEvent('settle');
	  }
	};
	
	proto.shiftWrapCells = function( x ) {
	  // shift before cells
	  var beforeGap = this.cursorPosition + x;
	  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
	  // shift after cells
	  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
	  this._shiftCells( this.afterShiftCells, afterGap, 1 );
	};
	
	proto._shiftCells = function( cells, gap, shift ) {
	  for ( var i=0; i < cells.length; i++ ) {
	    var cell = cells[i];
	    var cellShift = gap > 0 ? shift : 0;
	    cell.wrapShift( cellShift );
	    gap -= cell.size.outerWidth;
	  }
	};
	
	proto._unshiftCells = function( cells ) {
	  if ( !cells || !cells.length ) {
	    return;
	  }
	  for ( var i=0; i < cells.length; i++ ) {
	    cells[i].wrapShift( 0 );
	  }
	};
	
	// -------------------------- physics -------------------------- //
	
	proto.integratePhysics = function() {
	  this.x += this.velocity;
	  this.velocity *= this.getFrictionFactor();
	};
	
	proto.applyForce = function( force ) {
	  this.velocity += force;
	};
	
	proto.getFrictionFactor = function() {
	  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
	};
	
	proto.getRestingPosition = function() {
	  // my thanks to Steven Wittens, who simplified this math greatly
	  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
	};
	
	proto.applyDragForce = function() {
	  if ( !this.isPointerDown ) {
	    return;
	  }
	  // change the position to drag position by applying force
	  var dragVelocity = this.dragX - this.x;
	  var dragForce = dragVelocity - this.velocity;
	  this.applyForce( dragForce );
	};
	
	proto.applySelectedAttraction = function() {
	  // do not attract if pointer down or no cells
	  if ( this.isPointerDown || this.isFreeScrolling || !this.cells.length ) {
	    return;
	  }
	  var distance = this.selectedSlide.target * -1 - this.x;
	  var force = distance * this.options.selectedAttraction;
	  this.applyForce( force );
	};
	
	return proto;
	
	}));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// drag
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(4),
	      __webpack_require__(13),
	      __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Flickity, Unidragger, utils ) {
	      return factory( window, Flickity, Unidragger, utils );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('./flickity'),
	      require('unidragger'),
	      require('fizzy-ui-utils')
	    );
	  } else {
	    // browser global
	    window.Flickity = factory(
	      window,
	      window.Flickity,
	      window.Unidragger,
	      window.fizzyUIUtils
	    );
	  }
	
	}( window, function factory( window, Flickity, Unidragger, utils ) {
	
	'use strict';
	
	// ----- defaults ----- //
	
	utils.extend( Flickity.defaults, {
	  draggable: true,
	  dragThreshold: 3,
	});
	
	// ----- create ----- //
	
	Flickity.createMethods.push('_createDrag');
	
	// -------------------------- drag prototype -------------------------- //
	
	var proto = Flickity.prototype;
	utils.extend( proto, Unidragger.prototype );
	
	// --------------------------  -------------------------- //
	
	proto._createDrag = function() {
	  this.on( 'activate', this.bindDrag );
	  this.on( 'uiChange', this._uiChangeDrag );
	  this.on( 'childUIPointerDown', this._childUIPointerDownDrag );
	  this.on( 'deactivate', this.unbindDrag );
	};
	
	proto.bindDrag = function() {
	  if ( !this.options.draggable || this.isDragBound ) {
	    return;
	  }
	  this.element.classList.add('is-draggable');
	  this.handles = [ this.viewport ];
	  this.bindHandles();
	  this.isDragBound = true;
	};
	
	proto.unbindDrag = function() {
	  if ( !this.isDragBound ) {
	    return;
	  }
	  this.element.classList.remove('is-draggable');
	  this.unbindHandles();
	  delete this.isDragBound;
	};
	
	proto._uiChangeDrag = function() {
	  delete this.isFreeScrolling;
	};
	
	proto._childUIPointerDownDrag = function( event ) {
	  event.preventDefault();
	  this.pointerDownFocus( event );
	};
	
	// -------------------------- pointer events -------------------------- //
	
	// nodes that have text fields
	var cursorNodes = {
	  TEXTAREA: true,
	  INPUT: true,
	  OPTION: true,
	};
	
	// input types that do not have text fields
	var clickTypes = {
	  radio: true,
	  checkbox: true,
	  button: true,
	  submit: true,
	  image: true,
	  file: true,
	};
	
	proto.pointerDown = function( event, pointer ) {
	  // dismiss inputs with text fields. #403, #404
	  var isCursorInput = cursorNodes[ event.target.nodeName ] &&
	    !clickTypes[ event.target.type ];
	  if ( isCursorInput ) {
	    // reset pointerDown logic
	    this.isPointerDown = false;
	    delete this.pointerIdentifier;
	    return;
	  }
	
	  this._dragPointerDown( event, pointer );
	
	  // kludge to blur focused inputs in dragger
	  var focused = document.activeElement;
	  if ( focused && focused.blur && focused != this.element &&
	    // do not blur body for IE9 & 10, #117
	    focused != document.body ) {
	    focused.blur();
	  }
	  this.pointerDownFocus( event );
	  // stop if it was moving
	  this.dragX = this.x;
	  this.viewport.classList.add('is-pointer-down');
	  // bind move and end events
	  this._bindPostStartEvents( event );
	  // track scrolling
	  this.pointerDownScroll = getScrollPosition();
	  window.addEventListener( 'scroll', this );
	
	  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
	};
	
	var touchStartEvents = {
	  touchstart: true,
	  MSPointerDown: true
	};
	
	var focusNodes = {
	  INPUT: true,
	  SELECT: true
	};
	
	proto.pointerDownFocus = function( event ) {
	  // focus element, if not touch, and its not an input or select
	  if ( !this.options.accessibility || touchStartEvents[ event.type ] ||
	      focusNodes[ event.target.nodeName ] ) {
	    return;
	  }
	  var prevScrollY = window.pageYOffset;
	  this.element.focus();
	  // hack to fix scroll jump after focus, #76
	  if ( window.pageYOffset != prevScrollY ) {
	    window.scrollTo( window.pageXOffset, prevScrollY );
	  }
	};
	
	proto.canPreventDefaultOnPointerDown = function( event ) {
	  // prevent default, unless touchstart or <select>
	  var isTouchstart = event.type == 'touchstart';
	  var targetNodeName = event.target.nodeName;
	  return !isTouchstart && targetNodeName != 'SELECT';
	};
	
	// ----- move ----- //
	
	proto.hasDragStarted = function( moveVector ) {
	  return Math.abs( moveVector.x ) > this.options.dragThreshold;
	};
	
	// ----- up ----- //
	
	proto.pointerUp = function( event, pointer ) {
	  delete this.isTouchScrolling;
	  this.viewport.classList.remove('is-pointer-down');
	  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
	  this._dragPointerUp( event, pointer );
	};
	
	proto.pointerDone = function() {
	  window.removeEventListener( 'scroll', this );
	  delete this.pointerDownScroll;
	};
	
	// -------------------------- dragging -------------------------- //
	
	proto.dragStart = function( event, pointer ) {
	  this.dragStartPosition = this.x;
	  this.startAnimation();
	  this.dispatchEvent( 'dragStart', event, [ pointer ] );
	};
	
	proto.pointerMove = function( event, pointer ) {
	  var moveVector = this._dragPointerMove( event, pointer );
	  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
	  this._dragMove( event, pointer, moveVector );
	};
	
	proto.dragMove = function( event, pointer, moveVector ) {
	  event.preventDefault();
	
	  this.previousDragX = this.dragX;
	  // reverse if right-to-left
	  var direction = this.options.rightToLeft ? -1 : 1;
	  var dragX = this.dragStartPosition + moveVector.x * direction;
	
	  if ( !this.options.wrapAround && this.slides.length ) {
	    // slow drag
	    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
	    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
	    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
	    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
	  }
	
	  this.dragX = dragX;
	
	  this.dragMoveTime = new Date();
	  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
	};
	
	proto.dragEnd = function( event, pointer ) {
	  if ( this.options.freeScroll ) {
	    this.isFreeScrolling = true;
	  }
	  // set selectedIndex based on where flick will end up
	  var index = this.dragEndRestingSelect();
	
	  if ( this.options.freeScroll && !this.options.wrapAround ) {
	    // if free-scroll & not wrap around
	    // do not free-scroll if going outside of bounding slides
	    // so bounding slides can attract slider, and keep it in bounds
	    var restingX = this.getRestingPosition();
	    this.isFreeScrolling = -restingX > this.slides[0].target &&
	      -restingX < this.getLastSlide().target;
	  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
	    // boost selection if selected index has not changed
	    index += this.dragEndBoostSelect();
	  }
	  delete this.previousDragX;
	  // apply selection
	  // TODO refactor this, selecting here feels weird
	  // HACK, set flag so dragging stays in correct direction
	  this.isDragSelect = this.options.wrapAround;
	  this.select( index );
	  delete this.isDragSelect;
	  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
	};
	
	proto.dragEndRestingSelect = function() {
	  var restingX = this.getRestingPosition();
	  // how far away from selected slide
	  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
	  // get closet resting going up and going down
	  var positiveResting = this._getClosestResting( restingX, distance, 1 );
	  var negativeResting = this._getClosestResting( restingX, distance, -1 );
	  // use closer resting for wrap-around
	  var index = positiveResting.distance < negativeResting.distance ?
	    positiveResting.index : negativeResting.index;
	  return index;
	};
	
	/**
	 * given resting X and distance to selected cell
	 * get the distance and index of the closest cell
	 * @param {Number} restingX - estimated post-flick resting position
	 * @param {Number} distance - distance to selected cell
	 * @param {Integer} increment - +1 or -1, going up or down
	 * @returns {Object} - { distance: {Number}, index: {Integer} }
	 */
	proto._getClosestResting = function( restingX, distance, increment ) {
	  var index = this.selectedIndex;
	  var minDistance = Infinity;
	  var condition = this.options.contain && !this.options.wrapAround ?
	    // if contain, keep going if distance is equal to minDistance
	    function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
	  while ( condition( distance, minDistance ) ) {
	    // measure distance to next cell
	    index += increment;
	    minDistance = distance;
	    distance = this.getSlideDistance( -restingX, index );
	    if ( distance === null ) {
	      break;
	    }
	    distance = Math.abs( distance );
	  }
	  return {
	    distance: minDistance,
	    // selected was previous index
	    index: index - increment
	  };
	};
	
	/**
	 * measure distance between x and a slide target
	 * @param {Number} x
	 * @param {Integer} index - slide index
	 */
	proto.getSlideDistance = function( x, index ) {
	  var len = this.slides.length;
	  // wrap around if at least 2 slides
	  var isWrapAround = this.options.wrapAround && len > 1;
	  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
	  var slide = this.slides[ slideIndex ];
	  if ( !slide ) {
	    return null;
	  }
	  // add distance for wrap-around slides
	  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
	  return x - ( slide.target + wrap );
	};
	
	proto.dragEndBoostSelect = function() {
	  // do not boost if no previousDragX or dragMoveTime
	  if ( this.previousDragX === undefined || !this.dragMoveTime ||
	    // or if drag was held for 100 ms
	    new Date() - this.dragMoveTime > 100 ) {
	    return 0;
	  }
	
	  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
	  var delta = this.previousDragX - this.dragX;
	  if ( distance > 0 && delta > 0 ) {
	    // boost to next if moving towards the right, and positive velocity
	    return 1;
	  } else if ( distance < 0 && delta < 0 ) {
	    // boost to previous if moving towards the left, and negative velocity
	    return -1;
	  }
	  return 0;
	};
	
	// ----- staticClick ----- //
	
	proto.staticClick = function( event, pointer ) {
	  // get clickedCell, if cell was clicked
	  var clickedCell = this.getParentCell( event.target );
	  var cellElem = clickedCell && clickedCell.element;
	  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
	  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
	};
	
	// ----- scroll ----- //
	
	proto.onscroll = function() {
	  var scroll = getScrollPosition();
	  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
	  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
	  // cancel click/tap if scroll is too much
	  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
	    this._pointerDone();
	  }
	};
	
	// ----- utils ----- //
	
	function getScrollPosition() {
	  return {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  };
	}
	
	// -----  ----- //
	
	return Flickity;
	
	}));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Unidragger v2.1.0
	 * Draggable base class
	 * MIT license
	 */
	
	/*jshint browser: true, unused: true, undef: true, strict: true */
	
	( function( window, factory ) {
	  // universal module definition
	  /*jshint strict: false */ /*globals define, module, require */
	
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(14)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Unipointer ) {
	      return factory( window, Unipointer );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('unipointer')
	    );
	  } else {
	    // browser global
	    window.Unidragger = factory(
	      window,
	      window.Unipointer
	    );
	  }
	
	}( window, function factory( window, Unipointer ) {
	
	'use strict';
	
	// -----  ----- //
	
	function noop() {}
	
	// -------------------------- Unidragger -------------------------- //
	
	function Unidragger() {}
	
	// inherit Unipointer & EvEmitter
	var proto = Unidragger.prototype = Object.create( Unipointer.prototype );
	
	// ----- bind start ----- //
	
	proto.bindHandles = function() {
	  this._bindHandles( true );
	};
	
	proto.unbindHandles = function() {
	  this._bindHandles( false );
	};
	
	var navigator = window.navigator;
	/**
	 * works as unbinder, as you can .bindHandles( false ) to unbind
	 * @param {Boolean} isBind - will unbind if falsey
	 */
	proto._bindHandles = function( isBind ) {
	  // munge isBind, default to true
	  isBind = isBind === undefined ? true : !!isBind;
	  // extra bind logic
	  var binderExtra;
	  if ( navigator.pointerEnabled ) {
	    binderExtra = function( handle ) {
	      // disable scrolling on the element
	      handle.style.touchAction = isBind ? 'none' : '';
	    };
	  } else if ( navigator.msPointerEnabled ) {
	    binderExtra = function( handle ) {
	      // disable scrolling on the element
	      handle.style.msTouchAction = isBind ? 'none' : '';
	    };
	  } else {
	    binderExtra = noop;
	  }
	  // bind each handle
	  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
	  for ( var i=0; i < this.handles.length; i++ ) {
	    var handle = this.handles[i];
	    this._bindStartEvent( handle, isBind );
	    binderExtra( handle );
	    handle[ bindMethod ]( 'click', this );
	  }
	};
	
	// ----- start event ----- //
	
	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerDown = function( event, pointer ) {
	  // dismiss range sliders
	  if ( event.target.nodeName == 'INPUT' && event.target.type == 'range' ) {
	    // reset pointerDown logic
	    this.isPointerDown = false;
	    delete this.pointerIdentifier;
	    return;
	  }
	
	  this._dragPointerDown( event, pointer );
	  // kludge to blur focused inputs in dragger
	  var focused = document.activeElement;
	  if ( focused && focused.blur ) {
	    focused.blur();
	  }
	  // bind move and end events
	  this._bindPostStartEvents( event );
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};
	
	// base pointer down logic
	proto._dragPointerDown = function( event, pointer ) {
	  // track to see when dragging starts
	  this.pointerDownPoint = Unipointer.getPointerPoint( pointer );
	
	  var canPreventDefault = this.canPreventDefaultOnPointerDown( event, pointer );
	  if ( canPreventDefault ) {
	    event.preventDefault();
	  }
	};
	
	// overwriteable method so Flickity can prevent for scrolling
	proto.canPreventDefaultOnPointerDown = function( event ) {
	  // prevent default, unless touchstart or <select>
	  return event.target.nodeName != 'SELECT';
	};
	
	// ----- move event ----- //
	
	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerMove = function( event, pointer ) {
	  var moveVector = this._dragPointerMove( event, pointer );
	  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
	  this._dragMove( event, pointer, moveVector );
	};
	
	// base pointer move logic
	proto._dragPointerMove = function( event, pointer ) {
	  var movePoint = Unipointer.getPointerPoint( pointer );
	  var moveVector = {
	    x: movePoint.x - this.pointerDownPoint.x,
	    y: movePoint.y - this.pointerDownPoint.y
	  };
	  // start drag if pointer has moved far enough to start drag
	  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
	    this._dragStart( event, pointer );
	  }
	  return moveVector;
	};
	
	// condition if pointer has moved far enough to start drag
	proto.hasDragStarted = function( moveVector ) {
	  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
	};
	
	
	// ----- end event ----- //
	
	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerUp = function( event, pointer ) {
	  this.emitEvent( 'pointerUp', [ event, pointer ] );
	  this._dragPointerUp( event, pointer );
	};
	
	proto._dragPointerUp = function( event, pointer ) {
	  if ( this.isDragging ) {
	    this._dragEnd( event, pointer );
	  } else {
	    // pointer didn't move enough for drag to start
	    this._staticClick( event, pointer );
	  }
	};
	
	// -------------------------- drag -------------------------- //
	
	// dragStart
	proto._dragStart = function( event, pointer ) {
	  this.isDragging = true;
	  this.dragStartPoint = Unipointer.getPointerPoint( pointer );
	  // prevent clicks
	  this.isPreventingClicks = true;
	
	  this.dragStart( event, pointer );
	};
	
	proto.dragStart = function( event, pointer ) {
	  this.emitEvent( 'dragStart', [ event, pointer ] );
	};
	
	// dragMove
	proto._dragMove = function( event, pointer, moveVector ) {
	  // do not drag if not dragging yet
	  if ( !this.isDragging ) {
	    return;
	  }
	
	  this.dragMove( event, pointer, moveVector );
	};
	
	proto.dragMove = function( event, pointer, moveVector ) {
	  event.preventDefault();
	  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
	};
	
	// dragEnd
	proto._dragEnd = function( event, pointer ) {
	  // set flags
	  this.isDragging = false;
	  // re-enable clicking async
	  setTimeout( function() {
	    delete this.isPreventingClicks;
	  }.bind( this ) );
	
	  this.dragEnd( event, pointer );
	};
	
	proto.dragEnd = function( event, pointer ) {
	  this.emitEvent( 'dragEnd', [ event, pointer ] );
	};
	
	// ----- onclick ----- //
	
	// handle all clicks and prevent clicks when dragging
	proto.onclick = function( event ) {
	  if ( this.isPreventingClicks ) {
	    event.preventDefault();
	  }
	};
	
	// ----- staticClick ----- //
	
	// triggered after pointer down & up with no/tiny movement
	proto._staticClick = function( event, pointer ) {
	  // ignore emulated mouse up clicks
	  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
	    return;
	  }
	
	  // allow click in <input>s and <textarea>s
	  var nodeName = event.target.nodeName;
	  if ( nodeName == 'INPUT' || nodeName == 'TEXTAREA' ) {
	    event.target.focus();
	  }
	  this.staticClick( event, pointer );
	
	  // set flag for emulated clicks 300ms after touchend
	  if ( event.type != 'mouseup' ) {
	    this.isIgnoringMouseUp = true;
	    // reset flag after 300ms
	    setTimeout( function() {
	      delete this.isIgnoringMouseUp;
	    }.bind( this ), 400 );
	  }
	};
	
	proto.staticClick = function( event, pointer ) {
	  this.emitEvent( 'staticClick', [ event, pointer ] );
	};
	
	// ----- utils ----- //
	
	Unidragger.getPointerPoint = Unipointer.getPointerPoint;
	
	// -----  ----- //
	
	return Unidragger;
	
	}));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Unipointer v2.1.0
	 * base class for doing one thing with pointer event
	 * MIT license
	 */
	
	/*jshint browser: true, undef: true, unused: true, strict: true */
	
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /*global define, module, require */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(5)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( EvEmitter ) {
	      return factory( window, EvEmitter );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('ev-emitter')
	    );
	  } else {
	    // browser global
	    window.Unipointer = factory(
	      window,
	      window.EvEmitter
	    );
	  }
	
	}( window, function factory( window, EvEmitter ) {
	
	'use strict';
	
	function noop() {}
	
	function Unipointer() {}
	
	// inherit EvEmitter
	var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );
	
	proto.bindStartEvent = function( elem ) {
	  this._bindStartEvent( elem, true );
	};
	
	proto.unbindStartEvent = function( elem ) {
	  this._bindStartEvent( elem, false );
	};
	
	/**
	 * works as unbinder, as you can ._bindStart( false ) to unbind
	 * @param {Boolean} isBind - will unbind if falsey
	 */
	proto._bindStartEvent = function( elem, isBind ) {
	  // munge isBind, default to true
	  isBind = isBind === undefined ? true : !!isBind;
	  var bindMethod = isBind ? 'addEventListener' : 'removeEventListener';
	
	  if ( window.navigator.pointerEnabled ) {
	    // W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
	    elem[ bindMethod ]( 'pointerdown', this );
	  } else if ( window.navigator.msPointerEnabled ) {
	    // IE10 Pointer Events
	    elem[ bindMethod ]( 'MSPointerDown', this );
	  } else {
	    // listen for both, for devices like Chrome Pixel
	    elem[ bindMethod ]( 'mousedown', this );
	    elem[ bindMethod ]( 'touchstart', this );
	  }
	};
	
	// trigger handler methods for events
	proto.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};
	
	// returns the touch that we're keeping track of
	proto.getTouch = function( touches ) {
	  for ( var i=0; i < touches.length; i++ ) {
	    var touch = touches[i];
	    if ( touch.identifier == this.pointerIdentifier ) {
	      return touch;
	    }
	  }
	};
	
	// ----- start event ----- //
	
	proto.onmousedown = function( event ) {
	  // dismiss clicks from right or middle buttons
	  var button = event.button;
	  if ( button && ( button !== 0 && button !== 1 ) ) {
	    return;
	  }
	  this._pointerDown( event, event );
	};
	
	proto.ontouchstart = function( event ) {
	  this._pointerDown( event, event.changedTouches[0] );
	};
	
	proto.onMSPointerDown =
	proto.onpointerdown = function( event ) {
	  this._pointerDown( event, event );
	};
	
	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto._pointerDown = function( event, pointer ) {
	  // dismiss other pointers
	  if ( this.isPointerDown ) {
	    return;
	  }
	
	  this.isPointerDown = true;
	  // save pointer identifier to match up touch events
	  this.pointerIdentifier = pointer.pointerId !== undefined ?
	    // pointerId for pointer events, touch.indentifier for touch events
	    pointer.pointerId : pointer.identifier;
	
	  this.pointerDown( event, pointer );
	};
	
	proto.pointerDown = function( event, pointer ) {
	  this._bindPostStartEvents( event );
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};
	
	// hash of events to be bound after start event
	var postStartEvents = {
	  mousedown: [ 'mousemove', 'mouseup' ],
	  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
	  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
	  MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
	};
	
	proto._bindPostStartEvents = function( event ) {
	  if ( !event ) {
	    return;
	  }
	  // get proper events to match start event
	  var events = postStartEvents[ event.type ];
	  // bind events to node
	  events.forEach( function( eventName ) {
	    window.addEventListener( eventName, this );
	  }, this );
	  // save these arguments
	  this._boundPointerEvents = events;
	};
	
	proto._unbindPostStartEvents = function() {
	  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
	  if ( !this._boundPointerEvents ) {
	    return;
	  }
	  this._boundPointerEvents.forEach( function( eventName ) {
	    window.removeEventListener( eventName, this );
	  }, this );
	
	  delete this._boundPointerEvents;
	};
	
	// ----- move event ----- //
	
	proto.onmousemove = function( event ) {
	  this._pointerMove( event, event );
	};
	
	proto.onMSPointerMove =
	proto.onpointermove = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerMove( event, event );
	  }
	};
	
	proto.ontouchmove = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerMove( event, touch );
	  }
	};
	
	/**
	 * pointer move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerMove = function( event, pointer ) {
	  this.pointerMove( event, pointer );
	};
	
	// public
	proto.pointerMove = function( event, pointer ) {
	  this.emitEvent( 'pointerMove', [ event, pointer ] );
	};
	
	// ----- end event ----- //
	
	
	proto.onmouseup = function( event ) {
	  this._pointerUp( event, event );
	};
	
	proto.onMSPointerUp =
	proto.onpointerup = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerUp( event, event );
	  }
	};
	
	proto.ontouchend = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerUp( event, touch );
	  }
	};
	
	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerUp = function( event, pointer ) {
	  this._pointerDone();
	  this.pointerUp( event, pointer );
	};
	
	// public
	proto.pointerUp = function( event, pointer ) {
	  this.emitEvent( 'pointerUp', [ event, pointer ] );
	};
	
	// ----- pointer done ----- //
	
	// triggered on pointer up & pointer cancel
	proto._pointerDone = function() {
	  // reset properties
	  this.isPointerDown = false;
	  delete this.pointerIdentifier;
	  // remove events
	  this._unbindPostStartEvents();
	  this.pointerDone();
	};
	
	proto.pointerDone = noop;
	
	// ----- pointer cancel ----- //
	
	proto.onMSPointerCancel =
	proto.onpointercancel = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerCancel( event, event );
	  }
	};
	
	proto.ontouchcancel = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerCancel( event, touch );
	  }
	};
	
	/**
	 * pointer cancel
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerCancel = function( event, pointer ) {
	  this._pointerDone();
	  this.pointerCancel( event, pointer );
	};
	
	// public
	proto.pointerCancel = function( event, pointer ) {
	  this.emitEvent( 'pointerCancel', [ event, pointer ] );
	};
	
	// -----  ----- //
	
	// utility function for getting x/y coords from event
	Unipointer.getPointerPoint = function( pointer ) {
	  return {
	    x: pointer.pageX,
	    y: pointer.pageY
	  };
	};
	
	// -----  ----- //
	
	return Unipointer;
	
	}));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// prev/next buttons
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(4),
	      __webpack_require__(16),
	      __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Flickity, TapListener, utils ) {
	      return factory( window, Flickity, TapListener, utils );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('./flickity'),
	      require('tap-listener'),
	      require('fizzy-ui-utils')
	    );
	  } else {
	    // browser global
	    factory(
	      window,
	      window.Flickity,
	      window.TapListener,
	      window.fizzyUIUtils
	    );
	  }
	
	}( window, function factory( window, Flickity, TapListener, utils ) {
	'use strict';
	
	var svgURI = 'http://www.w3.org/2000/svg';
	
	// -------------------------- PrevNextButton -------------------------- //
	
	function PrevNextButton( direction, parent ) {
	  this.direction = direction;
	  this.parent = parent;
	  this._create();
	}
	
	PrevNextButton.prototype = new TapListener();
	
	PrevNextButton.prototype._create = function() {
	  // properties
	  this.isEnabled = true;
	  this.isPrevious = this.direction == -1;
	  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
	  this.isLeft = this.direction == leftDirection;
	
	  var element = this.element = document.createElement('button');
	  element.className = 'flickity-prev-next-button';
	  element.className += this.isPrevious ? ' previous' : ' next';
	  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
	  element.setAttribute( 'type', 'button' );
	  // init as disabled
	  this.disable();
	
	  element.setAttribute( 'aria-label', this.isPrevious ? 'previous' : 'next' );
	
	  // create arrow
	  var svg = this.createSVG();
	  element.appendChild( svg );
	  // update on select
	  this.parent.on( 'select', function() {
	    this.update();
	  }.bind( this ));
	  // tap
	  this.on( 'tap', this.onTap );
	  // pointerDown
	  this.on( 'pointerDown', function onPointerDown( button, event ) {
	    this.parent.childUIPointerDown( event );
	  }.bind( this ));
	};
	
	PrevNextButton.prototype.activate = function() {
	  this.bindTap( this.element );
	  // click events from keyboard
	  this.element.addEventListener( 'click', this );
	  // add to DOM
	  this.parent.element.appendChild( this.element );
	};
	
	PrevNextButton.prototype.deactivate = function() {
	  // remove from DOM
	  this.parent.element.removeChild( this.element );
	  // do regular TapListener destroy
	  TapListener.prototype.destroy.call( this );
	  // click events from keyboard
	  this.element.removeEventListener( 'click', this );
	};
	
	PrevNextButton.prototype.createSVG = function() {
	  var svg = document.createElementNS( svgURI, 'svg');
	  svg.setAttribute( 'viewBox', '0 0 100 100' );
	  var path = document.createElementNS( svgURI, 'path');
	  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
	  path.setAttribute( 'd', pathMovements );
	  path.setAttribute( 'class', 'arrow' );
	  // rotate arrow
	  if ( !this.isLeft ) {
	    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
	  }
	  svg.appendChild( path );
	  return svg;
	};
	
	// get SVG path movmement
	function getArrowMovements( shape ) {
	  // use shape as movement if string
	  if ( typeof shape == 'string' ) {
	    return shape;
	  }
	  // create movement string
	  return 'M ' + shape.x0 + ',50' +
	    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
	    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
	    ' L ' + shape.x3 + ',50 ' +
	    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
	    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
	    ' Z';
	}
	
	PrevNextButton.prototype.onTap = function() {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  this.parent.uiChange();
	  var method = this.isPrevious ? 'previous' : 'next';
	  this.parent[ method ]();
	};
	
	PrevNextButton.prototype.handleEvent = utils.handleEvent;
	
	PrevNextButton.prototype.onclick = function() {
	  // only allow clicks from keyboard
	  var focused = document.activeElement;
	  if ( focused && focused == this.element ) {
	    this.onTap();
	  }
	};
	
	// -----  ----- //
	
	PrevNextButton.prototype.enable = function() {
	  if ( this.isEnabled ) {
	    return;
	  }
	  this.element.disabled = false;
	  this.isEnabled = true;
	};
	
	PrevNextButton.prototype.disable = function() {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  this.element.disabled = true;
	  this.isEnabled = false;
	};
	
	PrevNextButton.prototype.update = function() {
	  // index of first or last slide, if previous or next
	  var slides = this.parent.slides;
	  // enable is wrapAround and at least 2 slides
	  if ( this.parent.options.wrapAround && slides.length > 1 ) {
	    this.enable();
	    return;
	  }
	  var lastIndex = slides.length ? slides.length - 1 : 0;
	  var boundIndex = this.isPrevious ? 0 : lastIndex;
	  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
	  this[ method ]();
	};
	
	PrevNextButton.prototype.destroy = function() {
	  this.deactivate();
	};
	
	// -------------------------- Flickity prototype -------------------------- //
	
	utils.extend( Flickity.defaults, {
	  prevNextButtons: true,
	  arrowShape: {
	    x0: 10,
	    x1: 60, y1: 50,
	    x2: 70, y2: 40,
	    x3: 30
	  }
	});
	
	Flickity.createMethods.push('_createPrevNextButtons');
	var proto = Flickity.prototype;
	
	proto._createPrevNextButtons = function() {
	  if ( !this.options.prevNextButtons ) {
	    return;
	  }
	
	  this.prevButton = new PrevNextButton( -1, this );
	  this.nextButton = new PrevNextButton( 1, this );
	
	  this.on( 'activate', this.activatePrevNextButtons );
	};
	
	proto.activatePrevNextButtons = function() {
	  this.prevButton.activate();
	  this.nextButton.activate();
	  this.on( 'deactivate', this.deactivatePrevNextButtons );
	};
	
	proto.deactivatePrevNextButtons = function() {
	  this.prevButton.deactivate();
	  this.nextButton.deactivate();
	  this.off( 'deactivate', this.deactivatePrevNextButtons );
	};
	
	// --------------------------  -------------------------- //
	
	Flickity.PrevNextButton = PrevNextButton;
	
	return Flickity;
	
	}));


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Tap listener v2.0.0
	 * listens to taps
	 * MIT license
	 */
	
	/*jshint browser: true, unused: true, undef: true, strict: true */
	
	( function( window, factory ) {
	  // universal module definition
	  /*jshint strict: false*/ /*globals define, module, require */
	
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(14)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Unipointer ) {
	      return factory( window, Unipointer );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('unipointer')
	    );
	  } else {
	    // browser global
	    window.TapListener = factory(
	      window,
	      window.Unipointer
	    );
	  }
	
	}( window, function factory( window, Unipointer ) {
	
	'use strict';
	
	// --------------------------  TapListener -------------------------- //
	
	function TapListener( elem ) {
	  this.bindTap( elem );
	}
	
	// inherit Unipointer & EventEmitter
	var proto = TapListener.prototype = Object.create( Unipointer.prototype );
	
	/**
	 * bind tap event to element
	 * @param {Element} elem
	 */
	proto.bindTap = function( elem ) {
	  if ( !elem ) {
	    return;
	  }
	  this.unbindTap();
	  this.tapElement = elem;
	  this._bindStartEvent( elem, true );
	};
	
	proto.unbindTap = function() {
	  if ( !this.tapElement ) {
	    return;
	  }
	  this._bindStartEvent( this.tapElement, true );
	  delete this.tapElement;
	};
	
	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerUp = function( event, pointer ) {
	  // ignore emulated mouse up clicks
	  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
	    return;
	  }
	
	  var pointerPoint = Unipointer.getPointerPoint( pointer );
	  var boundingRect = this.tapElement.getBoundingClientRect();
	  var scrollX = window.pageXOffset;
	  var scrollY = window.pageYOffset;
	  // calculate if pointer is inside tapElement
	  var isInside = pointerPoint.x >= boundingRect.left + scrollX &&
	    pointerPoint.x <= boundingRect.right + scrollX &&
	    pointerPoint.y >= boundingRect.top + scrollY &&
	    pointerPoint.y <= boundingRect.bottom + scrollY;
	  // trigger callback if pointer is inside element
	  if ( isInside ) {
	    this.emitEvent( 'tap', [ event, pointer ] );
	  }
	
	  // set flag for emulated clicks 300ms after touchend
	  if ( event.type != 'mouseup' ) {
	    this.isIgnoringMouseUp = true;
	    // reset flag after 300ms
	    var _this = this;
	    setTimeout( function() {
	      delete _this.isIgnoringMouseUp;
	    }, 400 );
	  }
	};
	
	proto.destroy = function() {
	  this.pointerDone();
	  this.unbindTap();
	};
	
	// -----  ----- //
	
	return TapListener;
	
	}));


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// page dots
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(4),
	      __webpack_require__(16),
	      __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Flickity, TapListener, utils ) {
	      return factory( window, Flickity, TapListener, utils );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('./flickity'),
	      require('tap-listener'),
	      require('fizzy-ui-utils')
	    );
	  } else {
	    // browser global
	    factory(
	      window,
	      window.Flickity,
	      window.TapListener,
	      window.fizzyUIUtils
	    );
	  }
	
	}( window, function factory( window, Flickity, TapListener, utils ) {
	
	// -------------------------- PageDots -------------------------- //
	
	'use strict';
	
	function PageDots( parent ) {
	  this.parent = parent;
	  this._create();
	}
	
	PageDots.prototype = new TapListener();
	
	PageDots.prototype._create = function() {
	  // create holder element
	  this.holder = document.createElement('ol');
	  this.holder.className = 'flickity-page-dots';
	  // create dots, array of elements
	  this.dots = [];
	  // tap
	  this.on( 'tap', this.onTap );
	
	};
	
	PageDots.prototype.activate = function() {
	  this.setDots();
	  this.bindTap( this.holder );
	  // add to DOM
	  this.parent.element.appendChild( this.holder );
	};
	
	PageDots.prototype.deactivate = function() {
	  // remove from DOM
	  this.parent.element.removeChild( this.holder );
	  TapListener.prototype.destroy.call( this );
	};
	
	PageDots.prototype.setDots = function() {
	  // get difference between number of slides and number of dots
	  var delta = this.parent.slides.length - this.dots.length;
	  if ( delta > 0 ) {
	    this.addDots( delta );
	  } else if ( delta < 0 ) {
	    this.removeDots( -delta );
	  }
	};
	
	PageDots.prototype.addDots = function( count ) {
	  var fragment = document.createDocumentFragment();
	  var newDots = [];
	  while ( count ) {
	    var dot = document.createElement('li');
	    dot.className = 'dot';
	    fragment.appendChild( dot );
	    newDots.push( dot );
	    count--;
	  }
	  this.holder.appendChild( fragment );
	  this.dots = this.dots.concat( newDots );
	};
	
	PageDots.prototype.removeDots = function( count ) {
	  // remove from this.dots collection
	  var removeDots = this.dots.splice( this.dots.length - count, count );
	  // remove from DOM
	  removeDots.forEach( function( dot ) {
	    this.holder.removeChild( dot );
	  }, this );
	};
	
	PageDots.prototype.updateSelected = function() {
	  // remove selected class on previous
	  if ( this.selectedDot ) {
	    this.selectedDot.className = 'dot';
	  }
	  // don't proceed if no dots
	  if ( !this.dots.length ) {
	    return;
	  }
	  this.selectedDot = this.dots[ this.parent.selectedIndex ];
	  this.selectedDot.className = 'dot is-selected';
	};
	
	PageDots.prototype.onTap = function( event ) {
	  var target = event.target;
	  // only care about dot clicks
	  if ( target.nodeName != 'LI' ) {
	    return;
	  }
	
	  this.parent.uiChange();
	  var index = this.dots.indexOf( target );
	  this.parent.select( index );
	};
	
	PageDots.prototype.destroy = function() {
	  this.deactivate();
	};
	
	Flickity.PageDots = PageDots;
	
	// -------------------------- Flickity -------------------------- //
	
	utils.extend( Flickity.defaults, {
	  pageDots: true
	});
	
	Flickity.createMethods.push('_createPageDots');
	
	var proto = Flickity.prototype;
	
	proto._createPageDots = function() {
	  if ( !this.options.pageDots ) {
	    return;
	  }
	  this.pageDots = new PageDots( this );
	  // events
	  this.on( 'activate', this.activatePageDots );
	  this.on( 'select', this.updateSelectedPageDots );
	  this.on( 'cellChange', this.updatePageDots );
	  this.on( 'resize', this.updatePageDots );
	  this.on( 'deactivate', this.deactivatePageDots );
	
	  this.pageDots.on( 'pointerDown', function( event ) {
	    this.childUIPointerDown( event );
	  }.bind( this ));
	};
	
	proto.activatePageDots = function() {
	  this.pageDots.activate();
	};
	
	proto.updateSelectedPageDots = function() {
	  this.pageDots.updateSelected();
	};
	
	proto.updatePageDots = function() {
	  this.pageDots.setDots();
	};
	
	proto.deactivatePageDots = function() {
	  this.pageDots.deactivate();
	};
	
	// -----  ----- //
	
	Flickity.PageDots = PageDots;
	
	return Flickity;
	
	}));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// player & autoPlay
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(5),
	      __webpack_require__(7),
	      __webpack_require__(4)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( EvEmitter, utils, Flickity ) {
	      return factory( EvEmitter, utils, Flickity );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      require('ev-emitter'),
	      require('fizzy-ui-utils'),
	      require('./flickity')
	    );
	  } else {
	    // browser global
	    factory(
	      window.EvEmitter,
	      window.fizzyUIUtils,
	      window.Flickity
	    );
	  }
	
	}( window, function factory( EvEmitter, utils, Flickity ) {
	
	'use strict';
	
	// -------------------------- Page Visibility -------------------------- //
	// https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API
	
	var hiddenProperty, visibilityEvent;
	if ( 'hidden' in document ) {
	  hiddenProperty = 'hidden';
	  visibilityEvent = 'visibilitychange';
	} else if ( 'webkitHidden' in document ) {
	  hiddenProperty = 'webkitHidden';
	  visibilityEvent = 'webkitvisibilitychange';
	}
	
	// -------------------------- Player -------------------------- //
	
	function Player( parent ) {
	  this.parent = parent;
	  this.state = 'stopped';
	  // visibility change event handler
	  if ( visibilityEvent ) {
	    this.onVisibilityChange = function() {
	      this.visibilityChange();
	    }.bind( this );
	    this.onVisibilityPlay = function() {
	      this.visibilityPlay();
	    }.bind( this );
	  }
	}
	
	Player.prototype = Object.create( EvEmitter.prototype );
	
	// start play
	Player.prototype.play = function() {
	  if ( this.state == 'playing' ) {
	    return;
	  }
	  // do not play if page is hidden, start playing when page is visible
	  var isPageHidden = document[ hiddenProperty ];
	  if ( visibilityEvent && isPageHidden ) {
	    document.addEventListener( visibilityEvent, this.onVisibilityPlay );
	    return;
	  }
	
	  this.state = 'playing';
	  // listen to visibility change
	  if ( visibilityEvent ) {
	    document.addEventListener( visibilityEvent, this.onVisibilityChange );
	  }
	  // start ticking
	  this.tick();
	};
	
	Player.prototype.tick = function() {
	  // do not tick if not playing
	  if ( this.state != 'playing' ) {
	    return;
	  }
	
	  var time = this.parent.options.autoPlay;
	  // default to 3 seconds
	  time = typeof time == 'number' ? time : 3000;
	  var _this = this;
	  // HACK: reset ticks if stopped and started within interval
	  this.clear();
	  this.timeout = setTimeout( function() {
	    _this.parent.next( true );
	    _this.tick();
	  }, time );
	};
	
	Player.prototype.stop = function() {
	  this.state = 'stopped';
	  this.clear();
	  // remove visibility change event
	  if ( visibilityEvent ) {
	    document.removeEventListener( visibilityEvent, this.onVisibilityChange );
	  }
	};
	
	Player.prototype.clear = function() {
	  clearTimeout( this.timeout );
	};
	
	Player.prototype.pause = function() {
	  if ( this.state == 'playing' ) {
	    this.state = 'paused';
	    this.clear();
	  }
	};
	
	Player.prototype.unpause = function() {
	  // re-start play if paused
	  if ( this.state == 'paused' ) {
	    this.play();
	  }
	};
	
	// pause if page visibility is hidden, unpause if visible
	Player.prototype.visibilityChange = function() {
	  var isPageHidden = document[ hiddenProperty ];
	  this[ isPageHidden ? 'pause' : 'unpause' ]();
	};
	
	Player.prototype.visibilityPlay = function() {
	  this.play();
	  document.removeEventListener( visibilityEvent, this.onVisibilityPlay );
	};
	
	// -------------------------- Flickity -------------------------- //
	
	utils.extend( Flickity.defaults, {
	  pauseAutoPlayOnHover: true
	});
	
	Flickity.createMethods.push('_createPlayer');
	var proto = Flickity.prototype;
	
	proto._createPlayer = function() {
	  this.player = new Player( this );
	
	  this.on( 'activate', this.activatePlayer );
	  this.on( 'uiChange', this.stopPlayer );
	  this.on( 'pointerDown', this.stopPlayer );
	  this.on( 'deactivate', this.deactivatePlayer );
	};
	
	proto.activatePlayer = function() {
	  if ( !this.options.autoPlay ) {
	    return;
	  }
	  this.player.play();
	  this.element.addEventListener( 'mouseenter', this );
	};
	
	// Player API, don't hate the ... thanks I know where the door is
	
	proto.playPlayer = function() {
	  this.player.play();
	};
	
	proto.stopPlayer = function() {
	  this.player.stop();
	};
	
	proto.pausePlayer = function() {
	  this.player.pause();
	};
	
	proto.unpausePlayer = function() {
	  this.player.unpause();
	};
	
	proto.deactivatePlayer = function() {
	  this.player.stop();
	  this.element.removeEventListener( 'mouseenter', this );
	};
	
	// ----- mouseenter/leave ----- //
	
	// pause auto-play on hover
	proto.onmouseenter = function() {
	  if ( !this.options.pauseAutoPlayOnHover ) {
	    return;
	  }
	  this.player.pause();
	  this.element.addEventListener( 'mouseleave', this );
	};
	
	// resume auto-play on hover off
	proto.onmouseleave = function() {
	  this.player.unpause();
	  this.element.removeEventListener( 'mouseleave', this );
	};
	
	// -----  ----- //
	
	Flickity.Player = Player;
	
	return Flickity;
	
	}));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// add, remove cell
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(4),
	      __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Flickity, utils ) {
	      return factory( window, Flickity, utils );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('./flickity'),
	      require('fizzy-ui-utils')
	    );
	  } else {
	    // browser global
	    factory(
	      window,
	      window.Flickity,
	      window.fizzyUIUtils
	    );
	  }
	
	}( window, function factory( window, Flickity, utils ) {
	
	'use strict';
	
	// append cells to a document fragment
	function getCellsFragment( cells ) {
	  var fragment = document.createDocumentFragment();
	  cells.forEach( function( cell ) {
	    fragment.appendChild( cell.element );
	  });
	  return fragment;
	}
	
	// -------------------------- add/remove cell prototype -------------------------- //
	
	var proto = Flickity.prototype;
	
	/**
	 * Insert, prepend, or append cells
	 * @param {Element, Array, NodeList} elems
	 * @param {Integer} index
	 */
	proto.insert = function( elems, index ) {
	  var cells = this._makeCells( elems );
	  if ( !cells || !cells.length ) {
	    return;
	  }
	  var len = this.cells.length;
	  // default to append
	  index = index === undefined ? len : index;
	  // add cells with document fragment
	  var fragment = getCellsFragment( cells );
	  // append to slider
	  var isAppend = index == len;
	  if ( isAppend ) {
	    this.slider.appendChild( fragment );
	  } else {
	    var insertCellElement = this.cells[ index ].element;
	    this.slider.insertBefore( fragment, insertCellElement );
	  }
	  // add to this.cells
	  if ( index === 0 ) {
	    // prepend, add to start
	    this.cells = cells.concat( this.cells );
	  } else if ( isAppend ) {
	    // append, add to end
	    this.cells = this.cells.concat( cells );
	  } else {
	    // insert in this.cells
	    var endCells = this.cells.splice( index, len - index );
	    this.cells = this.cells.concat( cells ).concat( endCells );
	  }
	
	  this._sizeCells( cells );
	
	  var selectedIndexDelta = index > this.selectedIndex ? 0 : cells.length;
	  this._cellAddedRemoved( index, selectedIndexDelta );
	};
	
	proto.append = function( elems ) {
	  this.insert( elems, this.cells.length );
	};
	
	proto.prepend = function( elems ) {
	  this.insert( elems, 0 );
	};
	
	/**
	 * Remove cells
	 * @param {Element, Array, NodeList} elems
	 */
	proto.remove = function( elems ) {
	  var cells = this.getCells( elems );
	  var selectedIndexDelta = 0;
	  var len = cells.length;
	  var i, cell;
	  // calculate selectedIndexDelta, easier if done in seperate loop
	  for ( i=0; i < len; i++ ) {
	    cell = cells[i];
	    var wasBefore = this.cells.indexOf( cell ) < this.selectedIndex;
	    selectedIndexDelta -= wasBefore ? 1 : 0;
	  }
	
	  for ( i=0; i < len; i++ ) {
	    cell = cells[i];
	    cell.remove();
	    // remove item from collection
	    utils.removeFrom( this.cells, cell );
	  }
	
	  if ( cells.length ) {
	    // update stuff
	    this._cellAddedRemoved( 0, selectedIndexDelta );
	  }
	};
	
	// updates when cells are added or removed
	proto._cellAddedRemoved = function( changedCellIndex, selectedIndexDelta ) {
	  // TODO this math isn't perfect with grouped slides
	  selectedIndexDelta = selectedIndexDelta || 0;
	  this.selectedIndex += selectedIndexDelta;
	  this.selectedIndex = Math.max( 0, Math.min( this.slides.length - 1, this.selectedIndex ) );
	
	  this.cellChange( changedCellIndex, true );
	  // backwards compatibility
	  this.emitEvent( 'cellAddedRemoved', [ changedCellIndex, selectedIndexDelta ] );
	};
	
	/**
	 * logic to be run after a cell's size changes
	 * @param {Element} elem - cell's element
	 */
	proto.cellSizeChange = function( elem ) {
	  var cell = this.getCell( elem );
	  if ( !cell ) {
	    return;
	  }
	  cell.getSize();
	
	  var index = this.cells.indexOf( cell );
	  this.cellChange( index );
	};
	
	/**
	 * logic any time a cell is changed: added, removed, or size changed
	 * @param {Integer} changedCellIndex - index of the changed cell, optional
	 */
	proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
	  var prevSlideableWidth = this.slideableWidth;
	  this._positionCells( changedCellIndex );
	  this._getWrapShiftCells();
	  this.setGallerySize();
	  this.emitEvent( 'cellChange', [ changedCellIndex ] );
	  // position slider
	  if ( this.options.freeScroll ) {
	    // shift x by change in slideableWidth
	    // TODO fix position shifts when prepending w/ freeScroll
	    var deltaX = prevSlideableWidth - this.slideableWidth;
	    this.x += deltaX * this.cellAlign;
	    this.positionSlider();
	  } else {
	    // do not position slider after lazy load
	    if ( isPositioningSlider ) {
	      this.positionSliderAtSelected();
	    }
	    this.select( this.selectedIndex );
	  }
	};
	
	// -----  ----- //
	
	return Flickity;
	
	}));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// lazyload
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(4),
	      __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Flickity, utils ) {
	      return factory( window, Flickity, utils );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('./flickity'),
	      require('fizzy-ui-utils')
	    );
	  } else {
	    // browser global
	    factory(
	      window,
	      window.Flickity,
	      window.fizzyUIUtils
	    );
	  }
	
	}( window, function factory( window, Flickity, utils ) {
	'use strict';
	
	Flickity.createMethods.push('_createLazyload');
	var proto = Flickity.prototype;
	
	proto._createLazyload = function() {
	  this.on( 'select', this.lazyLoad );
	};
	
	proto.lazyLoad = function() {
	  var lazyLoad = this.options.lazyLoad;
	  if ( !lazyLoad ) {
	    return;
	  }
	  // get adjacent cells, use lazyLoad option for adjacent count
	  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
	  var cellElems = this.getAdjacentCellElements( adjCount );
	  // get lazy images in those cells
	  var lazyImages = [];
	  cellElems.forEach( function( cellElem ) {
	    var lazyCellImages = getCellLazyImages( cellElem );
	    lazyImages = lazyImages.concat( lazyCellImages );
	  });
	  // load lazy images
	  lazyImages.forEach( function( img ) {
	    new LazyLoader( img, this );
	  }, this );
	};
	
	function getCellLazyImages( cellElem ) {
	  // check if cell element is lazy image
	  if ( cellElem.nodeName == 'IMG' &&
	    cellElem.getAttribute('data-flickity-lazyload') ) {
	    return [ cellElem ];
	  }
	  // select lazy images in cell
	  var imgs = cellElem.querySelectorAll('img[data-flickity-lazyload]');
	  return utils.makeArray( imgs );
	}
	
	// -------------------------- LazyLoader -------------------------- //
	
	/**
	 * class to handle loading images
	 */
	function LazyLoader( img, flickity ) {
	  this.img = img;
	  this.flickity = flickity;
	  this.load();
	}
	
	LazyLoader.prototype.handleEvent = utils.handleEvent;
	
	LazyLoader.prototype.load = function() {
	  this.img.addEventListener( 'load', this );
	  this.img.addEventListener( 'error', this );
	  // load image
	  this.img.src = this.img.getAttribute('data-flickity-lazyload');
	  // remove attr
	  this.img.removeAttribute('data-flickity-lazyload');
	};
	
	LazyLoader.prototype.onload = function( event ) {
	  this.complete( event, 'flickity-lazyloaded' );
	};
	
	LazyLoader.prototype.onerror = function( event ) {
	  this.complete( event, 'flickity-lazyerror' );
	};
	
	LazyLoader.prototype.complete = function( event, className ) {
	  // unbind events
	  this.img.removeEventListener( 'load', this );
	  this.img.removeEventListener( 'error', this );
	
	  var cell = this.flickity.getParentCell( this.img );
	  var cellElem = cell && cell.element;
	  this.flickity.cellSizeChange( cellElem );
	
	  this.img.classList.add( className );
	  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
	};
	
	// -----  ----- //
	
	Flickity.LazyLoader = LazyLoader;
	
	return Flickity;
	
	}));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityDirective.$inject = ["$timeout", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityDirective = FlickityDirective;
	
	var _flickity = __webpack_require__(22);
	
	function FlickityDirective($timeout, FlickityService) {
	    'ngInject';
	
	    preLinkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    postLinkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickity: '@?',
	            bcFlickityId: '@?'
	        },
	        compile: function compile() {
	            return {
	                pre: preLinkFunction,
	                post: postLinkFunction
	            };
	        },
	        controller: _flickity.FlickityController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    function preLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // If no ID was passed in
	
	        if (!$controller.bcFlickityId) {
	            // Use the element's ID if one exists
	            if ($attrs.id) {
	                $controller.bcFlickityId = $attrs.id;
	            }
	        }
	    }
	
	    /**
	     * Post Link
	     */
	    function postLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Make sure this `create()` gets picked up in the next digest cycle
	
	        $timeout(function () {
	
	            // Initialize Flickity
	            FlickityService.create($element[0], $controller.bcFlickityId, $controller.options).then(function (flickityInstance) {
	
	                // Expose the Flickity instance and ID
	                $controller.Flickity = flickityInstance.instance;
	                $controller.bcFlickityId = flickityInstance.id;
	            });
	        });
	
	        // When the directive is being destroyed
	        var onDestroy = $scope.$on('$destroy', function (event) {
	            // Make sure we destroy the Flickity instance
	            FlickityService.destroy($controller.bcFlickityId);
	        });
	    }
	} /* global Flickity */

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FlickityController = exports.FlickityController = function () {
	    FlickityController.$inject = ["FlickityConfig"];
	    function FlickityController(FlickityConfig) {
	        'ngInject';
	
	        _classCallCheck(this, FlickityController);
	
	        this.FlickityConfig = FlickityConfig;
	
	        this._activate();
	    }
	
	    _createClass(FlickityController, [{
	        key: '_activate',
	        value: function _activate() {
	
	            // Extend the default options with user configuration
	            this.options = angular.extend({}, this.FlickityConfig, angular.fromJson(this.bcFlickity));
	        }
	    }]);
	
	    return FlickityController;
	}();

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityNextDirective.$inject = ["$log", "$timeout", "$rootScope", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityNextDirective = FlickityNextDirective;
	
	var _next = __webpack_require__(24);
	
	function FlickityNextDirective($log, $timeout, $rootScope, FlickityConfig, FlickityService) {
	    'ngInject';
	
	    preLinkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickityNext: '=?',
	            bcFlickityId: '@?'
	        },
	        compile: function compile() {
	            return {
	                pre: preLinkFunction
	            };
	        },
	        controller: _next.NextController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Pre Link
	     */
	    function preLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Get the ID
	
	        var ID = $controller.flickityId;
	
	        // Define the broadcast names to listen for
	        var selectEvent = 'Flickity:' + ID + ':cellSelect';
	        var settleEvent = 'Flickity:' + $controller.flickityId + ':settle';
	
	        // Listen
	        var cellSelect = $rootScope.$on(selectEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.cells.length, data.instance.selectedIndex + 1);
	        });
	        var settle = $rootScope.$on(settleEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.cells.length, data.instance.selectedIndex + 1);
	        });
	
	        $element.on('click', function () {
	
	            // Move to the next cell
	            FlickityService.next($controller.flickityId, $controller.wrapAround);
	        });
	
	        /**
	         * Disable button if needed
	         *
	         * @param {Int} index
	         */
	        function _disableButtonIfNeeded(index, cellCount) {
	
	            // Disable button if at the beginning and we shouldn't wrap
	            if (!$controller.wrapAround && index === cellCount) {
	                $attrs.$set('disabled', 'disabled');
	            } else {
	                $attrs.$set('disabled', false);
	            }
	        }
	    }
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NextController = exports.NextController = function () {
	    NextController.$inject = ["$log", "$q", "$timeout", "FlickityConfig", "FlickityService"];
	    function NextController($log, $q, $timeout, FlickityConfig, FlickityService) {
	        'ngInject';
	
	        _classCallCheck(this, NextController);
	
	        this.$log = $log;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.FlickityConfig = FlickityConfig;
	        this.FlickityService = FlickityService;
	
	        this._activate();
	    }
	
	    _createClass(NextController, [{
	        key: '_activate',
	        value: function _activate() {
	            // Assign or fall back to default
	            this.wrapAround = this.bcFlickityNext || this.FlickityConfig.wrapAround;
	            this.flickityId = null;
	
	            // Make sure we have an ID
	            this._setId();
	        }
	
	        /**
	         * Set ID to what is defined, fallback to first instance
	         *
	         * @return {String} flickityId
	         */
	
	    }, {
	        key: '_setId',
	        value: function _setId() {
	            var _this = this;
	
	            return this.$q(function (resolve, reject) {
	
	                if (_this.bcFlickityId) {
	                    _this.flickityId = _this.bcFlickityId;
	                    resolve(_this.flickityId);
	                } else {
	                    _this.$timeout(function () {
	                        _this.FlickityService.getFirst().then(function (instance) {
	                            _this.flickityId = instance.id;
	                            resolve(_this.flickityId);
	                        }).catch(function (error) {
	                            _this.$log.warn(error);
	                            reject(error);
	                        });
	                    });
	                }
	            });
	        }
	    }]);
	
	    return NextController;
	}();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityPreviousDirective.$inject = ["$log", "$timeout", "$rootScope", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityPreviousDirective = FlickityPreviousDirective;
	
	var _previous = __webpack_require__(26);
	
	function FlickityPreviousDirective($log, $timeout, $rootScope, FlickityConfig, FlickityService) {
	    'ngInject';
	
	    preLinkFunction.$inject = ["$scope", "$element", "$attrs", "$controller"];
	    var directive = {
	        restrict: 'A',
	        scope: {},
	        bindToController: {
	            bcFlickityPrevious: '=?',
	            bcFlickityId: '@?'
	        },
	        compile: function compile() {
	            return {
	                pre: preLinkFunction
	            };
	        },
	        controller: _previous.PreviousController,
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    /**
	     * Pre Link
	     */
	    function preLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Get the ID
	
	        var ID = $controller.flickityId;
	
	        // Define the broadcast names to listen for
	        var selectEvent = 'Flickity:' + ID + ':cellSelect';
	        var settleEvent = 'Flickity:' + $controller.flickityId + ':settle';
	
	        // Listen
	        var cellSelect = $rootScope.$on(selectEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.selectedIndex);
	        });
	        var settle = $rootScope.$on(settleEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.selectedIndex);
	        });
	
	        $element.on('click', function () {
	
	            // Move to the next cell
	            FlickityService.previous($controller.flickityId, $controller.wrapAround);
	        });
	
	        /**
	         * Disable button if needed
	         *
	         * @param {Int} index
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

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PreviousController = exports.PreviousController = function () {
	    PreviousController.$inject = ["$log", "$q", "$timeout", "FlickityConfig", "FlickityService"];
	    function PreviousController($log, $q, $timeout, FlickityConfig, FlickityService) {
	        'ngInject';
	
	        _classCallCheck(this, PreviousController);
	
	        this.$log = $log;
	        this.$q = $q;
	        this.$timeout = $timeout;
	        this.FlickityConfig = FlickityConfig;
	        this.FlickityService = FlickityService;
	
	        this._activate();
	    }
	
	    _createClass(PreviousController, [{
	        key: '_activate',
	        value: function _activate() {
	            // Assign or fall back to default
	            this.wrapAround = this.bcFlickityPrevious || this.FlickityConfig.wrapAround;
	            this.flickityId = null;
	
	            // Make sure we have an ID
	            this._setId();
	        }
	
	        /**
	         * Set ID to what is defined, fallback to first instance
	         *
	         * @return {String} flickityId
	         */
	
	    }, {
	        key: '_setId',
	        value: function _setId() {
	            var _this = this;
	
	            return this.$q(function (resolve, reject) {
	
	                if (_this.bcFlickityId) {
	                    _this.flickityId = _this.bcFlickityId;
	                    resolve(_this.flickityId);
	                } else {
	                    _this.$timeout(function () {
	                        _this.FlickityService.getFirst().then(function (instance) {
	                            _this.flickityId = instance.id;
	                            resolve(_this.flickityId);
	                        }).catch(function (error) {
	                            _this.$log.warn(error);
	                            reject(error);
	                        });
	                    });
	                }
	            });
	        }
	    }]);
	
	    return PreviousController;
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-flickity.js.map