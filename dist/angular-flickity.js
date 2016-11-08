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
	
	var _flickityNext = __webpack_require__(5);
	
	var _flickityPrevious = __webpack_require__(7);
	
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//import Flickity from 'flickity';
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
	        value: function create(element, id, options) {
	            var _this = this;
	
	            return new Promise(function (resolve, reject) {
	                // If no ID was passed in
	                if (!id) {
	                    if (element.id) {
	                        // Use the element's ID if it exists
	                        id = element.id;
	                    } else {
	                        // Otherwise, assign a new ID
	                        id = _this.instances.length + 1;
	                    }
	                }
	
	                // Check to see if the ID is already in use
	                if (_this._findObjectById(_this.instances, id)) {
	                    var index = _this._getFlickityIndex(id);
	                    _this.$log.error('This ID is already in use: ', _this.instances[index]);
	
	                    reject();
	                }
	
	                // Define the new instance
	                var instance = {
	                    id: id,
	                    instance: new Flickity(element, options)
	                };
	
	                // Save this instance to the array
	                _this.instances.push(instance);
	
	                // Bind to all events
	                return _this._bindEvents(id).then(function () {
	                    return resolve(instance);
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
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this2._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                }
	
	                // Destroy the Flickity instance
	                _this2.instances[flickityIndex].instance.destroy();
	
	                // Remove the instance from the array
	                _this2.instances.splice(flickityIndex, 1);
	
	                return resolve('Instance ' + id + ' destroyed.');
	            });
	        }
	
	        /**
	         * Return all instances
	         *
	         * @return {Array} instances
	         */
	
	    }, {
	        key: 'getAll',
	        value: function getAll() {
	            var _this3 = this;
	
	            return new Promise(function (resolve, reject) {
	                resolve(_this3.instances);
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
	            var _this4 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this4._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the next slide
	                    _this4.instances[flickityIndex].instance.next(isWrapped, isInstant);
	
	                    // Return the instance
	                    return resolve(_this4.instances[flickityIndex]);
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
	            var _this5 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this5._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the previous slide
	                    _this5.instances[flickityIndex].instance.previous(isWrapped, isInstant);
	
	                    // Return the instance
	                    return resolve(_this5.instances[flickityIndex]);
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
	            var _this6 = this;
	
	            var isWrapped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var isInstant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this6._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the selected slide
	                    _this6.instances[flickityIndex].instance.select(index, isWrapped, isInstant);
	
	                    // Return the instance
	                    return resolve(_this6.instances[flickityIndex]);
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
	            var _this7 = this;
	
	            var isWrapped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	            var isInstant = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this7._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Move to the selected slide
	                    _this7.instances[flickityIndex].instance.selectCell(value, isWrapped, isInstant);
	
	                    // Return the instance
	                    return resolve(_this7.instances[flickityIndex]);
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
	            var _this8 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this8._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Return the current index
	                    return resolve(_this8.instances[flickityIndex].instance.selectedIndex);
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
	            var _this9 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this9._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Trigger the resize
	                    _this9.instances[flickityIndex].instance.resize();
	
	                    // Return the instance
	                    return resolve(_this9.instances[flickityIndex]);
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
	            var _this10 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this10._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Trigger the reposition
	                    _this10.instances[flickityIndex].instance.reposition();
	
	                    // Return the instance
	                    return resolve(_this10.instances[flickityIndex]);
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
	            var _this11 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this11._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Reload cells
	                    _this11.instances[flickityIndex].instance.reloadCells();
	
	                    // Return the instance
	                    return resolve(_this11.instances[flickityIndex]);
	                }
	            });
	        }
	
	        /**
	         * Get a Flickity instance by ID
	         *
	         * @param {String} id
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'get',
	        value: function get(id) {
	            var _this12 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this12._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Return the instance
	                    return resolve(_this12.instances[flickityIndex]);
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
	            var _this13 = this;
	
	            return new Promise(function (resolve, reject) {
	                if (!_this13.instances || _this13.instances.length < 1) {
	                    return reject('No instances exist');
	                } else {
	                    // Return the instance
	                    return resolve(_this13.instances[0]);
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
	            return new Promise(function (resolve, reject) {
	                var instance = Flickity.data(element);
	
	                if (instance) {
	                    // Return the instance
	                    return resolve(instance);
	                } else {
	                    return reject('Instance not found for ' + element);
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
	            var _this14 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this14._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Prepend the slides
	                    _this14.instances[flickityIndex].instance.prepend(elements);
	
	                    // Return the instance
	                    return resolve(_this14.instances[flickityIndex]);
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
	            var _this15 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this15._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Append the slides
	                    _this15.instances[flickityIndex].instance.append(elements);
	
	                    // Return the instance
	                    return resolve(_this15.instances[flickityIndex]);
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
	            var _this16 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this16._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Insert the slides
	                    _this16.instances[flickityIndex].instance.insert(elements, index);
	
	                    // Return the instance
	                    return resolve(_this16.instances[flickityIndex]);
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
	            var _this17 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this17._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Return the array of cell elements
	                    return resolve(_this17.instances[flickityIndex].instance.getCellElements());
	                }
	            });
	        }
	
	        /**
	         * Remove cells by element
	         *
	         * @param {String} id
	         * @param {Object|Array|Element} element(s)
	         * @return {Object} instance
	         */
	
	    }, {
	        key: 'remove',
	        value: function remove(id, elements) {
	            var _this18 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this18._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    _this18.instances[flickityIndex].instance.remove(elements);
	
	                    // Return the instance
	                    return resolve(_this18.instances[flickityIndex]);
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
	            var _this19 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this19._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Return the selected element
	                    return resolve(_this19.instances[flickityIndex].instance.selectedElement);
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
	            var _this20 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this20._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject('Instance ' + id + ' not found');
	                } else {
	                    // Return the array of cells
	                    return resolve(_this20.instances[flickityIndex].instance.cells);
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
	            var NOT_FOUND = -1;
	
	            // If no instances exist
	            if (!this.instances.length) {
	
	                foundIndex = NOT_FOUND;
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
	
	        /**
	         * Bind all events for a new instance
	         *
	         * @param {String} id
	         * @return {Bool} isFinished
	         */
	
	    }, {
	        key: '_bindEvents',
	        value: function _bindEvents(id) {
	            var _this21 = this;
	
	            return new Promise(function (resolve, reject) {
	                var flickityIndex = _this21._getFlickityIndex(id);
	
	                if (flickityIndex < 0) {
	                    return reject();
	                }
	
	                var ID = _this21.instances[flickityIndex].id;
	
	                _this21.instances[flickityIndex].instance.on('select', function () {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':select', _this21.instances[flickityIndex]);
	                });
	
	                _this21.instances[flickityIndex].instance.on('settle', function () {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':settle', _this21.instances[flickityIndex]);
	                });
	
	                _this21.instances[flickityIndex].instance.on('scroll', function (progress, positionX) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':scroll', {
	                        progress: progress,
	                        positionX: positionX
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('dragStart', function (event, pointer) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':dragStart', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('dragMove', function (event, pointer, moveVector) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':dragMove', {
	                        event: event,
	                        pointer: pointer,
	                        moveVector: moveVector
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('dragEnd', function (event, pointer) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':dragEnd', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('pointerDown', function (event, pointer) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':pointerDown', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('pointerMove', function (event, pointer, moveVector) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':pointerMove', {
	                        event: event,
	                        pointer: pointer,
	                        moveVector: moveVector
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('pointerUp', function (event, pointer) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':pointerUp', {
	                        event: event,
	                        pointer: pointer
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('staticClick', function (event, pointer, cellElement, cellIndex) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':staticClick', {
	                        event: event,
	                        pointer: pointer,
	                        cellElement: cellElement,
	                        cellIndex: cellIndex
	                    });
	                });
	
	                _this21.instances[flickityIndex].instance.on('lazyLoad', function (event, cellElement) {
	                    _this21.$rootScope.$emit('Flickity:' + ID + ':lazyLoad', {
	                        event: event,
	                        cellElement: cellElement
	                    });
	                });
	
	                return resolve(true);
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

	'use strict';
	
	FlickityDirective.$inject = ["$timeout", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityDirective = FlickityDirective;
	
	var _flickity = __webpack_require__(4);
	
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
/* 4 */
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
	            this.options = angular.extend({}, this.FlickityConfig, angular.fromJson(this.bcFlickity || {}));
	        }
	    }]);
	
	    return FlickityController;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityNextDirective.$inject = ["$log", "$timeout", "$rootScope", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityNextDirective = FlickityNextDirective;
	
	var _next = __webpack_require__(6);
	
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityPreviousDirective.$inject = ["$log", "$timeout", "$rootScope", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityPreviousDirective = FlickityPreviousDirective;
	
	var _previous = __webpack_require__(8);
	
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
/* 8 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiYmU2NjFjYjdkM2U5YTE4YjgxMSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzPzFmMzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5wcm92aWRlci5qcz8wMWY1Iiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzP2FkYTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzP2Y2MjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LmNvbnRyb2xsZXIuanM/YWQ4OCIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9mbGlja2l0eU5leHQuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9uZXh0L2ZsaWNraXR5TmV4dC5kaXJlY3RpdmUuanM/OGUzZCIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHQvbmV4dC5jb250cm9sbGVyLmpzPzAxOWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZXZpb3VzL2ZsaWNraXR5UHJldmlvdXMuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9wcmV2aW91cy9mbGlja2l0eVByZXZpb3VzLmRpcmVjdGl2ZS5qcz84NzYxIiwid2VicGFjazovLy8uL3NyYy9wcmV2aW91cy9wcmV2aW91cy5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9wcmV2aW91cy9wcmV2aW91cy5jb250cm9sbGVyLmpzP2I4ZjkiXSwibmFtZXMiOlsiYW5ndWxhciIsIm1vZHVsZSIsInByb3ZpZGVyIiwic2VydmljZSIsImRpcmVjdGl2ZSIsIkZsaWNraXR5Q29uZmlnUHJvdmlkZXIiLCJhY2Nlc3NpYmlsaXR5IiwiYWRhcHRpdmVIZWlnaHQiLCJhdXRvUGxheSIsImNlbGxBbGlnbiIsImNlbGxTZWxlY3RvciIsInVuZGVmaW5lZCIsImNvbnRhaW4iLCJkcmFnZ2FibGUiLCJkcmFnVGhyZXNob2xkIiwiZnJlZVNjcm9sbCIsImZyZWVTY3JvbGxGcmljdGlvbiIsInNlbGVjdGVkQXR0cmFjdGlvbiIsImZyaWN0aW9uIiwiZ3JvdXBDZWxscyIsImluaXRpYWxJbmRleCIsImxhenlMb2FkIiwicGVyY2VudFBvc2l0aW9uIiwicHJldk5leHRCdXR0b25zIiwicGFnZURvdHMiLCJyZXNpemUiLCJyaWdodFRvTGVmdCIsInNldEdhbGxlcnlTaXplIiwid2F0Y2hDU1MiLCJ3cmFwQXJvdW5kIiwiaW1hZ2VzTG9hZGVkIiwiYXNOYXZGb3IiLCIkdGltZW91dCIsIiRxIiwiJHJvb3RTY29wZSIsIiRsb2ciLCJpbnN0YW5jZXMiLCJlbGVtZW50IiwiaWQiLCJvcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsZW5ndGgiLCJfZmluZE9iamVjdEJ5SWQiLCJpbmRleCIsIl9nZXRGbGlja2l0eUluZGV4IiwiZXJyb3IiLCJpbnN0YW5jZSIsIkZsaWNraXR5IiwicHVzaCIsIl9iaW5kRXZlbnRzIiwidGhlbiIsImZsaWNraXR5SW5kZXgiLCJkZXN0cm95Iiwic3BsaWNlIiwiaXNXcmFwcGVkIiwiaXNJbnN0YW50IiwibmV4dCIsInByZXZpb3VzIiwic2VsZWN0IiwidmFsdWUiLCJzZWxlY3RDZWxsIiwic2VsZWN0ZWRJbmRleCIsInJlcG9zaXRpb24iLCJyZWxvYWRDZWxscyIsImRhdGEiLCJlbGVtZW50cyIsInByZXBlbmQiLCJhcHBlbmQiLCJpbnNlcnQiLCJnZXRDZWxsRWxlbWVudHMiLCJyZW1vdmUiLCJzZWxlY3RlZEVsZW1lbnQiLCJjZWxscyIsImZvdW5kSW5kZXgiLCJOT1RfRk9VTkQiLCJmb3JFYWNoIiwiSUQiLCJvbiIsIiRlbWl0IiwicHJvZ3Jlc3MiLCJwb3NpdGlvblgiLCJldmVudCIsInBvaW50ZXIiLCJtb3ZlVmVjdG9yIiwiY2VsbEVsZW1lbnQiLCJjZWxsSW5kZXgiLCJzb3VyY2UiLCJmaWx0ZXIiLCJvYmplY3QiLCJGbGlja2l0eURpcmVjdGl2ZSIsIkZsaWNraXR5U2VydmljZSIsInJlc3RyaWN0Iiwic2NvcGUiLCJiaW5kVG9Db250cm9sbGVyIiwiYmNGbGlja2l0eSIsImJjRmxpY2tpdHlJZCIsImNvbXBpbGUiLCJwcmUiLCJwcmVMaW5rRnVuY3Rpb24iLCJwb3N0IiwicG9zdExpbmtGdW5jdGlvbiIsImNvbnRyb2xsZXIiLCJjb250cm9sbGVyQXMiLCIkc2NvcGUiLCIkZWxlbWVudCIsIiRhdHRycyIsIiRjb250cm9sbGVyIiwiY3JlYXRlIiwiZmxpY2tpdHlJbnN0YW5jZSIsIm9uRGVzdHJveSIsIiRvbiIsIkZsaWNraXR5Q29uZmlnIiwiX2FjdGl2YXRlIiwiZXh0ZW5kIiwiZnJvbUpzb24iLCJGbGlja2l0eU5leHREaXJlY3RpdmUiLCJiY0ZsaWNraXR5TmV4dCIsImZsaWNraXR5SWQiLCJzZWxlY3RFdmVudCIsInNldHRsZUV2ZW50IiwiY2VsbFNlbGVjdCIsIl9kaXNhYmxlQnV0dG9uSWZOZWVkZWQiLCJzZXR0bGUiLCJjZWxsQ291bnQiLCIkc2V0IiwiX3NldElkIiwiZ2V0Rmlyc3QiLCJjYXRjaCIsIndhcm4iLCJGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlIiwiYmNGbGlja2l0eVByZXZpb3VzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUFVOzs7a0dBRTlDO0tDUjlELDRCQUNJM0YsTUFBTUYsSUFBSUQsVUFDVmlGLGdCQUFnQnJCLGlCQUNsQjtTQUNFOztTQURGOztTQUdFLEtBQUt6RCxPQUFPQTtTQUNaLEtBQUtGLEtBQUtBO1NBQ1YsS0FBS0QsV0FBV0E7U0FDaEIsS0FBS2lGLGlCQUFpQkE7U0FDdEIsS0FBS3JCLGtCQUFrQkE7O1NBR3ZCLEtBQUtzQjs7O0tEVVQsYUFBYSxvQkFBb0IsQ0FBQztTQUM5QixLQUFLO1NBQ0wsT0FBTyxTQUFTLFlDTFI7O2FBRVIsS0FBS3JGLGFBQWEsS0FBS3VHLHNCQUFzQixLQUFLbkIsZUFBZXBGO2FBQ2pFLEtBQUswRixhQUFhOzs7YUFHbEIsS0FBS1E7Ozs7Ozs7OztRRGNOO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxTQ05YO2FBQUE7O2FBRUwsT0FBTyxLQUFLOUYsR0FBRyxVQUFDUSxTQUFTQyxRQUFXOztpQkFFaEMsSUFBSSxNQUFLdUQsY0FBYztxQkFDbkIsTUFBS3NCLGFBQWEsTUFBS3RCO3FCQUN2QnhELFFBQVEsTUFBSzhFO3dCQUNWO3FCQUNILE1BQUt2RixTQUFTLFlBQU07eUJBQ2hCLE1BQUs0RCxnQkFBZ0JvQyxXQUNoQjVFLEtBQUssVUFBQ0osVUFBYTs2QkFDaEIsTUFBS3VFLGFBQWF2RSxTQUFTVjs2QkFDM0JHLFFBQVEsTUFBSzhFOzRCQUVoQlUsTUFBTSxVQUFDbEYsT0FBVTs2QkFDZCxNQUFLWixLQUFLK0YsS0FBS25GOzZCQUNmTCxPQUFPSzs7Ozs7Ozs7S0RhL0IsT0FBTyIsImZpbGUiOiJhbmd1bGFyLWZsaWNraXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJhbmd1bGFyLWZsaWNraXR5XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFuZ3VsYXItZmxpY2tpdHlcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiYW5ndWxhci1mbGlja2l0eVwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYmJlNjYxY2I3ZDNlOWExOGI4MTFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfZmxpY2tpdHkgPSByZXF1aXJlKCcuL2ZsaWNraXR5LnByb3ZpZGVyJyk7XG5cbnZhciBfZmxpY2tpdHkyID0gcmVxdWlyZSgnLi9mbGlja2l0eS5zZXJ2aWNlJyk7XG5cbnZhciBfZmxpY2tpdHkzID0gcmVxdWlyZSgnLi9mbGlja2l0eS5kaXJlY3RpdmUnKTtcblxudmFyIF9mbGlja2l0eU5leHQgPSByZXF1aXJlKCcuL25leHQvZmxpY2tpdHlOZXh0LmRpcmVjdGl2ZScpO1xuXG52YXIgX2ZsaWNraXR5UHJldmlvdXMgPSByZXF1aXJlKCcuL3ByZXZpb3VzL2ZsaWNraXR5UHJldmlvdXMuZGlyZWN0aXZlJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdiYy5GbGlja2l0eScsIFtdKS5wcm92aWRlcignRmxpY2tpdHlDb25maWcnLCBfZmxpY2tpdHkuRmxpY2tpdHlDb25maWdQcm92aWRlcikuc2VydmljZSgnRmxpY2tpdHlTZXJ2aWNlJywgX2ZsaWNraXR5Mi5GbGlja2l0eVNlcnZpY2UpLmRpcmVjdGl2ZSgnYmNGbGlja2l0eScsIF9mbGlja2l0eTMuRmxpY2tpdHlEaXJlY3RpdmUpLmRpcmVjdGl2ZSgnYmNGbGlja2l0eU5leHQnLCBfZmxpY2tpdHlOZXh0LkZsaWNraXR5TmV4dERpcmVjdGl2ZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5UHJldmlvdXMnLCBfZmxpY2tpdHlQcmV2aW91cy5GbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsImltcG9ydCB7IEZsaWNraXR5Q29uZmlnUHJvdmlkZXIgfSBmcm9tICcuL2ZsaWNraXR5LnByb3ZpZGVyJ1xuaW1wb3J0IHsgRmxpY2tpdHlTZXJ2aWNlIH0gZnJvbSAnLi9mbGlja2l0eS5zZXJ2aWNlJztcbmltcG9ydCB7IEZsaWNraXR5RGlyZWN0aXZlIH0gZnJvbSAnLi9mbGlja2l0eS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmxpY2tpdHlOZXh0RGlyZWN0aXZlIH0gZnJvbSAnLi9uZXh0L2ZsaWNraXR5TmV4dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSB9IGZyb20gJy4vcHJldmlvdXMvZmxpY2tpdHlQcmV2aW91cy5kaXJlY3RpdmUnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYmMuRmxpY2tpdHknLCBbXSlcbiAgICAucHJvdmlkZXIoJ0ZsaWNraXR5Q29uZmlnJywgRmxpY2tpdHlDb25maWdQcm92aWRlcilcbiAgICAuc2VydmljZSgnRmxpY2tpdHlTZXJ2aWNlJywgRmxpY2tpdHlTZXJ2aWNlKVxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHknLCBGbGlja2l0eURpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKCdiY0ZsaWNraXR5TmV4dCcsIEZsaWNraXR5TmV4dERpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKCdiY0ZsaWNraXR5UHJldmlvdXMnLCBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKVxuO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmxpY2tpdHlDb25maWdQcm92aWRlciA9IGV4cG9ydHMuRmxpY2tpdHlDb25maWdQcm92aWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpY2tpdHlDb25maWdQcm92aWRlcik7XG5cbiAgICAgICAgLy8gRGVmaW5lIEZsaWNraXR5IGRlZmF1bHRzXG4gICAgICAgIHRoaXMuYWNjZXNzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRhcHRpdmVIZWlnaHQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdXRvUGxheSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNlbGxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICB0aGlzLmNlbGxTZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jb250YWluID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmFnVGhyZXNob2xkID0gMztcbiAgICAgICAgdGhpcy5mcmVlU2Nyb2xsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZnJlZVNjcm9sbEZyaWN0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBdHRyYWN0aW9uID0gLjAyNTtcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IC4yODtcbiAgICAgICAgdGhpcy5ncm91cENlbGxzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW5pdGlhbEluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5sYXp5TG9hZCA9IHRydWU7XG4gICAgICAgIHRoaXMucGVyY2VudFBvc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcmV2TmV4dEJ1dHRvbnMgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2VEb3RzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNpemUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJpZ2h0VG9MZWZ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0R2FsbGVyeVNpemUgPSB0cnVlO1xuICAgICAgICB0aGlzLndhdGNoQ1NTID0gZmFsc2U7XG4gICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlc0xvYWRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuYXNOYXZGb3IgPSB0cnVlO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyLCBbe1xuICAgICAgICBrZXk6ICckZ2V0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICRnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyO1xufSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIERlZmluZSBGbGlja2l0eSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmFjY2Vzc2liaWxpdHkgICAgICA9IHRydWU7XG4gICAgICAgIHRoaXMuYWRhcHRpdmVIZWlnaHQgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXV0b1BsYXkgICAgICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2VsbEFsaWduICAgICAgICAgID0gJ2NlbnRlcic7XG4gICAgICAgIHRoaXMuY2VsbFNlbGVjdG9yICAgICAgID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbnRhaW4gICAgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRyYWdnYWJsZSAgICAgICAgICA9IHRydWU7XG4gICAgICAgIHRoaXMuZHJhZ1RocmVzaG9sZCAgICAgID0gMztcbiAgICAgICAgdGhpcy5mcmVlU2Nyb2xsICAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mcmVlU2Nyb2xsRnJpY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEF0dHJhY3Rpb24gPSAuMDI1O1xuICAgICAgICB0aGlzLmZyaWN0aW9uICAgICAgICAgICA9IC4yODtcbiAgICAgICAgdGhpcy5ncm91cENlbGxzICAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0aWFsSW5kZXggICAgICAgPSAwO1xuICAgICAgICB0aGlzLmxhenlMb2FkICAgICAgICAgICA9IHRydWU7XG4gICAgICAgIHRoaXMucGVyY2VudFBvc2l0aW9uICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wcmV2TmV4dEJ1dHRvbnMgICAgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhZ2VEb3RzICAgICAgICAgICA9IHRydWU7XG4gICAgICAgIHRoaXMucmVzaXplICAgICAgICAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yaWdodFRvTGVmdCAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSAgICAgPSB0cnVlO1xuICAgICAgICB0aGlzLndhdGNoQ1NTICAgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLndyYXBBcm91bmQgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmltYWdlc0xvYWRlZCAgICAgICA9IHRydWU7XG4gICAgICAgIHRoaXMuYXNOYXZGb3IgICAgICAgICAgID0gdHJ1ZTtcbiAgICB9XG5cblxuXG5cbiAgICAkZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9mbGlja2l0eS5wcm92aWRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vL2ltcG9ydCBGbGlja2l0eSBmcm9tICdmbGlja2l0eSc7XG4vKiBnbG9iYWwgRmxpY2tpdHkgKi9cbnZhciBGbGlja2l0eVNlcnZpY2UgPSBleHBvcnRzLkZsaWNraXR5U2VydmljZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGbGlja2l0eVNlcnZpY2UoJHRpbWVvdXQsICRxLCAkcm9vdFNjb3BlLCAkbG9nKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZsaWNraXR5U2VydmljZSk7XG5cbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoRmxpY2tpdHlTZXJ2aWNlLCBbe1xuICAgICAgICBrZXk6ICdjcmVhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlKGVsZW1lbnQsIGlkLCBvcHRpb25zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIC8vIElmIG5vIElEIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBpdCBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gZWxlbWVudC5pZDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgYXNzaWduIGEgbmV3IElEXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IF90aGlzLmluc3RhbmNlcy5sZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBJRCBpcyBhbHJlYWR5IGluIHVzZVxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5fZmluZE9iamVjdEJ5SWQoX3RoaXMuaW5zdGFuY2VzLCBpZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gX3RoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLmVycm9yKCdUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlOiAnLCBfdGhpcy5pbnN0YW5jZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgdGhlIG5ldyBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogbmV3IEZsaWNraXR5KGVsZW1lbnQsIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIFNhdmUgdGhpcyBpbnN0YW5jZSB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRvIGFsbCBldmVudHNcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX2JpbmRFdmVudHMoaWQpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXN0cm95IGEgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveShpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczIuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICBfdGhpczIuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaW5zdGFuY2UgZnJvbSB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBfdGhpczIuaW5zdGFuY2VzLnNwbGljZShmbGlja2l0eUluZGV4LCAxKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCdJbnN0YW5jZSAnICsgaWQgKyAnIGRlc3Ryb3llZC4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybiBhbGwgaW5zdGFuY2VzXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBpbnN0YW5jZXNcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEFsbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRBbGwoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzMy5pbnN0YW5jZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbmV4dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBuZXh0KGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczQuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczQuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm5leHQoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTW92ZSB0byB0aGUgcHJldmlvdXMgc2xpZGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXZpb3VzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByZXZpb3VzKGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczUuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgcHJldmlvdXMgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM1Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5wcmV2aW91cyhpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczUuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZWxlY3QgYSBzbGlkZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0KGlkLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBpc1dyYXBwZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGlzSW5zdGFudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczYuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3QoaW5kZXgsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbGVjdCBhIHNsaWRlIG9mIGEgY2VsbFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfFN0cmluZ30gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2VsZWN0Q2VsbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RDZWxsKGlkLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBpc1dyYXBwZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGlzSW5zdGFudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczcuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RDZWxsKHZhbHVlLCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczcuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXhcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IHNlbGVjdGVkSW5kZXhcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdGVkSW5kZXgnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0ZWRJbmRleChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczguX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjdXJyZW50IGluZGV4XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzOC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVzaXplIHRoZSBnYWxsZXJ5IGFuZCByZS1wb3NpdGlvbiBjZWxscy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Jlc2l6ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXNpemUoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM5Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM5Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUG9zaXRpb24gY2VsbHMgYXQgc2VsZWN0ZWQgcG9zaXRpb24uXG4gICAgICAgICAqIFRyaWdnZXIgcmVwb3NpdGlvbiBhZnRlciB0aGUgc2l6ZSBvZiBhIGNlbGwgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlcG9zaXRpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVwb3NpdGlvbihpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSByZXBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTAuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlcG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTAuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZS1jb2xsZWN0IGFsbCBjZWxsIGVsZW1lbnRzIGluIGBmbGlja2l0eS1zbGlkZXJgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVsb2FkQ2VsbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVsb2FkQ2VsbHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczExID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTEuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVsb2FkIGNlbGxzXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbG9hZENlbGxzKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczExLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGEgRmxpY2tpdHkgaW5zdGFuY2UgYnkgSURcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczEyID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTIuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEyLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBmaXJzdCBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRGaXJzdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGaXJzdCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczEzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzMTMuaW5zdGFuY2VzIHx8IF90aGlzMTMuaW5zdGFuY2VzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnTm8gaW5zdGFuY2VzIGV4aXN0Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEzLmluc3RhbmNlc1swXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0QnlFbGVtZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEJ5RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IEZsaWNraXR5LmRhdGEoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2Ugbm90IGZvdW5kIGZvciAnICsgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJlcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdhbGxlcnkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncHJlcGVuZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTQgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBQcmVwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQXBwZW5kIGVsZW1lbnRzIGFuZCBjcmVhdGUgY2VsbHMgdG8gdGhlIGVuZCBvZiB0aGUgZ2FsbGVyeS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTUgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE1Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5hcHBlbmQoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydCBlbGVtZW50cyBpbnRvIHRoZSBnYWxsZXJ5IGFuZCBjcmVhdGUgY2VsbHMgYXQgdGhlIGRlc2lyZWQgaW5kZXguXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIFplcm8gYmFzZWQgaW5kZXhcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaW5zZXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluc2VydChpZCwgZWxlbWVudHMsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE2Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluc2VydCB0aGUgc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmluc2VydChlbGVtZW50cywgaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgZWxlbWVudHMgb2YgdGhlIGNlbGxzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbEVsZW1lbnRzXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRDZWxsRWxlbWVudHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VsbEVsZW1lbnRzKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE3Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYXJyYXkgb2YgY2VsbCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGNlbGxzIGJ5IGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEVsZW1lbnR9IGVsZW1lbnQocylcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVtb3ZlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE4ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTguX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxOC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVtb3ZlKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxsIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IHNlbGVjdGVkQ2VsbEVsZW1lbnRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdGVkRWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RlZEVsZW1lbnQoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE5ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTkuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGFuIGFycmF5IG9mIGFsbCBjZWxsc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGNlbGxzXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjZWxscycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjZWxscyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMjAgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyMC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGxzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMjAuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmNlbGxzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEhlbHBlciBtZXRob2RzXG4gICAgICAgIC8vXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRmluZCB0aGUgaW5kZXggZm9yIGEgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IGZsaWNraXR5SW5kZXhcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRGbGlja2l0eUluZGV4JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRGbGlja2l0eUluZGV4KGlkKSB7XG4gICAgICAgICAgICB2YXIgZm91bmRJbmRleCA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBOT1RfRk9VTkQgPSAtMTtcblxuICAgICAgICAgICAgLy8gSWYgbm8gaW5zdGFuY2VzIGV4aXN0XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VzLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IE5PVF9GT1VORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaW5zdGFuY2VzIGRvIGV4aXN0XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGUgSUQgb2YgZWFjaCBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlLCBpbmRleCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IG1hdGNoZXMgb3VyIElELCBzZXQgdGhlIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm91bmRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCaW5kIGFsbCBldmVudHMgZm9yIGEgbmV3IGluc3RhbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sfSBpc0ZpbmlzaGVkXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfYmluZEV2ZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYmluZEV2ZW50cyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMjEgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyMS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBJRCA9IF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmlkO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNlbGVjdCcsIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZXR0bGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpzZXR0bGUnLCBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKHByb2dyZXNzLCBwb3NpdGlvblgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNjcm9sbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcG9zaXRpb25YXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ1N0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnTW92ZScsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgbW92ZVZlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ01vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnRW5kJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpkcmFnRW5kJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyRG93bicsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlckRvd24nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJNb3ZlJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpwb2ludGVyTW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJVcCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlclVwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzdGF0aWNDbGljaycsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgY2VsbEVsZW1lbnQsIGNlbGxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c3RhdGljQ2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQ6IGNlbGxFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4OiBjZWxsSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignbGF6eUxvYWQnLCBmdW5jdGlvbiAoZXZlbnQsIGNlbGxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpsYXp5TG9hZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRmluZCBhbiBvYmplY3Qgd2l0aGluIGFuIGFycmF5IGJ5IElEXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBtYXRjaFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2ZpbmRPYmplY3RCeUlkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9maW5kT2JqZWN0QnlJZChzb3VyY2UsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmZpbHRlcihmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5pZCA9PT0gaWQ7XG4gICAgICAgICAgICB9KVswXTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGbGlja2l0eVNlcnZpY2U7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkuc2VydmljZS5qc1xuICoqLyIsIi8vaW1wb3J0IEZsaWNraXR5IGZyb20gJ2ZsaWNraXR5Jztcbi8qIGdsb2JhbCBGbGlja2l0eSAqL1xuZXhwb3J0IGNsYXNzIEZsaWNraXR5U2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgJHRpbWVvdXQsICRxLCAkcm9vdFNjb3BlLCAkbG9nXG4gICAgKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgPSBbXTtcblxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgY3JlYXRlKGVsZW1lbnQsIGlkLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIGlkID0gZWxlbWVudC5pZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzc2lnbiBhIG5ldyBJRFxuICAgICAgICAgICAgICAgICAgICBpZCA9IHRoaXMuaW5zdGFuY2VzLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIElEIGlzIGFscmVhZHkgaW4gdXNlXG4gICAgICAgICAgICBpZiAodGhpcy5fZmluZE9iamVjdEJ5SWQodGhpcy5pbnN0YW5jZXMsIGlkKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKCdUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlOiAnLCB0aGlzLmluc3RhbmNlc1tpbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERlZmluZSB0aGUgbmV3IGluc3RhbmNlXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IG5ldyBGbGlja2l0eShlbGVtZW50LCBvcHRpb25zKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIFNhdmUgdGhpcyBpbnN0YW5jZSB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xuXG4gICAgICAgICAgICAvLyBCaW5kIHRvIGFsbCBldmVudHNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iaW5kRXZlbnRzKGlkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IGEgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkZXN0cm95KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaW5zdGFuY2UgZnJvbSB0aGUgYXJyYXlcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLnNwbGljZShmbGlja2l0eUluZGV4LCAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoJ0luc3RhbmNlICcgKyBpZCArICcgZGVzdHJveWVkLicpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgaW5zdGFuY2VzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gaW5zdGFuY2VzXG4gICAgICovXG4gICAgZ2V0QWxsKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmluc3RhbmNlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBuZXh0KGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UubmV4dChpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHByZXZpb3VzKGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnByZXZpb3VzKGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IGEgc2xpZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXhcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHNlbGVjdChpZCwgaW5kZXgsIGlzV3JhcHBlZCA9IGZhbHNlLCBpc0luc3RhbnQgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdChpbmRleCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgYSBzbGlkZSBvZiBhIGNlbGxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcnxTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZWxlY3RDZWxsKGlkLCB2YWx1ZSwgaXNXcmFwcGVkID0gZmFsc2UsIGlzSW5zdGFudCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHNlbGVjdGVkIHNsaWRlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0Q2VsbCh2YWx1ZSwgaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IHNlbGVjdGVkSW5kZXhcbiAgICAgKi9cbiAgICBzZWxlY3RlZEluZGV4KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY3VycmVudCBpbmRleFxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSB0aGUgZ2FsbGVyeSBhbmQgcmUtcG9zaXRpb24gY2VsbHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgcmVzaXplKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBjZWxscyBhdCBzZWxlY3RlZCBwb3NpdGlvbi5cbiAgICAgKiBUcmlnZ2VyIHJlcG9zaXRpb24gYWZ0ZXIgdGhlIHNpemUgb2YgYSBjZWxsIGhhcyBiZWVuIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgcmVwb3NpdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSByZXBvc2l0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVwb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZS1jb2xsZWN0IGFsbCBjZWxsIGVsZW1lbnRzIGluIGBmbGlja2l0eS1zbGlkZXJgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlbG9hZENlbGxzKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJlbG9hZCBjZWxsc1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbG9hZENlbGxzKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCBhIEZsaWNraXR5IGluc3RhbmNlIGJ5IElEXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgZ2V0KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldEZpcnN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlcyB8fCB0aGlzLmluc3RhbmNlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnTm8gaW5zdGFuY2VzIGV4aXN0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1swXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldEJ5RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IEZsaWNraXR5LmRhdGEoZWxlbWVudClcblxuICAgICAgICAgICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2Ugbm90IGZvdW5kIGZvciAnICsgZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJlcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdhbGxlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgcHJlcGVuZChpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUHJlcGVuZCB0aGUgc2xpZGVzXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBlbmQgb2YgdGhlIGdhbGxlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgYXBwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmFwcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEluc2VydCBlbGVtZW50cyBpbnRvIHRoZSBnYWxsZXJ5IGFuZCBjcmVhdGUgY2VsbHMgYXQgdGhlIGRlc2lyZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gWmVybyBiYXNlZCBpbmRleFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBpbnNlcnQoaWQsIGVsZW1lbnRzLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmluc2VydChlbGVtZW50cywgaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGVsZW1lbnRzIG9mIHRoZSBjZWxsc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7QXJyYXl9IGNlbGxFbGVtZW50c1xuICAgICAqL1xuICAgIGdldENlbGxFbGVtZW50cyhpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGwgZWxlbWVudHNcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGNlbGxzIGJ5IGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEVsZW1lbnR9IGVsZW1lbnQocylcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgcmVtb3ZlKGlkLCBlbGVtZW50cykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZW1vdmUoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxsIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IHNlbGVjdGVkQ2VsbEVsZW1lbnRcbiAgICAgKi9cbiAgICBzZWxlY3RlZEVsZW1lbnQoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYW4gYXJyYXkgb2YgYWxsIGNlbGxzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbHNcbiAgICAgKi9cbiAgICBjZWxscyhpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGxzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuY2VsbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy9cbiAgICAvLyBIZWxwZXIgbWV0aG9kc1xuICAgIC8vXG5cblxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGluZGV4IGZvciBhIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBmbGlja2l0eUluZGV4XG4gICAgICovXG4gICAgX2dldEZsaWNraXR5SW5kZXgoaWQpIHtcbiAgICAgICAgbGV0IGZvdW5kSW5kZXg7XG4gICAgICAgIGNvbnN0IE5PVF9GT1VORCA9IC0xO1xuXG4gICAgICAgIC8vIElmIG5vIGluc3RhbmNlcyBleGlzdFxuICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VzLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBmb3VuZEluZGV4ID0gTk9UX0ZPVU5EO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBpbnN0YW5jZXMgZG8gZXhpc3RcblxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIElEIG9mIGVhY2ggaW5zdGFuY2VcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLmZvckVhY2goKGluc3RhbmNlLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQgbWF0Y2hlcyBvdXIgSUQsIHNldCB0aGUgaW5kZXhcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRJbmRleDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEJpbmQgYWxsIGV2ZW50cyBmb3IgYSBuZXcgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0Jvb2x9IGlzRmluaXNoZWRcbiAgICAgKi9cbiAgICBfYmluZEV2ZW50cyhpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IElEID0gdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaWQ7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZWxlY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzZWxlY3RgLCB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NldHRsZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnNldHRsZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2Nyb2xsJywgKHByb2dyZXNzLCBwb3NpdGlvblgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnNjcm9sbGAsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHBvc2l0aW9uWCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ1N0YXJ0JywgKGV2ZW50LCBwb2ludGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpkcmFnU3RhcnRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ01vdmUnLCAoZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmRyYWdNb3ZlYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3I6IG1vdmVWZWN0b3IsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdFbmQnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmRyYWdFbmRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlckRvd24nLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnBvaW50ZXJEb3duYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJNb3ZlJywoZXZlbnQsIHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpwb2ludGVyTW92ZWAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyVXAnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnBvaW50ZXJVcGAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzdGF0aWNDbGljaycsIChldmVudCwgcG9pbnRlciwgY2VsbEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzdGF0aWNDbGlja2AsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxJbmRleDogY2VsbEluZGV4LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdsYXp5TG9hZCcsIChldmVudCwgY2VsbEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmxhenlMb2FkYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYW4gb2JqZWN0IHdpdGhpbiBhbiBhcnJheSBieSBJRFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gc291cmNlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBtYXRjaFxuICAgICAqL1xuICAgIF9maW5kT2JqZWN0QnlJZChzb3VyY2UsIGlkKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QuaWQgPT09IGlkO1xuICAgICAgICB9KVswXTtcbiAgICB9XG5cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvZmxpY2tpdHkuc2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eURpcmVjdGl2ZSA9IEZsaWNraXR5RGlyZWN0aXZlO1xuXG52YXIgX2ZsaWNraXR5ID0gcmVxdWlyZSgnLi9mbGlja2l0eS5jb250cm9sbGVyJyk7XG5cbmZ1bmN0aW9uIEZsaWNraXR5RGlyZWN0aXZlKCR0aW1lb3V0LCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5OiAnQD8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxuICAgICAgICAgICAgICAgIHBvc3Q6IHBvc3RMaW5rRnVuY3Rpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IF9mbGlja2l0eS5GbGlja2l0eUNvbnRyb2xsZXIsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG5cbiAgICAgICAgaWYgKCEkY29udHJvbGxlci5iY0ZsaWNraXR5SWQpIHtcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZWxlbWVudCdzIElEIGlmIG9uZSBleGlzdHNcbiAgICAgICAgICAgIGlmICgkYXR0cnMuaWQpIHtcbiAgICAgICAgICAgICAgICAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQgPSAkYXR0cnMuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3N0IExpbmtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwb3N0TGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBgY3JlYXRlKClgIGdldHMgcGlja2VkIHVwIGluIHRoZSBuZXh0IGRpZ2VzdCBjeWNsZVxuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBGbGlja2l0eVxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmNyZWF0ZSgkZWxlbWVudFswXSwgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkLCAkY29udHJvbGxlci5vcHRpb25zKS50aGVuKGZ1bmN0aW9uIChmbGlja2l0eUluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBFeHBvc2UgdGhlIEZsaWNraXR5IGluc3RhbmNlIGFuZCBJRFxuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLkZsaWNraXR5ID0gZmxpY2tpdHlJbnN0YW5jZS5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQgPSBmbGlja2l0eUluc3RhbmNlLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIGRpcmVjdGl2ZSBpcyBiZWluZyBkZXN0cm95ZWRcbiAgICAgICAgdmFyIG9uRGVzdHJveSA9ICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZGVzdHJveSB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5kZXN0cm95KCRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0gLyogZ2xvYmFsIEZsaWNraXR5ICovXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzXG4gKiovIiwiLyogZ2xvYmFsIEZsaWNraXR5ICovXG5pbXBvcnQgeyBGbGlja2l0eUNvbnRyb2xsZXIgfSBmcm9tICcuL2ZsaWNraXR5LmNvbnRyb2xsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gRmxpY2tpdHlEaXJlY3RpdmUoXG4gICAgJHRpbWVvdXQsXG4gICAgRmxpY2tpdHlTZXJ2aWNlXG4pIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHk6ICdAPycsXG4gICAgICAgICAgICBiY0ZsaWNraXR5SWQ6ICdAPycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgcG9zdDogcG9zdExpbmtGdW5jdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IEZsaWNraXR5Q29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG5cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIElmIG5vIElEIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgaWYgKCEkY29udHJvbGxlci5iY0ZsaWNraXR5SWQpIHtcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZWxlbWVudCdzIElEIGlmIG9uZSBleGlzdHNcbiAgICAgICAgICAgIGlmICgkYXR0cnMuaWQpIHtcbiAgICAgICAgICAgICAgICAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQgPSAkYXR0cnMuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc3QgTGlua1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBvc3RMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGBjcmVhdGUoKWAgZ2V0cyBwaWNrZWQgdXAgaW4gdGhlIG5leHQgZGlnZXN0IGN5Y2xlXG4gICAgICAgICR0aW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBGbGlja2l0eVxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmNyZWF0ZSgkZWxlbWVudFswXSwgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkLCAkY29udHJvbGxlci5vcHRpb25zKVxuICAgICAgICAgICAgICAgIC50aGVuKChmbGlja2l0eUluc3RhbmNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRXhwb3NlIHRoZSBGbGlja2l0eSBpbnN0YW5jZSBhbmQgSURcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuRmxpY2tpdHkgPSBmbGlja2l0eUluc3RhbmNlLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQgPSBmbGlja2l0eUluc3RhbmNlLmlkO1xuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBXaGVuIHRoZSBkaXJlY3RpdmUgaXMgYmVpbmcgZGVzdHJveWVkXG4gICAgICAgIGNvbnN0IG9uRGVzdHJveSA9ICRzY29wZS4kb24oJyRkZXN0cm95JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZGVzdHJveSB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5kZXN0cm95KCRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmxpY2tpdHlDb250cm9sbGVyID0gZXhwb3J0cy5GbGlja2l0eUNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmxpY2tpdHlDb250cm9sbGVyKEZsaWNraXR5Q29uZmlnKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZsaWNraXR5Q29udHJvbGxlcik7XG5cbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEZsaWNraXR5Q29udHJvbGxlciwgW3tcbiAgICAgICAga2V5OiAnX2FjdGl2YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vIEV4dGVuZCB0aGUgZGVmYXVsdCBvcHRpb25zIHdpdGggdXNlciBjb25maWd1cmF0aW9uXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgdGhpcy5GbGlja2l0eUNvbmZpZywgYW5ndWxhci5mcm9tSnNvbih0aGlzLmJjRmxpY2tpdHkgfHwge30pKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGbGlja2l0eUNvbnRyb2xsZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkuY29udHJvbGxlci5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBGbGlja2l0eUNvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEZsaWNraXR5Q29uZmlnXG4gICAgKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuXG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcblxuICAgIH1cblxuXG5cblxuICAgIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgLy8gRXh0ZW5kIHRoZSBkZWZhdWx0IG9wdGlvbnMgd2l0aCB1c2VyIGNvbmZpZ3VyYXRpb25cbiAgICAgICAgdGhpcy5vcHRpb25zID1cbiAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHt9LCB0aGlzLkZsaWNraXR5Q29uZmlnLCBhbmd1bGFyLmZyb21Kc29uKHRoaXMuYmNGbGlja2l0eSB8fCB7fSkpO1xuICAgIH1cblxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LmNvbnRyb2xsZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRmxpY2tpdHlOZXh0RGlyZWN0aXZlID0gRmxpY2tpdHlOZXh0RGlyZWN0aXZlO1xuXG52YXIgX25leHQgPSByZXF1aXJlKCcuL25leHQuY29udHJvbGxlcicpO1xuXG5mdW5jdGlvbiBGbGlja2l0eU5leHREaXJlY3RpdmUoJGxvZywgJHRpbWVvdXQsICRyb290U2NvcGUsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5TmV4dDogJz0/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/J1xuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvblxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogX25leHQuTmV4dENvbnRyb2xsZXIsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgLyoqXG4gICAgICogUHJlIExpbmtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcblxuICAgICAgICB2YXIgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgdmFyIHNlbGVjdEV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6Y2VsbFNlbGVjdCc7XG4gICAgICAgIHZhciBzZXR0bGVFdmVudCA9ICdGbGlja2l0eTonICsgJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCArICc6c2V0dGxlJztcblxuICAgICAgICAvLyBMaXN0ZW5cbiAgICAgICAgdmFyIGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2UuY2VsbHMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2UuY2VsbHMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5uZXh0KCRjb250cm9sbGVyLmZsaWNraXR5SWQsICRjb250cm9sbGVyLndyYXBBcm91bmQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7SW50fSBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCwgY2VsbENvdW50KSB7XG5cbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IGNlbGxDb3VudCkge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dC9mbGlja2l0eU5leHQuZGlyZWN0aXZlLmpzXG4gKiovIiwiaW1wb3J0IHsgTmV4dENvbnRyb2xsZXIgfSBmcm9tICcuL25leHQuY29udHJvbGxlcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBGbGlja2l0eU5leHREaXJlY3RpdmUoXG4gICAgJGxvZywgJHRpbWVvdXQsICRyb290U2NvcGUsXG4gICAgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZVxuKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5TmV4dDogJz0/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IE5leHRDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBQcmUgTGlua1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbihcbiAgICAgICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlclxuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcbiAgICAgICAgY29uc3QgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgY29uc3Qgc2VsZWN0RXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpjZWxsU2VsZWN0JztcbiAgICAgICAgY29uc3Qgc2V0dGxlRXZlbnQgPSAnRmxpY2tpdHk6JyArICRjb250cm9sbGVyLmZsaWNraXR5SWQgKyAnOnNldHRsZSc7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIGNvbnN0IGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2UuY2VsbHMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNldHRsZSA9ICRyb290U2NvcGUuJG9uKHNldHRsZUV2ZW50LCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5jZWxscy5sZW5ndGgsIGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCArIDEpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UubmV4dCgkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKTtcblxuICAgICAgICB9KTtcblxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7SW50fSBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCwgY2VsbENvdW50KSB7XG5cbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IGNlbGxDb3VudCkge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9uZXh0L2ZsaWNraXR5TmV4dC5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE5leHRDb250cm9sbGVyID0gZXhwb3J0cy5OZXh0Q29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOZXh0Q29udHJvbGxlcigkbG9nLCAkcSwgJHRpbWVvdXQsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTmV4dENvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKE5leHRDb250cm9sbGVyLCBbe1xuICAgICAgICBrZXk6ICdfYWN0aXZhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2FjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy8gQXNzaWduIG9yIGZhbGwgYmFjayB0byBkZWZhdWx0XG4gICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlOZXh0IHx8IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGFuIElEXG4gICAgICAgICAgICB0aGlzLl9zZXRJZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCBJRCB0byB3aGF0IGlzIGRlZmluZWQsIGZhbGxiYWNrIHRvIGZpcnN0IGluc3RhbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmxpY2tpdHlJZFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3NldElkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRJZCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRxKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5iY0ZsaWNraXR5SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IF90aGlzLmJjRmxpY2tpdHlJZDtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5GbGlja2l0eVNlcnZpY2UuZ2V0Rmlyc3QoKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIE5leHRDb250cm9sbGVyO1xufSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25leHQvbmV4dC5jb250cm9sbGVyLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIE5leHRDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAkbG9nLCAkcSwgJHRpbWVvdXQsXG4gICAgICAgIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcblxuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG5cbiAgICB9XG5cblxuXG5cbiAgICBfYWN0aXZhdGUoKSB7XG4gICAgICAgIC8vIEFzc2lnbiBvciBmYWxsIGJhY2sgdG8gZGVmYXVsdFxuICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlOZXh0IHx8IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICB0aGlzLl9zZXRJZCgpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXG4gICAgICovXG4gICAgX3NldElkKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLiRxKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gdGhpcy5iY0ZsaWNraXR5SWQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UuZ2V0Rmlyc3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRsb2cud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL25leHQvbmV4dC5jb250cm9sbGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUgPSBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlO1xuXG52YXIgX3ByZXZpb3VzID0gcmVxdWlyZSgnLi9wcmV2aW91cy5jb250cm9sbGVyJyk7XG5cbmZ1bmN0aW9uIEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUoJGxvZywgJHRpbWVvdXQsICRyb290U2NvcGUsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5UHJldmlvdXM6ICc9PycsXG4gICAgICAgICAgICBiY0ZsaWNraXR5SWQ6ICdAPydcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IF9wcmV2aW91cy5QcmV2aW91c0NvbnRyb2xsZXIsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgLyoqXG4gICAgICogUHJlIExpbmtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcblxuICAgICAgICB2YXIgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgdmFyIHNlbGVjdEV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6Y2VsbFNlbGVjdCc7XG4gICAgICAgIHZhciBzZXR0bGVFdmVudCA9ICdGbGlja2l0eTonICsgJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCArICc6c2V0dGxlJztcblxuICAgICAgICAvLyBMaXN0ZW5cbiAgICAgICAgdmFyIGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2V0dGxlID0gJHJvb3RTY29wZS4kb24oc2V0dGxlRXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgY2VsbFxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLnByZXZpb3VzKCRjb250cm9sbGVyLmZsaWNraXR5SWQsICRjb250cm9sbGVyLndyYXBBcm91bmQpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7SW50fSBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCkge1xuICAgICAgICAgICAgLy8gRGlzYWJsZSBidXR0b24gaWYgYXQgdGhlIGJlZ2lubmluZyBhbmQgd2Ugc2hvdWxkbid0IHdyYXBcbiAgICAgICAgICAgIGlmICghJGNvbnRyb2xsZXIud3JhcEFyb3VuZCAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcHJldmlvdXMvZmxpY2tpdHlQcmV2aW91cy5kaXJlY3RpdmUuanNcbiAqKi8iLCJpbXBvcnQgeyBQcmV2aW91c0NvbnRyb2xsZXIgfSBmcm9tICcuL3ByZXZpb3VzLmNvbnRyb2xsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZShcbiAgICAkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSxcbiAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXG4pIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHlQcmV2aW91czogJz0/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IFByZXZpb3VzQ29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG5cbiAgICAvKipcbiAgICAgKiBQcmUgTGlua1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbihcbiAgICAgICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlclxuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcbiAgICAgICAgY29uc3QgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgY29uc3Qgc2VsZWN0RXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpjZWxsU2VsZWN0JztcbiAgICAgICAgY29uc3Qgc2V0dGxlRXZlbnQgPSAnRmxpY2tpdHk6JyArICRjb250cm9sbGVyLmZsaWNraXR5SWQgKyAnOnNldHRsZSc7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIGNvbnN0IGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5wcmV2aW91cygkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKTtcblxuICAgICAgICB9KTtcblxuXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7SW50fSBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCkge1xuICAgICAgICAgICAgLy8gRGlzYWJsZSBidXR0b24gaWYgYXQgdGhlIGJlZ2lubmluZyBhbmQgd2Ugc2hvdWxkbid0IHdyYXBcbiAgICAgICAgICAgIGlmICghJGNvbnRyb2xsZXIud3JhcEFyb3VuZCAmJiBpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL3ByZXZpb3VzL2ZsaWNraXR5UHJldmlvdXMuZGlyZWN0aXZlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBQcmV2aW91c0NvbnRyb2xsZXIgPSBleHBvcnRzLlByZXZpb3VzQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmV2aW91c0NvbnRyb2xsZXIoJGxvZywgJHEsICR0aW1lb3V0LCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFByZXZpb3VzQ29udHJvbGxlcik7XG5cbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlDb25maWcgPSBGbGlja2l0eUNvbmZpZztcbiAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UgPSBGbGlja2l0eVNlcnZpY2U7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUHJldmlvdXNDb250cm9sbGVyLCBbe1xuICAgICAgICBrZXk6ICdfYWN0aXZhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2FjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy8gQXNzaWduIG9yIGZhbGwgYmFjayB0byBkZWZhdWx0XG4gICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cyB8fCB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICAgICAgdGhpcy5fc2V0SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0SWQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kcShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZsaWNraXR5SWQgPSBfdGhpcy5iY0ZsaWNraXR5SWQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiRsb2cud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBQcmV2aW91c0NvbnRyb2xsZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBQcmV2aW91c0NvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICRsb2csICRxLCAkdGltZW91dCxcbiAgICAgICAgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZVxuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcblxuICAgIH1cblxuXG5cblxuICAgIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgLy8gQXNzaWduIG9yIGZhbGwgYmFjayB0byBkZWZhdWx0XG4gICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuYmNGbGlja2l0eVByZXZpb3VzIHx8IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICB0aGlzLl9zZXRJZCgpO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXG4gICAgICovXG4gICAgX3NldElkKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLiRxKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gdGhpcy5iY0ZsaWNraXR5SWQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UuZ2V0Rmlyc3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRsb2cud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmNvbnRyb2xsZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9