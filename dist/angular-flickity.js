(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Flickity"));
	else if(typeof define === 'function' && define.amd)
		define("angular-flickity", ["Flickity"], factory);
	else if(typeof exports === 'object')
		exports["angular-flickity"] = factory(require("Flickity"));
	else
		root["angular-flickity"] = factory(root["Flickity"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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
	
	var _flickity3 = __webpack_require__(4);
	
	var _flickityNext = __webpack_require__(6);
	
	var _flickityPrevious = __webpack_require__(8);
	
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
	
	var _flickity = __webpack_require__(3);
	
	var _flickity2 = _interopRequireDefault(_flickity);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	                    instance: new _flickity2.default(element, options)
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
	                var instance = _flickity2.default.data(element);
	
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
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityDirective.$inject = ["$timeout", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityDirective = FlickityDirective;
	
	var _flickity = __webpack_require__(5);
	
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
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityNextDirective.$inject = ["$log", "$timeout", "$rootScope", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityNextDirective = FlickityNextDirective;
	
	var _next = __webpack_require__(7);
	
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
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	FlickityPreviousDirective.$inject = ["$log", "$timeout", "$rootScope", "FlickityConfig", "FlickityService"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityPreviousDirective = FlickityPreviousDirective;
	
	var _previous = __webpack_require__(9);
	
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
/* 9 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjM2IxYzQ4NGFkN2FhOTAxNWJjMCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzPzFmMzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5wcm92aWRlci5qcz8wMWY1Iiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzP2FkYTUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiRmxpY2tpdHlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanM/ZjYyNCIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuY29udHJvbGxlci5qcz9hZDg4Iiwid2VicGFjazovLy8uL3NyYy9uZXh0L2ZsaWNraXR5TmV4dC5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHQvZmxpY2tpdHlOZXh0LmRpcmVjdGl2ZS5qcz84ZTNkIiwid2VicGFjazovLy8uL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanM/MDE5ZSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvZmxpY2tpdHlQcmV2aW91cy5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZXZpb3VzL2ZsaWNraXR5UHJldmlvdXMuZGlyZWN0aXZlLmpzPzg3NjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmNvbnRyb2xsZXIuanM/YjhmOSJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicHJvdmlkZXIiLCJzZXJ2aWNlIiwiZGlyZWN0aXZlIiwiRmxpY2tpdHlDb25maWdQcm92aWRlciIsImFjY2Vzc2liaWxpdHkiLCJhZGFwdGl2ZUhlaWdodCIsImF1dG9QbGF5IiwiY2VsbEFsaWduIiwiY2VsbFNlbGVjdG9yIiwidW5kZWZpbmVkIiwiY29udGFpbiIsImRyYWdnYWJsZSIsImRyYWdUaHJlc2hvbGQiLCJmcmVlU2Nyb2xsIiwiZnJlZVNjcm9sbEZyaWN0aW9uIiwic2VsZWN0ZWRBdHRyYWN0aW9uIiwiZnJpY3Rpb24iLCJncm91cENlbGxzIiwiaW5pdGlhbEluZGV4IiwibGF6eUxvYWQiLCJwZXJjZW50UG9zaXRpb24iLCJwcmV2TmV4dEJ1dHRvbnMiLCJwYWdlRG90cyIsInJlc2l6ZSIsInJpZ2h0VG9MZWZ0Iiwic2V0R2FsbGVyeVNpemUiLCJ3YXRjaENTUyIsIndyYXBBcm91bmQiLCJpbWFnZXNMb2FkZWQiLCJhc05hdkZvciIsIiR0aW1lb3V0IiwiJHEiLCIkcm9vdFNjb3BlIiwiJGxvZyIsImluc3RhbmNlcyIsImVsZW1lbnQiLCJpZCIsIm9wdGlvbnMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImxlbmd0aCIsIl9maW5kT2JqZWN0QnlJZCIsImluZGV4IiwiX2dldEZsaWNraXR5SW5kZXgiLCJlcnJvciIsImluc3RhbmNlIiwicHVzaCIsIl9iaW5kRXZlbnRzIiwidGhlbiIsImZsaWNraXR5SW5kZXgiLCJkZXN0cm95Iiwic3BsaWNlIiwiaXNXcmFwcGVkIiwiaXNJbnN0YW50IiwibmV4dCIsInByZXZpb3VzIiwic2VsZWN0IiwidmFsdWUiLCJzZWxlY3RDZWxsIiwic2VsZWN0ZWRJbmRleCIsInJlcG9zaXRpb24iLCJyZWxvYWRDZWxscyIsImRhdGEiLCJlbGVtZW50cyIsInByZXBlbmQiLCJhcHBlbmQiLCJpbnNlcnQiLCJnZXRDZWxsRWxlbWVudHMiLCJyZW1vdmUiLCJzZWxlY3RlZEVsZW1lbnQiLCJjZWxscyIsImZvdW5kSW5kZXgiLCJOT1RfRk9VTkQiLCJmb3JFYWNoIiwiSUQiLCJvbiIsIiRlbWl0IiwicHJvZ3Jlc3MiLCJwb3NpdGlvblgiLCJldmVudCIsInBvaW50ZXIiLCJtb3ZlVmVjdG9yIiwiY2VsbEVsZW1lbnQiLCJjZWxsSW5kZXgiLCJzb3VyY2UiLCJmaWx0ZXIiLCJvYmplY3QiLCJGbGlja2l0eURpcmVjdGl2ZSIsIkZsaWNraXR5U2VydmljZSIsInJlc3RyaWN0Iiwic2NvcGUiLCJiaW5kVG9Db250cm9sbGVyIiwiYmNGbGlja2l0eSIsImJjRmxpY2tpdHlJZCIsImNvbXBpbGUiLCJwcmUiLCJwcmVMaW5rRnVuY3Rpb24iLCJwb3N0IiwicG9zdExpbmtGdW5jdGlvbiIsImNvbnRyb2xsZXIiLCJjb250cm9sbGVyQXMiLCIkc2NvcGUiLCIkZWxlbWVudCIsIiRhdHRycyIsIiRjb250cm9sbGVyIiwiY3JlYXRlIiwiZmxpY2tpdHlJbnN0YW5jZSIsIkZsaWNraXR5Iiwib25EZXN0cm95IiwiJG9uIiwiRmxpY2tpdHlDb25maWciLCJfYWN0aXZhdGUiLCJleHRlbmQiLCJmcm9tSnNvbiIsIkZsaWNraXR5TmV4dERpcmVjdGl2ZSIsImJjRmxpY2tpdHlOZXh0IiwiZmxpY2tpdHlJZCIsInNlbGVjdEV2ZW50Iiwic2V0dGxlRXZlbnQiLCJjZWxsU2VsZWN0IiwiX2Rpc2FibGVCdXR0b25JZk5lZWRlZCIsInNldHRsZSIsImNlbGxDb3VudCIsIiRzZXQiLCJfc2V0SWQiLCJnZXRGaXJzdCIsImNhdGNoIiwid2FybiIsIkZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUiLCJiY0ZsaWNraXR5UHJldmlvdXMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUNBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQUEsU0FBUUMsT0FBTyxlQUFlLElBQ3pCQyxTQUFTLGtCQURkLGtDQUVLQyxRQUFRLG1CQUZiLDRCQUdLQyxVQUFVLGNBSGYsOEJBSUtBLFVBQVUsa0JBSmYscUNBS0tBLFVBQVUsc0JBTGYsNkM7Ozs7OztBQ05BOztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7S0FDekMsT0FBTzs7O0FBR1gsS0FBSSxlQUFlLFlBQVksRUFBRSxTQUFTLGlCQUFpQixRQUFRLE9BQU8sRUFBRSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUssRUFBRSxJQUFJLGFBQWEsTUFBTSxJQUFJLFdBQVcsYUFBYSxXQUFXLGNBQWMsT0FBTyxXQUFXLGVBQWUsTUFBTSxJQUFJLFdBQVcsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLGVBQWUsUUFBUSxXQUFXLEtBQUssaUJBQWlCLE9BQU8sVUFBVSxhQUFhLFlBQVksYUFBYSxFQUFFLElBQUksWUFBWSxpQkFBaUIsWUFBWSxXQUFXLGFBQWEsSUFBSSxhQUFhLGlCQUFpQixhQUFhLGNBQWMsT0FBTzs7QUFFaGlCLFVBQVMsZ0JBQWdCLFVBQVUsYUFBYSxFQUFFLElBQUksRUFBRSxvQkFBb0IsY0FBYyxFQUFFLE1BQU0sSUFBSSxVQUFVOztBQUVoSCxLQ1ZhQyx5QkRVZ0IsUUNWaEJBLHlCRFVpRCxZQUFZO0tDUnRFLGtDQUFjO1NBQUE7OztTQUVWLEtBQUtDLGdCQUFxQjtTQUMxQixLQUFLQyxpQkFBcUI7U0FDMUIsS0FBS0MsV0FBcUI7U0FDMUIsS0FBS0MsWUFBcUI7U0FDMUIsS0FBS0MsZUFBcUJDO1NBQzFCLEtBQUtDLFVBQXFCO1NBQzFCLEtBQUtDLFlBQXFCO1NBQzFCLEtBQUtDLGdCQUFxQjtTQUMxQixLQUFLQyxhQUFxQjtTQUMxQixLQUFLQyxxQkFBcUI7U0FDMUIsS0FBS0MscUJBQXFCO1NBQzFCLEtBQUtDLFdBQXFCO1NBQzFCLEtBQUtDLGFBQXFCO1NBQzFCLEtBQUtDLGVBQXFCO1NBQzFCLEtBQUtDLFdBQXFCO1NBQzFCLEtBQUtDLGtCQUFxQjtTQUMxQixLQUFLQyxrQkFBcUI7U0FDMUIsS0FBS0MsV0FBcUI7U0FDMUIsS0FBS0MsU0FBcUI7U0FDMUIsS0FBS0MsY0FBcUI7U0FDMUIsS0FBS0MsaUJBQXFCO1NBQzFCLEtBQUtDLFdBQXFCO1NBQzFCLEtBQUtDLGFBQXFCO1NBQzFCLEtBQUtDLGVBQXFCO1NBQzFCLEtBQUtDLFdBQXFCOzs7S0RjOUIsYUFBYSx3QkFBd0IsQ0FBQztTQUNsQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLE9DVmI7YUFDSCxPQUFPOzs7O0tEY1gsT0FBTzs7Ozs7OztBRWpEWDs7QUFFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0tBQ3pDLE9BQU87O0FBRVgsU0FBUSxrQkFBa0I7O0FBRTFCLEtBQUksZUFBZSxZQUFZLEVBQUUsU0FBUyxpQkFBaUIsUUFBUSxPQUFPLEVBQUUsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLLEVBQUUsSUFBSSxhQUFhLE1BQU0sSUFBSSxXQUFXLGFBQWEsV0FBVyxjQUFjLE9BQU8sV0FBVyxlQUFlLE1BQU0sSUFBSSxXQUFXLFlBQVksV0FBVyxXQUFXLE1BQU0sT0FBTyxlQUFlLFFBQVEsV0FBVyxLQUFLLGlCQUFpQixPQUFPLFVBQVUsYUFBYSxZQUFZLGFBQWEsRUFBRSxJQUFJLFlBQVksaUJBQWlCLFlBQVksV0FBVyxhQUFhLElBQUksYUFBYSxpQkFBaUIsYUFBYSxjQUFjLE9BQU87O0FDUGhpQjs7QURXQSxLQUFJLGFBQWEsdUJBQXVCOztBQUV4QyxVQUFTLHVCQUF1QixLQUFLLEVBQUUsT0FBTyxPQUFPLElBQUksYUFBYSxNQUFNLEVBQUUsU0FBUzs7QUFFdkYsVUFBUyxnQkFBZ0IsVUFBVSxhQUFhLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixjQUFjLEVBQUUsTUFBTSxJQUFJLFVBQVU7Ozt3RUFFcEQ7S0NieEQseUJBQ0lDLFVBQVVDLElBQUlDLFlBQVlDLE1BQzVCO1NBQ0U7O1NBREY7O1NBR0UsS0FBS0gsV0FBV0E7U0FDaEIsS0FBS0MsS0FBS0E7U0FDVixLQUFLQyxhQUFhQTtTQUNsQixLQUFLQyxPQUFPQTs7U0FFWixLQUFLQyxZQUFZOzs7Ozs7Ozs7Ozs7O0tEMkJyQixhQUFhLGlCQUFpQixDQUFDO1NBQzNCLEtBQUs7U0FDTCxPQUFPLFNBQVMsT0NkYkMsU0FBU0MsSUFBSUMsU0FBUzthQUFBOzthQUN6QixPQUFPLElBQUlDLFFBQVEsVUFBQ0MsU0FBU0MsUUFBVzs7aUJBRXBDLElBQUksQ0FBQ0osSUFBSTtxQkFDTCxJQUFJRCxRQUFRQyxJQUFJOzt5QkFFWkEsS0FBS0QsUUFBUUM7NEJBQ1Y7O3lCQUVIQSxLQUFLLE1BQUtGLFVBQVVPLFNBQVM7Ozs7O2lCQUtyQyxJQUFJLE1BQUtDLGdCQUFnQixNQUFLUixXQUFXRSxLQUFLO3FCQUMxQyxJQUFNTyxRQUFRLE1BQUtDLGtCQUFrQlI7cUJBQ3JDLE1BQUtILEtBQUtZLE1BQU0sK0JBQStCLE1BQUtYLFVBQVVTOztxQkFFOURIOzs7O2lCQUlKLElBQU1NLFdBQVc7cUJBQ2JWLElBQUlBO3FCQUNKVSxVQUFVLHVCQUFhWCxTQUFTRTs7OztpQkFJcEMsTUFBS0gsVUFBVWEsS0FBS0Q7OztpQkFHcEIsT0FBTyxNQUFLRSxZQUFZWixJQUFJYSxLQUFLLFlBQU07cUJBQ25DLE9BQU9WLFFBQVFPOzs7Ozs7Ozs7Ozs7UUQ0QnhCO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxRQ2xCWlYsSUFBSTthQUFBOzthQUNSLE9BQU8sSUFBSUUsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNVSxnQkFBZ0IsT0FBS04sa0JBQWtCUjs7aUJBRTdDLElBQUljLGdCQUFnQixHQUFHO3FCQUNuQixPQUFPVixPQUFPLGNBQWNKLEtBQUs7Ozs7aUJBSXJDLE9BQUtGLFVBQVVnQixlQUFlSixTQUFTSzs7O2lCQUd2QyxPQUFLakIsVUFBVWtCLE9BQU9GLGVBQWU7O2lCQUVyQyxPQUFPWCxRQUFRLGNBQWNILEtBQUs7Ozs7Ozs7Ozs7UUQ4QnZDO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxTQ3RCWDthQUFBOzthQUNMLE9BQU8sSUFBSUUsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQ0QsUUFBUSxPQUFLTDs7Ozs7Ozs7Ozs7OztRRHFDbEI7U0FDQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLEtDMUJmRSxJQUFJaUIsV0FBV0MsV0FBVzthQUFBOzthQUMzQixPQUFPLElBQUloQixRQUFRLFVBQUNDLFNBQVNDLFFBQVc7aUJBQ3BDLElBQU1VLGdCQUFnQixPQUFLTixrQkFBa0JSOztpQkFFN0MsSUFBSWMsZ0JBQWdCLEdBQUc7cUJBQ25CLE9BQU9WLE9BQU8sY0FBY0osS0FBSzt3QkFDOUI7O3FCQUVILE9BQUtGLFVBQVVnQixlQUFlSixTQUFTUyxLQUFLRixXQUFXQzs7O3FCQUd2RCxPQUFPZixRQUFRLE9BQUtMLFVBQVVnQjs7Ozs7Ozs7Ozs7Ozs7UUQwQ3ZDO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxTQzlCWGQsSUFBSWlCLFdBQVdDLFdBQVc7YUFBQTs7YUFDL0IsT0FBTyxJQUFJaEIsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNVSxnQkFBZ0IsT0FBS04sa0JBQWtCUjs7aUJBRTdDLElBQUljLGdCQUFnQixHQUFHO3FCQUNuQixPQUFPVixPQUFPLGNBQWNKLEtBQUs7d0JBQzlCOztxQkFFSCxPQUFLRixVQUFVZ0IsZUFBZUosU0FBU1UsU0FBU0gsV0FBV0M7OztxQkFHM0QsT0FBT2YsUUFBUSxPQUFLTCxVQUFVZ0I7Ozs7Ozs7Ozs7Ozs7OztRRCtDdkM7U0FDQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLE9DbENiZCxJQUFJTyxPQUE2QzthQUFBOzthQUFBLElBQXRDVSxZQUFzQyxvRUFBMUI7YUFBMEIsSUFBbkJDLFlBQW1CLG9FQUFQOzthQUM3QyxPQUFPLElBQUloQixRQUFRLFVBQUNDLFNBQVNDLFFBQVc7aUJBQ3BDLElBQU1VLGdCQUFnQixPQUFLTixrQkFBa0JSOztpQkFFN0MsSUFBSWMsZ0JBQWdCLEdBQUc7cUJBQ25CLE9BQU9WLE9BQU8sY0FBY0osS0FBSzt3QkFDOUI7O3FCQUVILE9BQUtGLFVBQVVnQixlQUFlSixTQUFTVyxPQUFPZCxPQUFPVSxXQUFXQzs7O3FCQUdoRSxPQUFPZixRQUFRLE9BQUtMLFVBQVVnQjs7Ozs7Ozs7Ozs7Ozs7O1FEc0R2QztTQUNDLEtBQUs7U0FDTCxPQUFPLFNBQVMsV0N6Q1RkLElBQUlzQixPQUE2QzthQUFBOzthQUFBLElBQXRDTCxZQUFzQyxvRUFBMUI7YUFBMEIsSUFBbkJDLFlBQW1CLG9FQUFQOzthQUNqRCxPQUFPLElBQUloQixRQUFRLFVBQUNDLFNBQVNDLFFBQVc7aUJBQ3BDLElBQU1VLGdCQUFnQixPQUFLTixrQkFBa0JSOztpQkFFN0MsSUFBSWMsZ0JBQWdCLEdBQUc7cUJBQ25CLE9BQU9WLE9BQU8sY0FBY0osS0FBSzt3QkFDOUI7O3FCQUVILE9BQUtGLFVBQVVnQixlQUFlSixTQUFTYSxXQUFXRCxPQUFPTCxXQUFXQzs7O3FCQUdwRSxPQUFPZixRQUFRLE9BQUtMLFVBQVVnQjs7Ozs7Ozs7Ozs7O1FEMER2QztTQUNDLEtBQUs7U0FDTCxPQUFPLFNBQVMsY0NoRE5kLElBQUk7YUFBQTs7YUFDZCxPQUFPLElBQUlFLFFBQVEsVUFBQ0MsU0FBU0MsUUFBVztpQkFDcEMsSUFBTVUsZ0JBQWdCLE9BQUtOLGtCQUFrQlI7O2lCQUU3QyxJQUFJYyxnQkFBZ0IsR0FBRztxQkFDbkIsT0FBT1YsT0FBTyxjQUFjSixLQUFLO3dCQUM5Qjs7cUJBRUgsT0FBT0csUUFBUSxPQUFLTCxVQUFVZ0IsZUFBZUosU0FBU2M7Ozs7Ozs7Ozs7OztRRDhEL0Q7U0FDQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLE9DcERieEIsSUFBSTthQUFBOzthQUNQLE9BQU8sSUFBSUUsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNVSxnQkFBZ0IsT0FBS04sa0JBQWtCUjs7aUJBRTdDLElBQUljLGdCQUFnQixHQUFHO3FCQUNuQixPQUFPVixPQUFPLGNBQWNKLEtBQUs7d0JBQzlCOztxQkFFSCxPQUFLRixVQUFVZ0IsZUFBZUosU0FBU3ZCOzs7cUJBR3ZDLE9BQU9nQixRQUFRLE9BQUtMLFVBQVVnQjs7Ozs7Ozs7Ozs7OztRRG1FdkM7U0FDQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLFdDeERUZCxJQUFJO2FBQUE7O2FBQ1gsT0FBTyxJQUFJRSxRQUFRLFVBQUNDLFNBQVNDLFFBQVc7aUJBQ3BDLElBQU1VLGdCQUFnQixRQUFLTixrQkFBa0JSOztpQkFFN0MsSUFBSWMsZ0JBQWdCLEdBQUc7cUJBQ25CLE9BQU9WLE9BQU8sY0FBY0osS0FBSzt3QkFDOUI7O3FCQUVILFFBQUtGLFVBQVVnQixlQUFlSixTQUFTZTs7O3FCQUd2QyxPQUFPdEIsUUFBUSxRQUFLTCxVQUFVZ0I7Ozs7Ozs7Ozs7OztRRHNFdkM7U0FDQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLFlDNURSZCxJQUFJO2FBQUE7O2FBQ1osT0FBTyxJQUFJRSxRQUFRLFVBQUNDLFNBQVNDLFFBQVc7aUJBQ3BDLElBQU1VLGdCQUFnQixRQUFLTixrQkFBa0JSOztpQkFFN0MsSUFBSWMsZ0JBQWdCLEdBQUc7cUJBQ25CLE9BQU9WLE9BQU8sY0FBY0osS0FBSzt3QkFDOUI7O3FCQUVILFFBQUtGLFVBQVVnQixlQUFlSixTQUFTZ0I7OztxQkFHdkMsT0FBT3ZCLFFBQVEsUUFBS0wsVUFBVWdCOzs7Ozs7Ozs7Ozs7UUQwRXZDO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxJQ2hFaEJkLElBQUk7YUFBQTs7YUFDSixPQUFPLElBQUlFLFFBQVEsVUFBQ0MsU0FBU0MsUUFBVztpQkFDcEMsSUFBTVUsZ0JBQWdCLFFBQUtOLGtCQUFrQlI7O2lCQUU3QyxJQUFJYyxnQkFBZ0IsR0FBRztxQkFDbkIsT0FBT1YsT0FBTyxjQUFjSixLQUFLO3dCQUM5Qjs7cUJBRUgsT0FBT0csUUFBUSxRQUFLTCxVQUFVZ0I7Ozs7Ozs7Ozs7O1FENkV2QztTQUNDLEtBQUs7U0FDTCxPQUFPLFNBQVMsV0NwRVQ7YUFBQTs7YUFDUCxPQUFPLElBQUlaLFFBQVEsVUFBQ0MsU0FBU0MsUUFBVztpQkFDcEMsSUFBSSxDQUFDLFFBQUtOLGFBQWEsUUFBS0EsVUFBVU8sU0FBUyxHQUFHO3FCQUM5QyxPQUFPRCxPQUFPO3dCQUNYOztxQkFFSCxPQUFPRCxRQUFRLFFBQUtMLFVBQVU7Ozs7Ozs7Ozs7OztRRGtGdkM7U0FDQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLGFDeEVQQyxTQUFTO2FBQ2xCLE9BQU8sSUFBSUcsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNTSxXQUFXLG1CQUFTaUIsS0FBSzVCOztpQkFFL0IsSUFBSVcsVUFBVTs7cUJBRVYsT0FBT1AsUUFBUU87d0JBQ1o7cUJBQ0gsT0FBT04sT0FBTyw0QkFBNEJMOzs7Ozs7Ozs7Ozs7O1FEcUZuRDtTQUNDLEtBQUs7U0FDTCxPQUFPLFNBQVMsUUMxRVpDLElBQUk0QixVQUFVO2FBQUE7O2FBQ2xCLE9BQU8sSUFBSTFCLFFBQVEsVUFBQ0MsU0FBU0MsUUFBVztpQkFDcEMsSUFBTVUsZ0JBQWdCLFFBQUtOLGtCQUFrQlI7O2lCQUU3QyxJQUFJYyxnQkFBZ0IsR0FBRztxQkFDbkIsT0FBT1YsT0FBTyxjQUFjSixLQUFLO3dCQUM5Qjs7cUJBRUgsUUFBS0YsVUFBVWdCLGVBQWVKLFNBQVNtQixRQUFRRDs7O3FCQUcvQyxPQUFPekIsUUFBUSxRQUFLTCxVQUFVZ0I7Ozs7Ozs7Ozs7Ozs7UUR5RnZDO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxPQzlFYmQsSUFBSTRCLFVBQVU7YUFBQTs7YUFDakIsT0FBTyxJQUFJMUIsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNVSxnQkFBZ0IsUUFBS04sa0JBQWtCUjs7aUJBRTdDLElBQUljLGdCQUFnQixHQUFHO3FCQUNuQixPQUFPVixPQUFPLGNBQWNKLEtBQUs7d0JBQzlCOztxQkFFSCxRQUFLRixVQUFVZ0IsZUFBZUosU0FBU29CLE9BQU9GOzs7cUJBRzlDLE9BQU96QixRQUFRLFFBQUtMLFVBQVVnQjs7Ozs7Ozs7Ozs7Ozs7UUQ4RnZDO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxPQ2xGYmQsSUFBSTRCLFVBQVVyQixPQUFPO2FBQUE7O2FBQ3hCLE9BQU8sSUFBSUwsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNVSxnQkFBZ0IsUUFBS04sa0JBQWtCUjs7aUJBRTdDLElBQUljLGdCQUFnQixHQUFHO3FCQUNuQixPQUFPVixPQUFPLGNBQWNKLEtBQUs7d0JBQzlCOztxQkFFSCxRQUFLRixVQUFVZ0IsZUFBZUosU0FBU3FCLE9BQU9ILFVBQVVyQjs7O3FCQUd4RCxPQUFPSixRQUFRLFFBQUtMLFVBQVVnQjs7Ozs7Ozs7Ozs7O1FEZ0d2QztTQUNDLEtBQUs7U0FDTCxPQUFPLFNBQVMsZ0JDdEZKZCxJQUFJO2FBQUE7O2FBQ2hCLE9BQU8sSUFBSUUsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNVSxnQkFBZ0IsUUFBS04sa0JBQWtCUjs7aUJBRTdDLElBQUljLGdCQUFnQixHQUFHO3FCQUNuQixPQUFPVixPQUFPLGNBQWNKLEtBQUs7d0JBQzlCOztxQkFFSCxPQUFPRyxRQUFRLFFBQUtMLFVBQVVnQixlQUFlSixTQUFTc0I7Ozs7Ozs7Ozs7Ozs7UURxRy9EO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxPQzFGYmhDLElBQUk0QixVQUFVO2FBQUE7O2FBQ2pCLE9BQU8sSUFBSTFCLFFBQVEsVUFBQ0MsU0FBU0MsUUFBVztpQkFDcEMsSUFBTVUsZ0JBQWdCLFFBQUtOLGtCQUFrQlI7O2lCQUU3QyxJQUFJYyxnQkFBZ0IsR0FBRztxQkFDbkIsT0FBT1YsT0FBTyxjQUFjSixLQUFLO3dCQUM5QjtxQkFDSCxRQUFLRixVQUFVZ0IsZUFBZUosU0FBU3VCLE9BQU9MOzs7cUJBRzlDLE9BQU96QixRQUFRLFFBQUtMLFVBQVVnQjs7Ozs7Ozs7Ozs7O1FEd0d2QztTQUNDLEtBQUs7U0FDTCxPQUFPLFNBQVMsZ0JDOUZKZCxJQUFJO2FBQUE7O2FBQ2hCLE9BQU8sSUFBSUUsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNVSxnQkFBZ0IsUUFBS04sa0JBQWtCUjs7aUJBRTdDLElBQUljLGdCQUFnQixHQUFHO3FCQUNuQixPQUFPVixPQUFPLGNBQWNKLEtBQUs7d0JBQzlCOztxQkFFSCxPQUFPRyxRQUFRLFFBQUtMLFVBQVVnQixlQUFlSixTQUFTd0I7Ozs7Ozs7Ozs7OztRRDRHL0Q7U0FDQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLE1DbEdkbEMsSUFBSTthQUFBOzthQUNOLE9BQU8sSUFBSUUsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxJQUFNVSxnQkFBZ0IsUUFBS04sa0JBQWtCUjs7aUJBRTdDLElBQUljLGdCQUFnQixHQUFHO3FCQUNuQixPQUFPVixPQUFPLGNBQWNKLEtBQUs7d0JBQzlCOztxQkFFSCxPQUFPRyxRQUFRLFFBQUtMLFVBQVVnQixlQUFlSixTQUFTeUI7Ozs7Ozs7Ozs7Ozs7Ozs7O1FEcUgvRDtTQUNDLEtBQUs7U0FDTCxPQUFPLFNBQVMsa0JDckdGbkMsSUFBSTthQUNsQixJQUFJb0M7YUFDSixJQUFNQyxZQUFZLENBQUM7OzthQUduQixJQUFJLENBQUMsS0FBS3ZDLFVBQVVPLFFBQVE7O2lCQUV4QitCLGFBQWFDO29CQUVWOzs7O2lCQUlILEtBQUt2QyxVQUFVd0MsUUFBUSxVQUFDNUIsVUFBVUgsT0FBVTs7O3FCQUd4QyxJQUFJRyxTQUFTVixPQUFPQSxJQUFJO3lCQUNwQm9DLGFBQWE3Qjs7Ozs7YUFPekIsT0FBTzZCOzs7Ozs7Ozs7O1FENEdSO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxZQ3BHUnBDLElBQUk7YUFBQTs7YUFDWixPQUFPLElBQUlFLFFBQVEsVUFBQ0MsU0FBU0MsUUFBVztpQkFDcEMsSUFBTVUsZ0JBQWdCLFFBQUtOLGtCQUFrQlI7O2lCQUU3QyxJQUFJYyxnQkFBZ0IsR0FBRztxQkFDbkIsT0FBT1Y7OztpQkFHWCxJQUFNbUMsS0FBSyxRQUFLekMsVUFBVWdCLGVBQWVkOztpQkFFekMsUUFBS0YsVUFBVWdCLGVBQWVKLFNBQVM4QixHQUFHLFVBQVUsWUFBTTtxQkFDdEQsUUFBSzVDLFdBQVc2QyxNQUFoQixjQUFrQ0YsS0FBbEMsV0FBK0MsUUFBS3pDLFVBQVVnQjs7O2lCQUdsRSxRQUFLaEIsVUFBVWdCLGVBQWVKLFNBQVM4QixHQUFHLFVBQVUsWUFBTTtxQkFDdEQsUUFBSzVDLFdBQVc2QyxNQUFoQixjQUFrQ0YsS0FBbEMsV0FDc0IsUUFBS3pDLFVBQVVnQjs7O2lCQUd6QyxRQUFLaEIsVUFBVWdCLGVBQWVKLFNBQVM4QixHQUFHLFVBQVUsVUFBQ0UsVUFBVUMsV0FBYztxQkFDekUsUUFBSy9DLFdBQVc2QyxNQUFoQixjQUFrQ0YsS0FBbEMsV0FBK0M7eUJBQzNDRyxVQUFVQTt5QkFDVkMsV0FBV0E7Ozs7aUJBSW5CLFFBQUs3QyxVQUFVZ0IsZUFBZUosU0FBUzhCLEdBQUcsYUFBYSxVQUFDSSxPQUFPQyxTQUFZO3FCQUN2RSxRQUFLakQsV0FBVzZDLE1BQWhCLGNBQWtDRixLQUFsQyxjQUFrRDt5QkFDOUNLLE9BQU9BO3lCQUNQQyxTQUFTQTs7OztpQkFJakIsUUFBSy9DLFVBQVVnQixlQUFlSixTQUFTOEIsR0FBRyxZQUFZLFVBQUNJLE9BQU9DLFNBQVNDLFlBQWU7cUJBQ2xGLFFBQUtsRCxXQUFXNkMsTUFBaEIsY0FBa0NGLEtBQWxDLGFBQWlEO3lCQUM3Q0ssT0FBT0E7eUJBQ1BDLFNBQVNBO3lCQUNUQyxZQUFZQTs7OztpQkFJcEIsUUFBS2hELFVBQVVnQixlQUFlSixTQUFTOEIsR0FBRyxXQUFXLFVBQUNJLE9BQU9DLFNBQVk7cUJBQ3JFLFFBQUtqRCxXQUFXNkMsTUFBaEIsY0FBa0NGLEtBQWxDLFlBQWdEO3lCQUM1Q0ssT0FBT0E7eUJBQ1BDLFNBQVNBOzs7O2lCQUlqQixRQUFLL0MsVUFBVWdCLGVBQWVKLFNBQVM4QixHQUFHLGVBQWUsVUFBQ0ksT0FBT0MsU0FBWTtxQkFDekUsUUFBS2pELFdBQVc2QyxNQUFoQixjQUFrQ0YsS0FBbEMsZ0JBQW9EO3lCQUNoREssT0FBT0E7eUJBQ1BDLFNBQVNBOzs7O2lCQUlqQixRQUFLL0MsVUFBVWdCLGVBQWVKLFNBQVM4QixHQUFHLGVBQWMsVUFBQ0ksT0FBT0MsU0FDUEMsWUFBZTtxQkFDcEUsUUFBS2xELFdBQVc2QyxNQUFoQixjQUFrQ0YsS0FBbEMsZ0JBQW9EO3lCQUNoREssT0FBT0E7eUJBQ1BDLFNBQVNBO3lCQUNUQyxZQUFZQTs7OztpQkFJcEIsUUFBS2hELFVBQVVnQixlQUFlSixTQUFTOEIsR0FBRyxhQUFhLFVBQUNJLE9BQU9DLFNBQVk7cUJBQ3ZFLFFBQUtqRCxXQUFXNkMsTUFBaEIsY0FBa0NGLEtBQWxDLGNBQWtEO3lCQUM5Q0ssT0FBT0E7eUJBQ1BDLFNBQVNBOzs7O2lCQUlqQixRQUFLL0MsVUFBVWdCLGVBQWVKLFNBQVM4QixHQUFHLGVBQWUsVUFBQ0ksT0FBT0MsU0FBU0UsYUFDaEJDLFdBQWM7cUJBQ3BFLFFBQUtwRCxXQUFXNkMsTUFBaEIsY0FBa0NGLEtBQWxDLGdCQUFvRDt5QkFDaERLLE9BQU9BO3lCQUNQQyxTQUFTQTt5QkFDVEUsYUFBYUE7eUJBQ2JDLFdBQVdBOzs7O2lCQUluQixRQUFLbEQsVUFBVWdCLGVBQWVKLFNBQVM4QixHQUFHLFlBQVksVUFBQ0ksT0FBT0csYUFBZ0I7cUJBQzFFLFFBQUtuRCxXQUFXNkMsTUFBaEIsY0FBa0NGLEtBQWxDLGFBQWlEO3lCQUM3Q0ssT0FBT0E7eUJBQ1BHLGFBQWFBOzs7O2lCQUlyQixPQUFPNUMsUUFBUTs7Ozs7Ozs7Ozs7O1FEK0dwQjtTQUNDLEtBQUs7U0FDTCxPQUFPLFNBQVMsZ0JDcEdKOEMsUUFBUWpELElBQUk7YUFDeEIsT0FBT2lELE9BQU9DLE9BQU8sVUFBQ0MsUUFBVztpQkFDN0IsT0FBT0EsT0FBT25ELE9BQU9BO2dCQUN0Qjs7OztLRHdHUCxPQUFPOzs7Ozs7O0FFM3ZCWCxnRDs7Ozs7O0FDQUE7OztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7S0FDekMsT0FBTzs7QUFFWCxTQ0ZnQm9EOztBQUZoQjs7QUFFTyxVQUFTQSxrQkFDWjFELFVBQ0EyRCxpQkFDRjtLQUNFOzs7O0tBRUEsSUFBTXZGLFlBQVk7U0FDZHdGLFVBQVU7U0FDVkMsT0FBTztTQUNQQyxrQkFBa0I7YUFDZEMsWUFBWTthQUNaQyxjQUFjOztTQUVsQkMsU0FBUyxtQkFBTTthQUNYLE9BQU87aUJBQ0hDLEtBQUtDO2lCQUNMQyxNQUFNQzs7O1NBR2RDO1NBQ0FDLGNBQWM7OztLQUdsQixPQUFPbkc7O0tBR1AsU0FBUytGLGdCQUFnQkssUUFBUUMsVUFBVUMsUUFBUUMsYUFBYTtTQUM1RDs7OztTQUdBLElBQUksQ0FBQ0EsWUFBWVgsY0FBYzs7YUFFM0IsSUFBSVUsT0FBT3BFLElBQUk7aUJBQ1hxRSxZQUFZWCxlQUFlVSxPQUFPcEU7Ozs7Ozs7O0tBUzlDLFNBQVMrRCxpQkFBaUJHLFFBQVFDLFVBQVVDLFFBQVFDLGFBQWE7U0FDN0Q7Ozs7U0FHQTNFLFNBQVMsWUFBTTs7O2FBR1gyRCxnQkFBZ0JpQixPQUFPSCxTQUFTLElBQUlFLFlBQVlYLGNBQWNXLFlBQVlwRSxTQUNyRVksS0FBSyxVQUFDMEQsa0JBQXFCOzs7aUJBR3hCRixZQUFZRyxXQUFXRCxpQkFBaUI3RDtpQkFDeEMyRCxZQUFZWCxlQUFlYSxpQkFBaUJ2RTs7Ozs7U0FReEQsSUFBTXlFLFlBQVlQLE9BQU9RLElBQUksWUFBWSxVQUFDOUIsT0FBVTs7YUFFaERTLGdCQUFnQnRDLFFBQVFzRCxZQUFZWDs7Ozs7Ozs7O0FDbkVoRDs7QUFFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0tBQ3pDLE9BQU87OztBQUdYLEtBQUksZUFBZSxZQUFZLEVBQUUsU0FBUyxpQkFBaUIsUUFBUSxPQUFPLEVBQUUsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLLEVBQUUsSUFBSSxhQUFhLE1BQU0sSUFBSSxXQUFXLGFBQWEsV0FBVyxjQUFjLE9BQU8sV0FBVyxlQUFlLE1BQU0sSUFBSSxXQUFXLFlBQVksV0FBVyxXQUFXLE1BQU0sT0FBTyxlQUFlLFFBQVEsV0FBVyxLQUFLLGlCQUFpQixPQUFPLFVBQVUsYUFBYSxZQUFZLGFBQWEsRUFBRSxJQUFJLFlBQVksaUJBQWlCLFlBQVksV0FBVyxhQUFhLElBQUksYUFBYSxpQkFBaUIsYUFBYSxjQUFjLE9BQU87O0FBRWhpQixVQUFTLGdCQUFnQixVQUFVLGFBQWEsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLGNBQWMsRUFBRSxNQUFNLElBQUksVUFBVTs7O3FEQUU5QztLQ1I5RCw0QkFDSWlCLGdCQUNGO1NBQ0U7O1NBREY7O1NBR0UsS0FBS0EsaUJBQWlCQTs7U0FHdEIsS0FBS0M7OztLRFdULGFBQWEsb0JBQW9CLENBQUM7U0FDOUIsS0FBSztTQUNMLE9BQU8sU0FBUyxZQ05SOzthQUVSLEtBQUszRSxVQUNEdkMsUUFBUW1ILE9BQU8sSUFBSSxLQUFLRixnQkFBZ0JqSCxRQUFRb0gsU0FBUyxLQUFLckIsY0FBYzs7OztLRFNwRixPQUFPOzs7Ozs7O0FFN0JYOzs7QUFFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0tBQ3pDLE9BQU87O0FBRVgsU0NIZ0JzQjs7QUFGaEI7O0FBRU8sVUFBU0Esc0JBQ1psRixNQUFNSCxVQUFVRSxZQUNoQitFLGdCQUFnQnRCLGlCQUNsQjtLQUNFOzs7S0FFQSxJQUFNdkYsWUFBWTtTQUNkd0YsVUFBVTtTQUNWQyxPQUFPO1NBQ1BDLGtCQUFrQjthQUNkd0IsZ0JBQWdCO2FBQ2hCdEIsY0FBYzs7U0FFbEJDLFNBQVMsbUJBQU07YUFDWCxPQUFPO2lCQUNIQyxLQUFLQzs7O1NBR2JHO1NBQ0FDLGNBQWM7OztLQUdsQixPQUFPbkc7Ozs7O0tBUVAsU0FBUytGLGdCQUNMSyxRQUFRQyxVQUFVQyxRQUFRQyxhQUM1QjtTQUNFOzs7O1NBR0EsSUFBTTlCLEtBQUs4QixZQUFZWTs7O1NBR3ZCLElBQU1DLGNBQWMsY0FBYzNDLEtBQUs7U0FDdkMsSUFBTTRDLGNBQWMsY0FBY2QsWUFBWVksYUFBYTs7O1NBRzNELElBQU1HLGFBQWF4RixXQUFXOEUsSUFBSVEsYUFBYSxVQUFDdEMsT0FBT2pCLE1BQVM7YUFDNUQwRCx1QkFBdUIxRCxLQUFLakIsU0FBU3lCLE1BQU05QixRQUFRc0IsS0FBS2pCLFNBQVNjLGdCQUFnQjs7U0FFckYsSUFBTThELFNBQVMxRixXQUFXOEUsSUFBSVMsYUFBYSxVQUFDdkMsT0FBT2pCLE1BQVM7YUFDeEQwRCx1QkFBdUIxRCxLQUFLakIsU0FBU3lCLE1BQU05QixRQUFRc0IsS0FBS2pCLFNBQVNjLGdCQUFnQjs7O1NBSXJGMkMsU0FBUzNCLEdBQUcsU0FBUyxZQUFNOzs7YUFHdkJhLGdCQUFnQmxDLEtBQUtrRCxZQUFZWSxZQUFZWixZQUFZOUU7Ozs7Ozs7O1NBWTdELFNBQVM4Rix1QkFBdUI5RSxPQUFPZ0YsV0FBVzs7O2FBRzlDLElBQUksQ0FBQ2xCLFlBQVk5RSxjQUFjZ0IsVUFBVWdGLFdBQVc7aUJBQ2hEbkIsT0FBT29CLEtBQUssWUFBWTtvQkFDckI7aUJBQ0hwQixPQUFPb0IsS0FBSyxZQUFZOzs7Ozs7Ozs7O0FDMUV4Qzs7QUFFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0tBQ3pDLE9BQU87OztBQUdYLEtBQUksZUFBZSxZQUFZLEVBQUUsU0FBUyxpQkFBaUIsUUFBUSxPQUFPLEVBQUUsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLLEVBQUUsSUFBSSxhQUFhLE1BQU0sSUFBSSxXQUFXLGFBQWEsV0FBVyxjQUFjLE9BQU8sV0FBVyxlQUFlLE1BQU0sSUFBSSxXQUFXLFlBQVksV0FBVyxXQUFXLE1BQU0sT0FBTyxlQUFlLFFBQVEsV0FBVyxLQUFLLGlCQUFpQixPQUFPLFVBQVUsYUFBYSxZQUFZLGFBQWEsRUFBRSxJQUFJLFlBQVksaUJBQWlCLFlBQVksV0FBVyxhQUFhLElBQUksYUFBYSxpQkFBaUIsYUFBYSxjQUFjLE9BQU87O0FBRWhpQixVQUFTLGdCQUFnQixVQUFVLGFBQWEsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLGNBQWMsRUFBRSxNQUFNLElBQUksVUFBVTs7OzhGQUV0RDtLQ1J0RCx3QkFDSTNGLE1BQU1GLElBQUlELFVBQ1ZpRixnQkFBZ0J0QixpQkFDbEI7U0FDRTs7U0FERjs7U0FHRSxLQUFLeEQsT0FBT0E7U0FDWixLQUFLRixLQUFLQTtTQUNWLEtBQUtELFdBQVdBO1NBQ2hCLEtBQUtpRixpQkFBaUJBO1NBQ3RCLEtBQUt0QixrQkFBa0JBOztTQUd2QixLQUFLdUI7OztLRFVULGFBQWEsZ0JBQWdCLENBQUM7U0FDMUIsS0FBSztTQUNMLE9BQU8sU0FBUyxZQ0xSOzthQUVSLEtBQUtyRixhQUFhLEtBQUt5RixrQkFBa0IsS0FBS0wsZUFBZXBGO2FBQzdELEtBQUswRixhQUFhOzs7YUFHbEIsS0FBS1E7Ozs7Ozs7OztRRGNOO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxTQ05YO2FBQUE7O2FBRUwsT0FBTyxLQUFLOUYsR0FBRyxVQUFDUSxTQUFTQyxRQUFXOztpQkFFaEMsSUFBSSxNQUFLc0QsY0FBYztxQkFDbkIsTUFBS3VCLGFBQWEsTUFBS3ZCO3FCQUN2QnZELFFBQVEsTUFBSzhFO3dCQUNWO3FCQUNILE1BQUt2RixTQUFTLFlBQU07eUJBQ2hCLE1BQUsyRCxnQkFBZ0JxQyxXQUNoQjdFLEtBQUssVUFBQ0gsVUFBYTs2QkFDaEIsTUFBS3VFLGFBQWF2RSxTQUFTVjs2QkFDM0JHLFFBQVEsTUFBSzhFOzRCQUVoQlUsTUFBTSxVQUFDbEYsT0FBVTs2QkFDZCxNQUFLWixLQUFLK0YsS0FBS25GOzZCQUNmTCxPQUFPSzs7Ozs7Ozs7S0RhL0IsT0FBTzs7Ozs7OztBRW5FWDs7O0FBRUEsUUFBTyxlQUFlLFNBQVMsY0FBYztLQUN6QyxPQUFPOztBQUVYLFNDSGdCb0Y7O0FBRmhCOztBQUVPLFVBQVNBLDBCQUNaaEcsTUFBTUgsVUFBVUUsWUFDaEIrRSxnQkFBZ0J0QixpQkFDbEI7S0FDRTs7O0tBRUEsSUFBTXZGLFlBQVk7U0FDZHdGLFVBQVU7U0FDVkMsT0FBTztTQUNQQyxrQkFBa0I7YUFDZHNDLG9CQUFvQjthQUNwQnBDLGNBQWM7O1NBRWxCQyxTQUFTLG1CQUFNO2FBQ1gsT0FBTztpQkFDSEMsS0FBS0M7OztTQUdiRztTQUNBQyxjQUFjOzs7S0FHbEIsT0FBT25HOzs7OztLQU1QLFNBQVMrRixnQkFDTEssUUFBUUMsVUFBVUMsUUFBUUMsYUFDNUI7U0FDRTs7OztTQUdBLElBQU05QixLQUFLOEIsWUFBWVk7OztTQUd2QixJQUFNQyxjQUFjLGNBQWMzQyxLQUFLO1NBQ3ZDLElBQU00QyxjQUFjLGNBQWNkLFlBQVlZLGFBQWE7OztTQUczRCxJQUFNRyxhQUFheEYsV0FBVzhFLElBQUlRLGFBQWEsVUFBQ3RDLE9BQU9qQixNQUFTO2FBQzVEMEQsdUJBQXVCMUQsS0FBS2pCLFNBQVNjOztTQUV6QyxJQUFNOEQsU0FBUzFGLFdBQVc4RSxJQUFJUyxhQUFhLFVBQUN2QyxPQUFPakIsTUFBUzthQUN4RDBELHVCQUF1QjFELEtBQUtqQixTQUFTYzs7O1NBSXpDMkMsU0FBUzNCLEdBQUcsU0FBUyxZQUFNOzs7YUFHdkJhLGdCQUFnQmpDLFNBQVNpRCxZQUFZWSxZQUFZWixZQUFZOUU7Ozs7Ozs7O1NBWWpFLFNBQVM4Rix1QkFBdUI5RSxPQUFPOzthQUVuQyxJQUFJLENBQUM4RCxZQUFZOUUsY0FBY2dCLFVBQVUsR0FBRztpQkFDeEM2RCxPQUFPb0IsS0FBSyxZQUFZO29CQUNyQjtpQkFDSHBCLE9BQU9vQixLQUFLLFlBQVk7Ozs7Ozs7Ozs7QUN2RXhDOztBQUVBLFFBQU8sZUFBZSxTQUFTLGNBQWM7S0FDekMsT0FBTzs7O0FBR1gsS0FBSSxlQUFlLFlBQVksRUFBRSxTQUFTLGlCQUFpQixRQUFRLE9BQU8sRUFBRSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUssRUFBRSxJQUFJLGFBQWEsTUFBTSxJQUFJLFdBQVcsYUFBYSxXQUFXLGNBQWMsT0FBTyxXQUFXLGVBQWUsTUFBTSxJQUFJLFdBQVcsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLGVBQWUsUUFBUSxXQUFXLEtBQUssaUJBQWlCLE9BQU8sVUFBVSxhQUFhLFlBQVksYUFBYSxFQUFFLElBQUksWUFBWSxpQkFBaUIsWUFBWSxXQUFXLGFBQWEsSUFBSSxhQUFhLGlCQUFpQixhQUFhLGNBQWMsT0FBTzs7QUFFaGlCLFVBQVMsZ0JBQWdCLFVBQVUsYUFBYSxFQUFFLElBQUksRUFBRSxvQkFBb0IsY0FBYyxFQUFFLE1BQU0sSUFBSSxVQUFVOzs7a0dBRTlDO0tDUjlELDRCQUNJM0YsTUFBTUYsSUFBSUQsVUFDVmlGLGdCQUFnQnRCLGlCQUNsQjtTQUNFOztTQURGOztTQUdFLEtBQUt4RCxPQUFPQTtTQUNaLEtBQUtGLEtBQUtBO1NBQ1YsS0FBS0QsV0FBV0E7U0FDaEIsS0FBS2lGLGlCQUFpQkE7U0FDdEIsS0FBS3RCLGtCQUFrQkE7O1NBR3ZCLEtBQUt1Qjs7O0tEVVQsYUFBYSxvQkFBb0IsQ0FBQztTQUM5QixLQUFLO1NBQ0wsT0FBTyxTQUFTLFlDTFI7O2FBRVIsS0FBS3JGLGFBQWEsS0FBS3VHLHNCQUFzQixLQUFLbkIsZUFBZXBGO2FBQ2pFLEtBQUswRixhQUFhOzs7YUFHbEIsS0FBS1E7Ozs7Ozs7OztRRGNOO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxTQ05YO2FBQUE7O2FBRUwsT0FBTyxLQUFLOUYsR0FBRyxVQUFDUSxTQUFTQyxRQUFXOztpQkFFaEMsSUFBSSxNQUFLc0QsY0FBYztxQkFDbkIsTUFBS3VCLGFBQWEsTUFBS3ZCO3FCQUN2QnZELFFBQVEsTUFBSzhFO3dCQUNWO3FCQUNILE1BQUt2RixTQUFTLFlBQU07eUJBQ2hCLE1BQUsyRCxnQkFBZ0JxQyxXQUNoQjdFLEtBQUssVUFBQ0gsVUFBYTs2QkFDaEIsTUFBS3VFLGFBQWF2RSxTQUFTVjs2QkFDM0JHLFFBQVEsTUFBSzhFOzRCQUVoQlUsTUFBTSxVQUFDbEYsT0FBVTs2QkFDZCxNQUFLWixLQUFLK0YsS0FBS25GOzZCQUNmTCxPQUFPSzs7Ozs7Ozs7S0RhL0IsT0FBTyIsImZpbGUiOiJhbmd1bGFyLWZsaWNraXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiRmxpY2tpdHlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJhbmd1bGFyLWZsaWNraXR5XCIsIFtcIkZsaWNraXR5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFuZ3VsYXItZmxpY2tpdHlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJGbGlja2l0eVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYW5ndWxhci1mbGlja2l0eVwiXSA9IGZhY3Rvcnkocm9vdFtcIkZsaWNraXR5XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjM2IxYzQ4NGFkN2FhOTAxNWJjMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9mbGlja2l0eSA9IHJlcXVpcmUoJy4vZmxpY2tpdHkucHJvdmlkZXInKTtcblxudmFyIF9mbGlja2l0eTIgPSByZXF1aXJlKCcuL2ZsaWNraXR5LnNlcnZpY2UnKTtcblxudmFyIF9mbGlja2l0eTMgPSByZXF1aXJlKCcuL2ZsaWNraXR5LmRpcmVjdGl2ZScpO1xuXG52YXIgX2ZsaWNraXR5TmV4dCA9IHJlcXVpcmUoJy4vbmV4dC9mbGlja2l0eU5leHQuZGlyZWN0aXZlJyk7XG5cbnZhciBfZmxpY2tpdHlQcmV2aW91cyA9IHJlcXVpcmUoJy4vcHJldmlvdXMvZmxpY2tpdHlQcmV2aW91cy5kaXJlY3RpdmUnKTtcblxuYW5ndWxhci5tb2R1bGUoJ2JjLkZsaWNraXR5JywgW10pLnByb3ZpZGVyKCdGbGlja2l0eUNvbmZpZycsIF9mbGlja2l0eS5GbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKS5zZXJ2aWNlKCdGbGlja2l0eVNlcnZpY2UnLCBfZmxpY2tpdHkyLkZsaWNraXR5U2VydmljZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5JywgX2ZsaWNraXR5My5GbGlja2l0eURpcmVjdGl2ZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5TmV4dCcsIF9mbGlja2l0eU5leHQuRmxpY2tpdHlOZXh0RGlyZWN0aXZlKS5kaXJlY3RpdmUoJ2JjRmxpY2tpdHlQcmV2aW91cycsIF9mbGlja2l0eVByZXZpb3VzLkZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHsgRmxpY2tpdHlDb25maWdQcm92aWRlciB9IGZyb20gJy4vZmxpY2tpdHkucHJvdmlkZXInXG5pbXBvcnQgeyBGbGlja2l0eVNlcnZpY2UgfSBmcm9tICcuL2ZsaWNraXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgRmxpY2tpdHlEaXJlY3RpdmUgfSBmcm9tICcuL2ZsaWNraXR5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGbGlja2l0eU5leHREaXJlY3RpdmUgfSBmcm9tICcuL25leHQvZmxpY2tpdHlOZXh0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlIH0gZnJvbSAnLi9wcmV2aW91cy9mbGlja2l0eVByZXZpb3VzLmRpcmVjdGl2ZSc7XG5cbmFuZ3VsYXIubW9kdWxlKCdiYy5GbGlja2l0eScsIFtdKVxuICAgIC5wcm92aWRlcignRmxpY2tpdHlDb25maWcnLCBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKVxuICAgIC5zZXJ2aWNlKCdGbGlja2l0eVNlcnZpY2UnLCBGbGlja2l0eVNlcnZpY2UpXG4gICAgLmRpcmVjdGl2ZSgnYmNGbGlja2l0eScsIEZsaWNraXR5RGlyZWN0aXZlKVxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHlOZXh0JywgRmxpY2tpdHlOZXh0RGlyZWN0aXZlKVxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHlQcmV2aW91cycsIEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUpXG47XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2luZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyID0gZXhwb3J0cy5GbGlja2l0eUNvbmZpZ1Byb3ZpZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKTtcblxuICAgICAgICAvLyBEZWZpbmUgRmxpY2tpdHkgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5hY2Nlc3NpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGFwdGl2ZUhlaWdodCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmF1dG9QbGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2VsbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIHRoaXMuY2VsbFNlbGVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmNvbnRhaW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYWdUaHJlc2hvbGQgPSAzO1xuICAgICAgICB0aGlzLmZyZWVTY3JvbGwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mcmVlU2Nyb2xsRnJpY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEF0dHJhY3Rpb24gPSAuMDI1O1xuICAgICAgICB0aGlzLmZyaWN0aW9uID0gLjI4O1xuICAgICAgICB0aGlzLmdyb3VwQ2VsbHMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0aWFsSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmxhenlMb2FkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wZXJjZW50UG9zaXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnByZXZOZXh0QnV0dG9ucyA9IHRydWU7XG4gICAgICAgIHRoaXMucGFnZURvdHMgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc2l6ZSA9IHRydWU7XG4gICAgICAgIHRoaXMucmlnaHRUb0xlZnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSA9IHRydWU7XG4gICAgICAgIHRoaXMud2F0Y2hDU1MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2VzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hc05hdkZvciA9IHRydWU7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEZsaWNraXR5Q29uZmlnUHJvdmlkZXIsIFt7XG4gICAgICAgIGtleTogJyRnZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gJGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEZsaWNraXR5Q29uZmlnUHJvdmlkZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkucHJvdmlkZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgRmxpY2tpdHlDb25maWdQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gRGVmaW5lIEZsaWNraXR5IGRlZmF1bHRzXG4gICAgICAgIHRoaXMuYWNjZXNzaWJpbGl0eSAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGFwdGl2ZUhlaWdodCAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hdXRvUGxheSAgICAgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jZWxsQWxpZ24gICAgICAgICAgPSAnY2VudGVyJztcbiAgICAgICAgdGhpcy5jZWxsU2VsZWN0b3IgICAgICAgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY29udGFpbiAgICAgICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlICAgICAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kcmFnVGhyZXNob2xkICAgICAgPSAzO1xuICAgICAgICB0aGlzLmZyZWVTY3JvbGwgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZyZWVTY3JvbGxGcmljdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQXR0cmFjdGlvbiA9IC4wMjU7XG4gICAgICAgIHRoaXMuZnJpY3Rpb24gICAgICAgICAgID0gLjI4O1xuICAgICAgICB0aGlzLmdyb3VwQ2VsbHMgICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmluaXRpYWxJbmRleCAgICAgICA9IDA7XG4gICAgICAgIHRoaXMubGF6eUxvYWQgICAgICAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wZXJjZW50UG9zaXRpb24gICAgPSB0cnVlO1xuICAgICAgICB0aGlzLnByZXZOZXh0QnV0dG9ucyAgICA9IHRydWU7XG4gICAgICAgIHRoaXMucGFnZURvdHMgICAgICAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNpemUgICAgICAgICAgICAgPSB0cnVlO1xuICAgICAgICB0aGlzLnJpZ2h0VG9MZWZ0ICAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldEdhbGxlcnlTaXplICAgICA9IHRydWU7XG4gICAgICAgIHRoaXMud2F0Y2hDU1MgICAgICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMud3JhcEFyb3VuZCAgICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaW1hZ2VzTG9hZGVkICAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hc05hdkZvciAgICAgICAgICAgPSB0cnVlO1xuICAgIH1cblxuXG5cblxuICAgICRnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZsaWNraXR5U2VydmljZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9mbGlja2l0eSA9IHJlcXVpcmUoJ2ZsaWNraXR5Jyk7XG5cbnZhciBfZmxpY2tpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxpY2tpdHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmxpY2tpdHlTZXJ2aWNlID0gZXhwb3J0cy5GbGlja2l0eVNlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmxpY2tpdHlTZXJ2aWNlKCR0aW1lb3V0LCAkcSwgJHJvb3RTY29wZSwgJGxvZykge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGlja2l0eVNlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IEZsaWNraXR5IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKEZsaWNraXR5U2VydmljZSwgW3tcbiAgICAgICAga2V5OiAnY3JlYXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZShlbGVtZW50LCBpZCwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzc2lnbiBhIG5ldyBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBfdGhpcy5pbnN0YW5jZXMubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgSUQgaXMgYWxyZWFkeSBpbiB1c2VcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2ZpbmRPYmplY3RCeUlkKF90aGlzLmluc3RhbmNlcywgaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IF90aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZTogJywgX3RoaXMuaW5zdGFuY2VzW2luZGV4XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIHRoZSBuZXcgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2U6IG5ldyBfZmxpY2tpdHkyLmRlZmF1bHQoZWxlbWVudCwgb3B0aW9ucylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gU2F2ZSB0aGlzIGluc3RhbmNlIHRvIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIF90aGlzLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcblxuICAgICAgICAgICAgICAgIC8vIEJpbmQgdG8gYWxsIGV2ZW50c1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5fYmluZEV2ZW50cyhpZCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlc3Ryb3kgYSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGVzdHJveScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIF90aGlzMi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbnN0YW5jZSBmcm9tIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIF90aGlzMi5pbnN0YW5jZXMuc3BsaWNlKGZsaWNraXR5SW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoJ0luc3RhbmNlICcgKyBpZCArICcgZGVzdHJveWVkLicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGFsbCBpbnN0YW5jZXNcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGluc3RhbmNlc1xuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0QWxsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFsbCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMzLmluc3RhbmNlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICduZXh0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG5leHQoaWQsIGlzV3JhcHBlZCwgaXNJbnN0YW50KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UubmV4dChpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczQuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncHJldmlvdXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJldmlvdXMoaWQsIGlzV3JhcHBlZCwgaXNJbnN0YW50KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczUuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnByZXZpb3VzKGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbGVjdCBhIHNsaWRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3QoaWQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGlzV3JhcHBlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB2YXIgaXNJbnN0YW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdChpbmRleCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2VsZWN0IGEgc2xpZGUgb2YgYSBjZWxsXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ8U3RyaW5nfSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RDZWxsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdENlbGwoaWQsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGlzV3JhcHBlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB2YXIgaXNJbnN0YW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczcuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdENlbGwodmFsdWUsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudCBzbGlkZSBpbmRleFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7SW50ZWdlcn0gc2VsZWN0ZWRJbmRleFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2VsZWN0ZWRJbmRleCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RlZEluZGV4KGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzOC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM4Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNpemUgdGhlIGdhbGxlcnkgYW5kIHJlLXBvc2l0aW9uIGNlbGxzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVzaXplJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2l6ZShpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczkuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgcmVzaXplXG4gICAgICAgICAgICAgICAgICAgIF90aGlzOS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVzaXplKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQb3NpdGlvbiBjZWxscyBhdCBzZWxlY3RlZCBwb3NpdGlvbi5cbiAgICAgICAgICogVHJpZ2dlciByZXBvc2l0aW9uIGFmdGVyIHRoZSBzaXplIG9mIGEgY2VsbCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVwb3NpdGlvbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXBvc2l0aW9uKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczEwLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVwb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlLWNvbGxlY3QgYWxsIGNlbGwgZWxlbWVudHMgaW4gYGZsaWNraXR5LXNsaWRlcmAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZWxvYWRDZWxscycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZWxvYWRDZWxscyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTEgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZWxvYWQgY2VsbHNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVsb2FkQ2VsbHMoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYSBGbGlja2l0eSBpbnN0YW5jZSBieSBJRFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTIuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGZpcnN0IEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEZpcnN0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpcnN0KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMxMy5pbnN0YW5jZXMgfHwgX3RoaXMxMy5pbnN0YW5jZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdObyBpbnN0YW5jZXMgZXhpc3QnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTMuaW5zdGFuY2VzWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRCeUVsZW1lbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QnlFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gX2ZsaWNraXR5Mi5kZWZhdWx0LmRhdGEoZWxlbWVudCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2Ugbm90IGZvdW5kIGZvciAnICsgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJlcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdhbGxlcnkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncHJlcGVuZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmVwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTQgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBQcmVwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQXBwZW5kIGVsZW1lbnRzIGFuZCBjcmVhdGUgY2VsbHMgdG8gdGhlIGVuZCBvZiB0aGUgZ2FsbGVyeS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTUgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE1Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5hcHBlbmQoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydCBlbGVtZW50cyBpbnRvIHRoZSBnYWxsZXJ5IGFuZCBjcmVhdGUgY2VsbHMgYXQgdGhlIGRlc2lyZWQgaW5kZXguXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIFplcm8gYmFzZWQgaW5kZXhcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaW5zZXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluc2VydChpZCwgZWxlbWVudHMsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE2Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEluc2VydCB0aGUgc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmluc2VydChlbGVtZW50cywgaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgZWxlbWVudHMgb2YgdGhlIGNlbGxzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbEVsZW1lbnRzXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRDZWxsRWxlbWVudHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2VsbEVsZW1lbnRzKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE3Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYXJyYXkgb2YgY2VsbCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGNlbGxzIGJ5IGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEVsZW1lbnR9IGVsZW1lbnQocylcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVtb3ZlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE4ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTguX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxOC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVtb3ZlKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxsIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IHNlbGVjdGVkQ2VsbEVsZW1lbnRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdGVkRWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RlZEVsZW1lbnQoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE5ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTkuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IGFuIGFycmF5IG9mIGFsbCBjZWxsc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGNlbGxzXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjZWxscycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjZWxscyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMjAgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyMC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGxzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMjAuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmNlbGxzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEhlbHBlciBtZXRob2RzXG4gICAgICAgIC8vXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRmluZCB0aGUgaW5kZXggZm9yIGEgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IGZsaWNraXR5SW5kZXhcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRGbGlja2l0eUluZGV4JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRGbGlja2l0eUluZGV4KGlkKSB7XG4gICAgICAgICAgICB2YXIgZm91bmRJbmRleCA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBOT1RfRk9VTkQgPSAtMTtcblxuICAgICAgICAgICAgLy8gSWYgbm8gaW5zdGFuY2VzIGV4aXN0XG4gICAgICAgICAgICBpZiAoIXRoaXMuaW5zdGFuY2VzLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IE5PVF9GT1VORDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgaW5zdGFuY2VzIGRvIGV4aXN0XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0aGUgSUQgb2YgZWFjaCBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLmZvckVhY2goZnVuY3Rpb24gKGluc3RhbmNlLCBpbmRleCkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IG1hdGNoZXMgb3VyIElELCBzZXQgdGhlIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZm91bmRJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCaW5kIGFsbCBldmVudHMgZm9yIGEgbmV3IGluc3RhbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sfSBpc0ZpbmlzaGVkXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfYmluZEV2ZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYmluZEV2ZW50cyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMjEgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyMS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBJRCA9IF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmlkO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNlbGVjdCcsIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZXR0bGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpzZXR0bGUnLCBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKHByb2dyZXNzLCBwb3NpdGlvblgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNjcm9sbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcG9zaXRpb25YXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ1N0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnTW92ZScsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgbW92ZVZlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ01vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnRW5kJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpkcmFnRW5kJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyRG93bicsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlckRvd24nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJNb3ZlJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpwb2ludGVyTW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJVcCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlclVwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzdGF0aWNDbGljaycsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgY2VsbEVsZW1lbnQsIGNlbGxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c3RhdGljQ2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQ6IGNlbGxFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4OiBjZWxsSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignbGF6eUxvYWQnLCBmdW5jdGlvbiAoZXZlbnQsIGNlbGxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpsYXp5TG9hZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRmluZCBhbiBvYmplY3Qgd2l0aGluIGFuIGFycmF5IGJ5IElEXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBtYXRjaFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2ZpbmRPYmplY3RCeUlkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9maW5kT2JqZWN0QnlJZChzb3VyY2UsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmZpbHRlcihmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5pZCA9PT0gaWQ7XG4gICAgICAgICAgICB9KVswXTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGbGlja2l0eVNlcnZpY2U7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkuc2VydmljZS5qc1xuICoqLyIsImltcG9ydCBGbGlja2l0eSBmcm9tICdmbGlja2l0eSc7XG5cbmV4cG9ydCBjbGFzcyBGbGlja2l0eVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICR0aW1lb3V0LCAkcSwgJHJvb3RTY29wZSwgJGxvZ1xuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG5cbiAgICB9XG5cblxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGNyZWF0ZShlbGVtZW50LCBpZCwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgbm8gSUQgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgZWxlbWVudCdzIElEIGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICBpZCA9IGVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBhc3NpZ24gYSBuZXcgSURcbiAgICAgICAgICAgICAgICAgICAgaWQgPSB0aGlzLmluc3RhbmNlcy5sZW5ndGggKyAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBJRCBpcyBhbHJlYWR5IGluIHVzZVxuICAgICAgICAgICAgaWYgKHRoaXMuX2ZpbmRPYmplY3RCeUlkKHRoaXMuaW5zdGFuY2VzLCBpZCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGxvZy5lcnJvcignVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZTogJywgdGhpcy5pbnN0YW5jZXNbaW5kZXhdKTtcblxuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZWZpbmUgdGhlIG5ldyBpbnN0YW5jZVxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiBuZXcgRmxpY2tpdHkoZWxlbWVudCwgb3B0aW9ucyksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBTYXZlIHRoaXMgaW5zdGFuY2UgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcblxuICAgICAgICAgICAgLy8gQmluZCB0byBhbGwgZXZlbnRzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmluZEV2ZW50cyhpZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSBhIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgZGVzdHJveShpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGluc3RhbmNlIGZyb20gdGhlIGFycmF5XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5zcGxpY2UoZmxpY2tpdHlJbmRleCwgMSk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCdJbnN0YW5jZSAnICsgaWQgKyAnIGRlc3Ryb3llZC4nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYWxsIGluc3RhbmNlc1xuICAgICAqXG4gICAgICogQHJldHVybiB7QXJyYXl9IGluc3RhbmNlc1xuICAgICAqL1xuICAgIGdldEFsbCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5pbnN0YW5jZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgbmV4dChpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm5leHQoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBwcmV2aW91cyhpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgcHJldmlvdXMgc2xpZGVcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5wcmV2aW91cyhpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhIHNsaWRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZWxlY3QoaWQsIGluZGV4LCBpc1dyYXBwZWQgPSBmYWxzZSwgaXNJbnN0YW50ID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3QoaW5kZXgsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IGEgc2xpZGUgb2YgYSBjZWxsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ8U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgc2VsZWN0Q2VsbChpZCwgdmFsdWUsIGlzV3JhcHBlZCA9IGZhbHNlLCBpc0luc3RhbnQgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdENlbGwodmFsdWUsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBzZWxlY3RlZEluZGV4XG4gICAgICovXG4gICAgc2VsZWN0ZWRJbmRleChpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgdGhlIGdhbGxlcnkgYW5kIHJlLXBvc2l0aW9uIGNlbGxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlc2l6ZShpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSByZXNpemVcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZXNpemUoKTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gY2VsbHMgYXQgc2VsZWN0ZWQgcG9zaXRpb24uXG4gICAgICogVHJpZ2dlciByZXBvc2l0aW9uIGFmdGVyIHRoZSBzaXplIG9mIGEgY2VsbCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlcG9zaXRpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgcmVwb3NpdGlvblxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlcG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmUtY29sbGVjdCBhbGwgY2VsbCBlbGVtZW50cyBpbiBgZmxpY2tpdHktc2xpZGVyYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICByZWxvYWRDZWxscyhpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxvYWQgY2VsbHNcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZWxvYWRDZWxscygpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBGbGlja2l0eSBpbnN0YW5jZSBieSBJRFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldChpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmlyc3QgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXRGaXJzdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZXMgfHwgdGhpcy5pbnN0YW5jZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ05vIGluc3RhbmNlcyBleGlzdCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXRCeUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBGbGlja2l0eS5kYXRhKGVsZW1lbnQpXG5cbiAgICAgICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlIG5vdCBmb3VuZCBmb3IgJyArIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByZXBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBnYWxsZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHByZXBlbmQoaWQsIGVsZW1lbnRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFByZXBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnByZXBlbmQoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgZW5kIG9mIHRoZSBnYWxsZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFwcGVuZChpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5hcHBlbmQoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgZWxlbWVudHMgaW50byB0aGUgZ2FsbGVyeSBhbmQgY3JlYXRlIGNlbGxzIGF0IHRoZSBkZXNpcmVkIGluZGV4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIFplcm8gYmFzZWQgaW5kZXhcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgaW5zZXJ0KGlkLCBlbGVtZW50cywgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5pbnNlcnQoZWxlbWVudHMsIGluZGV4KTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBlbGVtZW50cyBvZiB0aGUgY2VsbHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsRWxlbWVudHNcbiAgICAgKi9cbiAgICBnZXRDZWxsRWxlbWVudHMoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuZ2V0Q2VsbEVsZW1lbnRzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBjZWxscyBieSBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxFbGVtZW50fSBlbGVtZW50KHMpXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlbW92ZShpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVtb3ZlKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbCBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fSBzZWxlY3RlZENlbGxFbGVtZW50XG4gICAgICovXG4gICAgc2VsZWN0ZWRFbGVtZW50KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VsZWN0ZWQgZWxlbWVudFxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGFycmF5IG9mIGFsbCBjZWxsc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7QXJyYXl9IGNlbGxzXG4gICAgICovXG4gICAgY2VsbHMoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsc1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmNlbGxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8vXG4gICAgLy8gSGVscGVyIG1ldGhvZHNcbiAgICAvL1xuXG5cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBpbmRleCBmb3IgYSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7SW50ZWdlcn0gZmxpY2tpdHlJbmRleFxuICAgICAqL1xuICAgIF9nZXRGbGlja2l0eUluZGV4KGlkKSB7XG4gICAgICAgIGxldCBmb3VuZEluZGV4O1xuICAgICAgICBjb25zdCBOT1RfRk9VTkQgPSAtMTtcblxuICAgICAgICAvLyBJZiBubyBpbnN0YW5jZXMgZXhpc3RcbiAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgZm91bmRJbmRleCA9IE5PVF9GT1VORDtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaW5zdGFuY2VzIGRvIGV4aXN0XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHRoZSBJRCBvZiBlYWNoIGluc3RhbmNlXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSwgaW5kZXgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIElmIGl0IG1hdGNoZXMgb3VyIElELCBzZXQgdGhlIGluZGV4XG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kSW5kZXg7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBCaW5kIGFsbCBldmVudHMgZm9yIGEgbmV3IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtCb29sfSBpc0ZpbmlzaGVkXG4gICAgICovXG4gICAgX2JpbmRFdmVudHMoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBJRCA9IHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmlkO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2VsZWN0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06c2VsZWN0YCwgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZXR0bGUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzZXR0bGVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3Njcm9sbCcsIChwcm9ncmVzcywgcG9zaXRpb25YKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzY3JvbGxgLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiBwb3NpdGlvblgsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdTdGFydCcsIChldmVudCwgcG9pbnRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06ZHJhZ1N0YXJ0YCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdNb3ZlJywgKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpkcmFnTW92ZWAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnRW5kJywgKGV2ZW50LCBwb2ludGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpkcmFnRW5kYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJEb3duJywgKGV2ZW50LCBwb2ludGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpwb2ludGVyRG93bmAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyTW92ZScsKGV2ZW50LCBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06cG9pbnRlck1vdmVgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlclVwJywgKGV2ZW50LCBwb2ludGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpwb2ludGVyVXBgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc3RhdGljQ2xpY2snLCAoZXZlbnQsIHBvaW50ZXIsIGNlbGxFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxJbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06c3RhdGljQ2xpY2tgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQ6IGNlbGxFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICBjZWxsSW5kZXg6IGNlbGxJbmRleCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignbGF6eUxvYWQnLCAoZXZlbnQsIGNlbGxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpsYXp5TG9hZGAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGFuIG9iamVjdCB3aXRoaW4gYW4gYXJyYXkgYnkgSURcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gbWF0Y2hcbiAgICAgKi9cbiAgICBfZmluZE9iamVjdEJ5SWQoc291cmNlLCBpZCkge1xuICAgICAgICByZXR1cm4gc291cmNlLmZpbHRlcigob2JqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0LmlkID09PSBpZDtcbiAgICAgICAgfSlbMF07XG4gICAgfVxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LnNlcnZpY2UuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJGbGlja2l0eVwiXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuRmxpY2tpdHlEaXJlY3RpdmUgPSBGbGlja2l0eURpcmVjdGl2ZTtcblxudmFyIF9mbGlja2l0eSA9IHJlcXVpcmUoJy4vZmxpY2tpdHkuY29udHJvbGxlcicpO1xuXG5mdW5jdGlvbiBGbGlja2l0eURpcmVjdGl2ZSgkdGltZW91dCwgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eTogJ0A/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/J1xuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgICAgICBwb3N0OiBwb3N0TGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfZmxpY2tpdHkuRmxpY2tpdHlDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gSWYgbm8gSUQgd2FzIHBhc3NlZCBpblxuXG4gICAgICAgIGlmICghJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBvbmUgZXhpc3RzXG4gICAgICAgICAgICBpZiAoJGF0dHJzLmlkKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gJGF0dHJzLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9zdCBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcG9zdExpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgYGNyZWF0ZSgpYCBnZXRzIHBpY2tlZCB1cCBpbiB0aGUgbmV4dCBkaWdlc3QgY3ljbGVcblxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgRmxpY2tpdHlcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5jcmVhdGUoJGVsZW1lbnRbMF0sICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIub3B0aW9ucykudGhlbihmdW5jdGlvbiAoZmxpY2tpdHlJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICAgICAgLy8gRXhwb3NlIHRoZSBGbGlja2l0eSBpbnN0YW5jZSBhbmQgSURcbiAgICAgICAgICAgICAgICAkY29udHJvbGxlci5GbGlja2l0eSA9IGZsaWNraXR5SW5zdGFuY2UuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gZmxpY2tpdHlJbnN0YW5jZS5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBXaGVuIHRoZSBkaXJlY3RpdmUgaXMgYmVpbmcgZGVzdHJveWVkXG4gICAgICAgIHZhciBvbkRlc3Ryb3kgPSAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UuZGVzdHJveSgkY29udHJvbGxlci5iY0ZsaWNraXR5SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG59IC8qIGdsb2JhbCBGbGlja2l0eSAqL1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qc1xuICoqLyIsIi8qIGdsb2JhbCBGbGlja2l0eSAqL1xuaW1wb3J0IHsgRmxpY2tpdHlDb250cm9sbGVyIH0gZnJvbSAnLi9mbGlja2l0eS5jb250cm9sbGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIEZsaWNraXR5RGlyZWN0aXZlKFxuICAgICR0aW1lb3V0LFxuICAgIEZsaWNraXR5U2VydmljZVxuKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5OiAnQD8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nLFxuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxuICAgICAgICAgICAgICAgIHBvc3Q6IHBvc3RMaW5rRnVuY3Rpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBGbGlja2l0eUNvbnRyb2xsZXIsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgIGlmICghJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBvbmUgZXhpc3RzXG4gICAgICAgICAgICBpZiAoJGF0dHJzLmlkKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gJGF0dHJzLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3N0IExpbmtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwb3N0TGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBgY3JlYXRlKClgIGdldHMgcGlja2VkIHVwIGluIHRoZSBuZXh0IGRpZ2VzdCBjeWNsZVxuICAgICAgICAkdGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgRmxpY2tpdHlcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5jcmVhdGUoJGVsZW1lbnRbMF0sICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIub3B0aW9ucylcbiAgICAgICAgICAgICAgICAudGhlbigoZmxpY2tpdHlJbnN0YW5jZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEV4cG9zZSB0aGUgRmxpY2tpdHkgaW5zdGFuY2UgYW5kIElEXG4gICAgICAgICAgICAgICAgICAgICRjb250cm9sbGVyLkZsaWNraXR5ID0gZmxpY2tpdHlJbnN0YW5jZS5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gZmxpY2tpdHlJbnN0YW5jZS5pZDtcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgZGlyZWN0aXZlIGlzIGJlaW5nIGRlc3Ryb3llZFxuICAgICAgICBjb25zdCBvbkRlc3Ryb3kgPSAkc2NvcGUuJG9uKCckZGVzdHJveScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UuZGVzdHJveSgkY29udHJvbGxlci5iY0ZsaWNraXR5SWQpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZsaWNraXR5Q29udHJvbGxlciA9IGV4cG9ydHMuRmxpY2tpdHlDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZsaWNraXR5Q29udHJvbGxlcihGbGlja2l0eUNvbmZpZykge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGlja2l0eUNvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMuRmxpY2tpdHlDb25maWcgPSBGbGlja2l0eUNvbmZpZztcblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhGbGlja2l0eUNvbnRyb2xsZXIsIFt7XG4gICAgICAgIGtleTogJ19hY3RpdmF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAvLyBFeHRlbmQgdGhlIGRlZmF1bHQgb3B0aW9ucyB3aXRoIHVzZXIgY29uZmlndXJhdGlvblxuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIHRoaXMuRmxpY2tpdHlDb25maWcsIGFuZ3VsYXIuZnJvbUpzb24odGhpcy5iY0ZsaWNraXR5IHx8IHt9KSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRmxpY2tpdHlDb250cm9sbGVyO1xufSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZsaWNraXR5LmNvbnRyb2xsZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgRmxpY2tpdHlDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBGbGlja2l0eUNvbmZpZ1xuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIHRoaXMuRmxpY2tpdHlDb25maWcgPSBGbGlja2l0eUNvbmZpZztcblxuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG5cbiAgICB9XG5cblxuXG5cbiAgICBfYWN0aXZhdGUoKSB7XG4gICAgICAgIC8vIEV4dGVuZCB0aGUgZGVmYXVsdCBvcHRpb25zIHdpdGggdXNlciBjb25maWd1cmF0aW9uXG4gICAgICAgIHRoaXMub3B0aW9ucyA9XG4gICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCh7fSwgdGhpcy5GbGlja2l0eUNvbmZpZywgYW5ndWxhci5mcm9tSnNvbih0aGlzLmJjRmxpY2tpdHkgfHwge30pKTtcbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9mbGlja2l0eS5jb250cm9sbGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZsaWNraXR5TmV4dERpcmVjdGl2ZSA9IEZsaWNraXR5TmV4dERpcmVjdGl2ZTtcblxudmFyIF9uZXh0ID0gcmVxdWlyZSgnLi9uZXh0LmNvbnRyb2xsZXInKTtcblxuZnVuY3Rpb24gRmxpY2tpdHlOZXh0RGlyZWN0aXZlKCRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eU5leHQ6ICc9PycsXG4gICAgICAgICAgICBiY0ZsaWNraXR5SWQ6ICdAPydcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IF9uZXh0Lk5leHRDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIC8qKlxuICAgICAqIFByZSBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG5cbiAgICAgICAgdmFyIElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIHZhciBzZWxlY3RFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOmNlbGxTZWxlY3QnO1xuICAgICAgICB2YXIgc2V0dGxlRXZlbnQgPSAnRmxpY2tpdHk6JyArICRjb250cm9sbGVyLmZsaWNraXR5SWQgKyAnOnNldHRsZSc7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIHZhciBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLmNlbGxzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2V0dGxlID0gJHJvb3RTY29wZS4kb24oc2V0dGxlRXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLmNlbGxzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UubmV4dCgkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0ludH0gaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgsIGNlbGxDb3VudCkge1xuXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSBjZWxsQ291bnQpIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25leHQvZmxpY2tpdHlOZXh0LmRpcmVjdGl2ZS5qc1xuICoqLyIsImltcG9ydCB7IE5leHRDb250cm9sbGVyIH0gZnJvbSAnLi9uZXh0LmNvbnRyb2xsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gRmxpY2tpdHlOZXh0RGlyZWN0aXZlKFxuICAgICRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLFxuICAgIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2Vcbikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICBjb25zdCBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eU5leHQ6ICc9PycsXG4gICAgICAgICAgICBiY0ZsaWNraXR5SWQ6ICdAPycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBOZXh0Q29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG5cblxuXG4gICAgLyoqXG4gICAgICogUHJlIExpbmtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oXG4gICAgICAgICRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXJcbiAgICApIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG4gICAgICAgIGNvbnN0IElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIGNvbnN0IHNlbGVjdEV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6Y2VsbFNlbGVjdCc7XG4gICAgICAgIGNvbnN0IHNldHRsZUV2ZW50ID0gJ0ZsaWNraXR5OicgKyAkY29udHJvbGxlci5mbGlja2l0eUlkICsgJzpzZXR0bGUnO1xuXG4gICAgICAgIC8vIExpc3RlblxuICAgICAgICBjb25zdCBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLmNlbGxzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2UuY2VsbHMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgY2VsbFxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLm5leHQoJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIud3JhcEFyb3VuZCk7XG5cbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0ludH0gaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgsIGNlbGxDb3VudCkge1xuXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSBjZWxsQ291bnQpIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvbmV4dC9mbGlja2l0eU5leHQuZGlyZWN0aXZlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBOZXh0Q29udHJvbGxlciA9IGV4cG9ydHMuTmV4dENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmV4dENvbnRyb2xsZXIoJGxvZywgJHEsICR0aW1lb3V0LCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5leHRDb250cm9sbGVyKTtcblxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhOZXh0Q29udHJvbGxlciwgW3tcbiAgICAgICAga2V5OiAnX2FjdGl2YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vIEFzc2lnbiBvciBmYWxsIGJhY2sgdG8gZGVmYXVsdFxuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5TmV4dCB8fCB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICAgICAgdGhpcy5fc2V0SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0SWQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kcShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmZsaWNraXR5SWQgPSBfdGhpcy5iY0ZsaWNraXR5SWQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiRsb2cud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBOZXh0Q29udHJvbGxlcjtcbn0oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBOZXh0Q29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgJGxvZywgJHEsICR0aW1lb3V0LFxuICAgICAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlDb25maWcgPSBGbGlja2l0eUNvbmZpZztcbiAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UgPSBGbGlja2l0eVNlcnZpY2U7XG5cblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgX2FjdGl2YXRlKCkge1xuICAgICAgICAvLyBBc3NpZ24gb3IgZmFsbCBiYWNrIHRvIGRlZmF1bHRcbiAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5TmV4dCB8fCB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IG51bGw7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgdGhpcy5fc2V0SWQoKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmxpY2tpdHlJZFxuICAgICAqL1xuICAgIF9zZXRJZCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy4kcSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IHRoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbG9nLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlID0gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZTtcblxudmFyIF9wcmV2aW91cyA9IHJlcXVpcmUoJy4vcHJldmlvdXMuY29udHJvbGxlcicpO1xuXG5mdW5jdGlvbiBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eVByZXZpb3VzOiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfcHJldmlvdXMuUHJldmlvdXNDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIC8qKlxuICAgICAqIFByZSBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG5cbiAgICAgICAgdmFyIElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIHZhciBzZWxlY3RFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOmNlbGxTZWxlY3QnO1xuICAgICAgICB2YXIgc2V0dGxlRXZlbnQgPSAnRmxpY2tpdHk6JyArICRjb250cm9sbGVyLmZsaWNraXR5SWQgKyAnOnNldHRsZSc7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIHZhciBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNldHRsZSA9ICRyb290U2NvcGUuJG9uKHNldHRsZUV2ZW50LCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5wcmV2aW91cygkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0ludH0gaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgpIHtcbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ByZXZpb3VzL2ZsaWNraXR5UHJldmlvdXMuZGlyZWN0aXZlLmpzXG4gKiovIiwiaW1wb3J0IHsgUHJldmlvdXNDb250cm9sbGVyIH0gZnJvbSAnLi9wcmV2aW91cy5jb250cm9sbGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUoXG4gICAgJGxvZywgJHRpbWVvdXQsICRyb290U2NvcGUsXG4gICAgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZVxuKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5UHJldmlvdXM6ICc9PycsXG4gICAgICAgICAgICBiY0ZsaWNraXR5SWQ6ICdAPycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBQcmV2aW91c0NvbnRyb2xsZXIsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuXG4gICAgLyoqXG4gICAgICogUHJlIExpbmtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oXG4gICAgICAgICRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXJcbiAgICApIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG4gICAgICAgIGNvbnN0IElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIGNvbnN0IHNlbGVjdEV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6Y2VsbFNlbGVjdCc7XG4gICAgICAgIGNvbnN0IHNldHRsZUV2ZW50ID0gJ0ZsaWNraXR5OicgKyAkY29udHJvbGxlci5mbGlja2l0eUlkICsgJzpzZXR0bGUnO1xuXG4gICAgICAgIC8vIExpc3RlblxuICAgICAgICBjb25zdCBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc2V0dGxlID0gJHJvb3RTY29wZS4kb24oc2V0dGxlRXZlbnQsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UucHJldmlvdXMoJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIud3JhcEFyb3VuZCk7XG5cbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0ludH0gaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgpIHtcbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9wcmV2aW91cy9mbGlja2l0eVByZXZpb3VzLmRpcmVjdGl2ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgUHJldmlvdXNDb250cm9sbGVyID0gZXhwb3J0cy5QcmV2aW91c0NvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUHJldmlvdXNDb250cm9sbGVyKCRsb2csICRxLCAkdGltZW91dCwgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZSkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQcmV2aW91c0NvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFByZXZpb3VzQ29udHJvbGxlciwgW3tcbiAgICAgICAga2V5OiAnX2FjdGl2YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vIEFzc2lnbiBvciBmYWxsIGJhY2sgdG8gZGVmYXVsdFxuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5UHJldmlvdXMgfHwgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kO1xuICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgICAgIHRoaXMuX3NldElkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfc2V0SWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3NldElkKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHEoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gX3RoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkZsaWNraXR5U2VydmljZS5nZXRGaXJzdCgpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gUHJldmlvdXNDb250cm9sbGVyO1xufSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmNvbnRyb2xsZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgUHJldmlvdXNDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAkbG9nLCAkcSwgJHRpbWVvdXQsXG4gICAgICAgIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcblxuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG5cbiAgICB9XG5cblxuXG5cbiAgICBfYWN0aXZhdGUoKSB7XG4gICAgICAgIC8vIEFzc2lnbiBvciBmYWxsIGJhY2sgdG8gZGVmYXVsdFxuICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cyB8fCB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IG51bGw7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgdGhpcy5fc2V0SWQoKTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmxpY2tpdHlJZFxuICAgICAqL1xuICAgIF9zZXRJZCgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy4kcSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IHRoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbG9nLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5jb250cm9sbGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==