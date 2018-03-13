(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("flickity"));
	else if(typeof define === 'function' && define.amd)
		define("angular-flickity", ["flickity"], factory);
	else if(typeof exports === 'object')
		exports["angular-flickity"] = factory(require("flickity"));
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
	
	var _next = __webpack_require__(5);
	
	var _previous = __webpack_require__(7);
	
	angular.module('bc.Flickity', []).provider('FlickityConfig', _flickity.FlickityConfigProvider).service('FlickityService', _flickity2.FlickityService).directive('bcFlickity', _flickity3.FlickityDirective).directive('bcFlickityNext', _next.FlickityNextDirective).directive('bcFlickityPrevious', _previous.FlickityPreviousDirective);

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
	        this.cellAlign = 'center';
	        this.freeScrollFriction = .075;
	        this.friction = .28;
	        this.percentPosition = true;
	        this.resize = true;
	        this.selectedAttraction = .025;
	        this.setGallerySize = true;
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
	
	                    reject('This ID is already in use.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	
	            return new Promise(function (resolve) {
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('No instances exist.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	                    return reject('Instance ' + id + ' not found.');
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
	            var foundIndex = -1;
	
	            // Verify at least one instance exists
	            if (this.instances.length > 0) {
	
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
/***/ function(module, exports) {

	'use strict';
	
	FlickityDirective.$inject = ["$timeout", "FlickityService", "FlickityConfig"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.FlickityDirective = FlickityDirective;
	/* global flickity */
	
	function FlickityDirective($timeout, FlickityService, FlickityConfig) {
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
	        controller: function controller() {},
	        controllerAs: 'vm'
	    };
	
	    return directive;
	
	    function preLinkFunction($scope, $element, $attrs, $controller) {
	        'ngInject';
	
	        // Get the user's options or start with an empty object
	
	        var userOptions = angular.fromJson($controller.bcFlickity || {});
	        // Combine the user options with the default options
	        $controller.options = angular.extend({}, FlickityConfig, userOptions);
	
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
	}

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
	        var settleEvent = 'Flickity:' + ID + ':settle';
	
	        // Listen
	        var cellSelect = $rootScope.$on(selectEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.slides.length, data.instance.selectedIndex + 1);
	        });
	        var settle = $rootScope.$on(settleEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.slides.length, data.instance.selectedIndex + 1);
	        });
	
	        $element.on('click', function () {
	
	            // Move to the next cell
	            FlickityService.next($controller.flickityId, $controller.wrapAround).then(function (instance) {
	                _disableButtonIfNeeded(instance.instance.selectedIndex);
	            });
	        });
	
	        /**
	         * Disable button if needed
	         *
	         * @param {number} index
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
	            // Assign wrap around or fall back to a default
	            if (typeof this.bcFlickityNext !== 'undefined') {
	                this.wrapAround = this.bcFlickityNext;
	            } else if (typeof this.FlickityConfig.wrapAround !== 'undefined') {
	                this.wrapAround = this.FlickityConfig.wrapAround;
	            } else {
	                this.wrapAround = false;
	            }
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
	
	            return new Promise(function (resolve, reject) {
	                _this.$timeout(function () {
	
	                    if (_this.bcFlickityId) {
	                        _this.flickityId = _this.bcFlickityId;
	                        return resolve(_this.flickityId);
	                    } else {
	                        _this.$timeout(function () {
	                            _this.FlickityService.getFirst().then(function (instance) {
	                                _this.flickityId = instance.id;
	                                return resolve(_this.flickityId);
	                            }).catch(function (error) {
	                                _this.$log.warn(error);
	                                return reject(error);
	                            });
	                        });
	                    }
	                });
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
	        var settleEvent = 'Flickity:' + ID + ':settle';
	
	        // Listen
	        var cellSelect = $rootScope.$on(selectEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.selectedIndex);
	        });
	        var settle = $rootScope.$on(settleEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.selectedIndex);
	        });
	
	        $element.on('click', function () {
	
	            // Move to the next cell
	            FlickityService.previous($controller.flickityId, $controller.wrapAround).then(function (instance) {
	                _disableButtonIfNeeded(instance.instance.selectedIndex);
	            });
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
	            // Assign wrap around or fall back to a default
	            if (typeof this.bcFlickityPrevious !== 'undefined') {
	                this.wrapAround = this.bcFlickityPrevious;
	            } else if (typeof this.FlickityConfig.wrapAround !== 'undefined') {
	                this.wrapAround = this.FlickityConfig.wrapAround;
	            } else {
	                this.wrapAround = false;
	            }
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
	
	            return new Promise(function (resolve, reject) {
	                _this.$timeout(function () {
	
	                    if (_this.bcFlickityId) {
	                        _this.flickityId = _this.bcFlickityId;
	                        return resolve(_this.flickityId);
	                    } else {
	                        _this.$timeout(function () {
	                            _this.FlickityService.getFirst().then(function (instance) {
	                                _this.flickityId = instance.id;
	                                return resolve(_this.flickityId);
	                            }).catch(function (error) {
	                                _this.$log.warn(error);
	                                return reject(error);
	                            });
	                        });
	                    }
	                });
	            });
	        }
	    }]);
	
	    return PreviousController;
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5MzczODEzYWNjZTcwNmViNjA3OCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzPzUyNjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5wcm92aWRlci5qcz9kYTgwIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzP2U0ZTciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJmbGlja2l0eVwiLFwiY29tbW9uanMyXCI6XCJmbGlja2l0eVwiLFwiYW1kXCI6XCJmbGlja2l0eVwiLFwicm9vdFwiOlwiRmxpY2tpdHlcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzP2YxNGIiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHQvbmV4dC5kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHQvbmV4dC5kaXJlY3RpdmUuanM/MDhkNSIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25leHQvbmV4dC5jb250cm9sbGVyLmpzPzA0Y2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlLmpzP2M5NjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmNvbnRyb2xsZXIuanM/ZjJkYSJdLCJuYW1lcyI6WyJhbmd1bGFyIiwibW9kdWxlIiwicHJvdmlkZXIiLCJzZXJ2aWNlIiwiZGlyZWN0aXZlIiwiRmxpY2tpdHlDb25maWdQcm92aWRlciIsImFjY2Vzc2liaWxpdHkiLCJjZWxsQWxpZ24iLCJmcmVlU2Nyb2xsRnJpY3Rpb24iLCJmcmljdGlvbiIsInBlcmNlbnRQb3NpdGlvbiIsInJlc2l6ZSIsInNlbGVjdGVkQXR0cmFjdGlvbiIsInNldEdhbGxlcnlTaXplIiwiJHRpbWVvdXQiLCIkcSIsIiRyb290U2NvcGUiLCIkbG9nIiwiaW5zdGFuY2VzIiwiZWxlbWVudCIsImlkIiwib3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibGVuZ3RoIiwiX2ZpbmRPYmplY3RCeUlkIiwiaW5kZXgiLCJfZ2V0RmxpY2tpdHlJbmRleCIsImVycm9yIiwiaW5zdGFuY2UiLCJwdXNoIiwiX2JpbmRFdmVudHMiLCJ0aGVuIiwiZmxpY2tpdHlJbmRleCIsImRlc3Ryb3kiLCJzcGxpY2UiLCJpc1dyYXBwZWQiLCJpc0luc3RhbnQiLCJuZXh0IiwicHJldmlvdXMiLCJzZWxlY3QiLCJ2YWx1ZSIsInNlbGVjdENlbGwiLCJzZWxlY3RlZEluZGV4IiwicmVwb3NpdGlvbiIsInJlbG9hZENlbGxzIiwiZGF0YSIsImVsZW1lbnRzIiwicHJlcGVuZCIsImFwcGVuZCIsImluc2VydCIsImdldENlbGxFbGVtZW50cyIsInJlbW92ZSIsInNlbGVjdGVkRWxlbWVudCIsImNlbGxzIiwiZm91bmRJbmRleCIsImZvckVhY2giLCJJRCIsIm9uIiwiJGVtaXQiLCJwcm9ncmVzcyIsInBvc2l0aW9uWCIsImV2ZW50IiwicG9pbnRlciIsIm1vdmVWZWN0b3IiLCJjZWxsRWxlbWVudCIsImNlbGxJbmRleCIsInNvdXJjZSIsImZpbHRlciIsIm9iamVjdCIsIkZsaWNraXR5RGlyZWN0aXZlIiwiRmxpY2tpdHlTZXJ2aWNlIiwiRmxpY2tpdHlDb25maWciLCJyZXN0cmljdCIsInNjb3BlIiwiYmluZFRvQ29udHJvbGxlciIsImJjRmxpY2tpdHkiLCJiY0ZsaWNraXR5SWQiLCJjb21waWxlIiwicHJlIiwicHJlTGlua0Z1bmN0aW9uIiwicG9zdCIsInBvc3RMaW5rRnVuY3Rpb24iLCJjb250cm9sbGVyIiwiY29udHJvbGxlckFzIiwiJHNjb3BlIiwiJGVsZW1lbnQiLCIkYXR0cnMiLCIkY29udHJvbGxlciIsInVzZXJPcHRpb25zIiwiZnJvbUpzb24iLCJleHRlbmQiLCJjcmVhdGUiLCJmbGlja2l0eUluc3RhbmNlIiwiRmxpY2tpdHkiLCJvbkRlc3Ryb3kiLCIkb24iLCJGbGlja2l0eU5leHREaXJlY3RpdmUiLCJiY0ZsaWNraXR5TmV4dCIsImZsaWNraXR5SWQiLCJzZWxlY3RFdmVudCIsInNldHRsZUV2ZW50IiwiY2VsbFNlbGVjdCIsIl9kaXNhYmxlQnV0dG9uSWZOZWVkZWQiLCJzbGlkZXMiLCJzZXR0bGUiLCJ3cmFwQXJvdW5kIiwiY2VsbENvdW50IiwiJHNldCIsIl9hY3RpdmF0ZSIsIl9zZXRJZCIsImdldEZpcnN0IiwiY2F0Y2giLCJ3YXJuIiwiRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSIsImJjRmxpY2tpdHlQcmV2aW91cyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQ0FBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUVBQSxTQUFRQyxPQUFPLGVBQWUsSUFDekJDLFNBQVMsa0JBRGQsa0NBRUtDLFFBQVEs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T0FBTyIsImZpbGUiOiJhbmd1bGFyLWZsaWNraXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZmxpY2tpdHlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJhbmd1bGFyLWZsaWNraXR5XCIsIFtcImZsaWNraXR5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFuZ3VsYXItZmxpY2tpdHlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJmbGlja2l0eVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYW5ndWxhci1mbGlja2l0eVwiXSA9IGZhY3Rvcnkocm9vdFtcIkZsaWNraXR5XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5MzczODEzYWNjZTcwNmViNjA3OFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9mbGlja2l0eSA9IHJlcXVpcmUoJy4vZmxpY2tpdHkucHJvdmlkZXInKTtcblxudmFyIF9mbGlja2l0eTIgPSByZXF1aXJlKCcuL2ZsaWNraXR5LnNlcnZpY2UnKTtcblxudmFyIF9mbGlja2l0eTMgPSByZXF1aXJlKCcuL2ZsaWNraXR5LmRpcmVjdGl2ZScpO1xuXG52YXIgX25leHQgPSByZXF1aXJlKCcuL25leHQvbmV4dC5kaXJlY3RpdmUnKTtcblxudmFyIF9wcmV2aW91cyA9IHJlcXVpcmUoJy4vcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdiYy5GbGlja2l0eScsIFtdKS5wcm92aWRlcignRmxpY2tpdHlDb25maWcnLCBfZmxpY2tpdHkuRmxpY2tpdHlDb25maWdQcm92aWRlcikuc2VydmljZSgnRmxpY2tpdHlTZXJ2aWNlJywgX2ZsaWNraXR5Mi5GbGlja2l0eVNlcnZpY2UpLmRpcmVjdGl2ZSgnYmNGbGlja2l0eScsIF9mbGlja2l0eTMuRmxpY2tpdHlEaXJlY3RpdmUpLmRpcmVjdGl2ZSgnYmNGbGlja2l0eU5leHQnLCBfbmV4dC5GbGlja2l0eU5leHREaXJlY3RpdmUpLmRpcmVjdGl2ZSgnYmNGbGlja2l0eVByZXZpb3VzJywgX3ByZXZpb3VzLkZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHsgRmxpY2tpdHlDb25maWdQcm92aWRlciB9IGZyb20gJy4vZmxpY2tpdHkucHJvdmlkZXInXHJcbmltcG9ydCB7IEZsaWNraXR5U2VydmljZSB9IGZyb20gJy4vZmxpY2tpdHkuc2VydmljZSc7XHJcbmltcG9ydCB7IEZsaWNraXR5RGlyZWN0aXZlIH0gZnJvbSAnLi9mbGlja2l0eS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBGbGlja2l0eU5leHREaXJlY3RpdmUgfSBmcm9tICcuL25leHQvbmV4dC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlIH0gZnJvbSAnLi9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ2JjLkZsaWNraXR5JywgW10pXHJcbiAgICAucHJvdmlkZXIoJ0ZsaWNraXR5Q29uZmlnJywgRmxpY2tpdHlDb25maWdQcm92aWRlcilcclxuICAgIC5zZXJ2aWNlKCdGbGlja2l0eVNlcnZpY2UnLCBGbGlja2l0eVNlcnZpY2UpXHJcbiAgICAuZGlyZWN0aXZlKCdiY0ZsaWNraXR5JywgRmxpY2tpdHlEaXJlY3RpdmUpXHJcbiAgICAuZGlyZWN0aXZlKCdiY0ZsaWNraXR5TmV4dCcsIEZsaWNraXR5TmV4dERpcmVjdGl2ZSlcclxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHlQcmV2aW91cycsIEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUpXHJcbjtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L2dpdC9hbmd1bGFyLWZsaWNraXR5L34vZXNsaW50LWxvYWRlciEuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmxpY2tpdHlDb25maWdQcm92aWRlciA9IGV4cG9ydHMuRmxpY2tpdHlDb25maWdQcm92aWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpY2tpdHlDb25maWdQcm92aWRlcik7XG5cbiAgICAgICAgLy8gRGVmaW5lIEZsaWNraXR5IGRlZmF1bHRzXG4gICAgICAgIHRoaXMuYWNjZXNzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2VsbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIHRoaXMuZnJlZVNjcm9sbEZyaWN0aW9uID0gLjA3NTtcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IC4yODtcbiAgICAgICAgdGhpcy5wZXJjZW50UG9zaXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc2l6ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBdHRyYWN0aW9uID0gLjAyNTtcbiAgICAgICAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEZsaWNraXR5Q29uZmlnUHJvdmlkZXIsIFt7XG4gICAgICAgIGtleTogJyRnZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gJGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEZsaWNraXR5Q29uZmlnUHJvdmlkZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkucHJvdmlkZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgRmxpY2tpdHlDb25maWdQcm92aWRlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gRGVmaW5lIEZsaWNraXR5IGRlZmF1bHRzXHJcbiAgICAgICAgdGhpcy5hY2Nlc3NpYmlsaXR5ICAgICAgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2VsbEFsaWduICAgICAgICAgID0gJ2NlbnRlcic7XHJcbiAgICAgICAgdGhpcy5mcmVlU2Nyb2xsRnJpY3Rpb24gPSAuMDc1O1xyXG4gICAgICAgIHRoaXMuZnJpY3Rpb24gICAgICAgICAgID0gLjI4O1xyXG4gICAgICAgIHRoaXMucGVyY2VudFBvc2l0aW9uICAgID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlc2l6ZSAgICAgICAgICAgICA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEF0dHJhY3Rpb24gPSAuMDI1O1xyXG4gICAgICAgIHRoaXMuc2V0R2FsbGVyeVNpemUgICAgID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAkZ2V0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L2dpdC9hbmd1bGFyLWZsaWNraXR5L34vZXNsaW50LWxvYWRlciEuL3NyYy9mbGlja2l0eS5wcm92aWRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eVNlcnZpY2UgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZmxpY2tpdHkgPSByZXF1aXJlKCdmbGlja2l0eScpO1xuXG52YXIgX2ZsaWNraXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsaWNraXR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZsaWNraXR5U2VydmljZSA9IGV4cG9ydHMuRmxpY2tpdHlTZXJ2aWNlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZsaWNraXR5U2VydmljZSgkdGltZW91dCwgJHEsICRyb290U2NvcGUsICRsb2cpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpY2tpdHlTZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcblxuICAgICAgICB0aGlzLmluc3RhbmNlcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKEZsaWNraXR5U2VydmljZSwgW3tcbiAgICAgICAga2V5OiAnY3JlYXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZShlbGVtZW50LCBpZCwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzc2lnbiBhIG5ldyBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBfdGhpcy5pbnN0YW5jZXMubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgSUQgaXMgYWxyZWFkeSBpbiB1c2VcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2ZpbmRPYmplY3RCeUlkKF90aGlzLmluc3RhbmNlcywgaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IF90aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZTogJywgX3RoaXMuaW5zdGFuY2VzW2luZGV4XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERlZmluZSB0aGUgbmV3IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiBuZXcgX2ZsaWNraXR5Mi5kZWZhdWx0KGVsZW1lbnQsIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIFNhdmUgdGhpcyBpbnN0YW5jZSB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRvIGFsbCBldmVudHNcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX2JpbmRFdmVudHMoaWQpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlc3Ryb3kgYSBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkZXN0cm95JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIF90aGlzMi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbnN0YW5jZSBmcm9tIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIF90aGlzMi5pbnN0YW5jZXMuc3BsaWNlKGZsaWNraXR5SW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoJ0luc3RhbmNlICcgKyBpZCArICcgZGVzdHJveWVkLicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gYWxsIGluc3RhbmNlc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGluc3RhbmNlc1xyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRBbGwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWxsKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMzLmluc3RhbmNlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ25leHQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbmV4dChpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM0Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UubmV4dChpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczQuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcmV2aW91cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmV2aW91cyhpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM1Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczUuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnByZXZpb3VzKGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VsZWN0IGEgc2xpZGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXhcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0KGlkLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBpc1dyYXBwZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGlzSW5zdGFudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczYuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHNlbGVjdGVkIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0KGluZGV4LCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlbGVjdCBhIHNsaWRlIG9mIGEgY2VsbFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfFN0cmluZ30gdmFsdWVcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RDZWxsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdENlbGwoaWQsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGlzV3JhcHBlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB2YXIgaXNJbnN0YW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RDZWxsKHZhbHVlLCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczcuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudCBzbGlkZSBpbmRleFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7SW50ZWdlcn0gc2VsZWN0ZWRJbmRleFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RlZEluZGV4JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdGVkSW5kZXgoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM4Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM4Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlc2l6ZSB0aGUgZ2FsbGVyeSBhbmQgcmUtcG9zaXRpb24gY2VsbHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Jlc2l6ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXNpemUoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM5Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSByZXNpemVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM5Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZXNpemUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzOS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9zaXRpb24gY2VsbHMgYXQgc2VsZWN0ZWQgcG9zaXRpb24uXHJcbiAgICAgICAgICogVHJpZ2dlciByZXBvc2l0aW9uIGFmdGVyIHRoZSBzaXplIG9mIGEgY2VsbCBoYXMgYmVlbiBjaGFuZ2VkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZXBvc2l0aW9uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlcG9zaXRpb24oaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczEwID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTAuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVwb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmUtY29sbGVjdCBhbGwgY2VsbCBlbGVtZW50cyBpbiBgZmxpY2tpdHktc2xpZGVyYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVsb2FkQ2VsbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVsb2FkQ2VsbHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczExID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTEuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbG9hZCBjZWxsc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczExLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZWxvYWRDZWxscygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IGEgRmxpY2tpdHkgaW5zdGFuY2UgYnkgSURcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEyLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIGZpcnN0IEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEZpcnN0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpcnN0KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMxMy5pbnN0YW5jZXMgfHwgX3RoaXMxMy5pbnN0YW5jZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdObyBpbnN0YW5jZXMgZXhpc3QuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEzLmluc3RhbmNlc1swXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEJ5RWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRCeUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBfZmxpY2tpdHkyLmRlZmF1bHQuZGF0YShlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSBub3QgZm91bmQgZm9yICcgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBnYWxsZXJ5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcmVwZW5kJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBlbmQoaWQsIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE0Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBQcmVwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBcHBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgZW5kIG9mIHRoZSBnYWxsZXJ5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTUgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuYXBwZW5kKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTUuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluc2VydCBlbGVtZW50cyBpbnRvIHRoZSBnYWxsZXJ5IGFuZCBjcmVhdGUgY2VsbHMgYXQgdGhlIGRlc2lyZWQgaW5kZXguXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gWmVybyBiYXNlZCBpbmRleFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaW5zZXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluc2VydChpZCwgZWxlbWVudHMsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE2Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbnNlcnQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5pbnNlcnQoZWxlbWVudHMsIGluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgZWxlbWVudHMgb2YgdGhlIGNlbGxzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbEVsZW1lbnRzXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldENlbGxFbGVtZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDZWxsRWxlbWVudHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE3ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTcuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYXJyYXkgb2YgY2VsbCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW1vdmUgY2VsbHMgYnkgZWxlbWVudFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RWxlbWVudH0gZWxlbWVudChzKVxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVtb3ZlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE4ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTguX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbW92ZShlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE4Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxsIGVsZW1lbnRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IHNlbGVjdGVkQ2VsbEVsZW1lbnRcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2VsZWN0ZWRFbGVtZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdGVkRWxlbWVudChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTkgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxOS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgYW4gYXJyYXkgb2YgYWxsIGNlbGxzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbHNcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2VsbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2VsbHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIwID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMjAuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYXJyYXkgb2YgY2VsbHNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMyMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuY2VsbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSGVscGVyIG1ldGhvZHNcbiAgICAgICAgLy9cblxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpbmQgdGhlIGluZGV4IGZvciBhIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBmbGlja2l0eUluZGV4XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRGbGlja2l0eUluZGV4JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRGbGlja2l0eUluZGV4KGlkKSB7XG4gICAgICAgICAgICB2YXIgZm91bmRJbmRleCA9IC0xO1xuXG4gICAgICAgICAgICAvLyBWZXJpZnkgYXQgbGVhc3Qgb25lIGluc3RhbmNlIGV4aXN0c1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoZSBJRCBvZiBlYWNoIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UsIGluZGV4KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgbWF0Y2hlcyBvdXIgSUQsIHNldCB0aGUgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmb3VuZEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmluZCBhbGwgZXZlbnRzIGZvciBhIG5ldyBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7Qm9vbH0gaXNGaW5pc2hlZFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfYmluZEV2ZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYmluZEV2ZW50cyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMjEgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyMS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBJRCA9IF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmlkO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNlbGVjdCcsIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZXR0bGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpzZXR0bGUnLCBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKHByb2dyZXNzLCBwb3NpdGlvblgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNjcm9sbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcG9zaXRpb25YXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ1N0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnTW92ZScsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgbW92ZVZlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ01vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnRW5kJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpkcmFnRW5kJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyRG93bicsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlckRvd24nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJNb3ZlJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpwb2ludGVyTW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJVcCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlclVwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzdGF0aWNDbGljaycsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgY2VsbEVsZW1lbnQsIGNlbGxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c3RhdGljQ2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQ6IGNlbGxFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4OiBjZWxsSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignbGF6eUxvYWQnLCBmdW5jdGlvbiAoZXZlbnQsIGNlbGxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpsYXp5TG9hZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaW5kIGFuIG9iamVjdCB3aXRoaW4gYW4gYXJyYXkgYnkgSURcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZVxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gbWF0Y2hcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2ZpbmRPYmplY3RCeUlkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9maW5kT2JqZWN0QnlJZChzb3VyY2UsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmZpbHRlcihmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5pZCA9PT0gaWQ7XG4gICAgICAgICAgICB9KVswXTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGbGlja2l0eVNlcnZpY2U7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkuc2VydmljZS5qc1xuICoqLyIsImltcG9ydCBmbGlja2l0eSBmcm9tICdmbGlja2l0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmxpY2tpdHlTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkdGltZW91dCwgJHEsICRyb290U2NvcGUsICRsb2dcclxuICAgICkge1xyXG4gICAgICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xyXG5cclxuICAgICAgICB0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGUoZWxlbWVudCwgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXHJcbiAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBlbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzc2lnbiBhIG5ldyBJRFxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gdGhpcy5pbnN0YW5jZXMubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBJRCBpcyBhbHJlYWR5IGluIHVzZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZmluZE9iamVjdEJ5SWQodGhpcy5pbnN0YW5jZXMsIGlkKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGxvZy5lcnJvcihgVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZTogYCwgdGhpcy5pbnN0YW5jZXNbaW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWplY3QoYFRoaXMgSUQgaXMgYWxyZWFkeSBpbiB1c2UuYCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERlZmluZSB0aGUgbmV3IGluc3RhbmNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IG5ldyBmbGlja2l0eShlbGVtZW50LCBvcHRpb25zKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhpcyBpbnN0YW5jZSB0byB0aGUgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBCaW5kIHRvIGFsbCBldmVudHNcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRFdmVudHMoaWQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95IGEgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZGVzdHJveShpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGluc3RhbmNlIGZyb20gdGhlIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLnNwbGljZShmbGlja2l0eUluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCdJbnN0YW5jZSAnICsgaWQgKyAnIGRlc3Ryb3llZC4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYWxsIGluc3RhbmNlc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSBpbnN0YW5jZXNcclxuICAgICAqL1xyXG4gICAgZ2V0QWxsKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMuaW5zdGFuY2VzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgbmV4dChpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm5leHQoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJldmlvdXMoaWQsIGlzV3JhcHBlZCwgaXNJbnN0YW50KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJldmlvdXMoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCBhIHNsaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgc2VsZWN0KGlkLCBpbmRleCwgaXNXcmFwcGVkID0gZmFsc2UsIGlzSW5zdGFudCA9IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0KGluZGV4LCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IGEgc2xpZGUgb2YgYSBjZWxsXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ8U3RyaW5nfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdENlbGwoaWQsIHZhbHVlLCBpc1dyYXBwZWQgPSBmYWxzZSwgaXNJbnN0YW50ID0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHNlbGVjdGVkIHNsaWRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RDZWxsKHZhbHVlLCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBzZWxlY3RlZEluZGV4XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdGVkSW5kZXgoaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY3VycmVudCBpbmRleFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgdGhlIGdhbGxlcnkgYW5kIHJlLXBvc2l0aW9uIGNlbGxzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICByZXNpemUoaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlc2l6ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9zaXRpb24gY2VsbHMgYXQgc2VsZWN0ZWQgcG9zaXRpb24uXHJcbiAgICAgKiBUcmlnZ2VyIHJlcG9zaXRpb24gYWZ0ZXIgdGhlIHNpemUgb2YgYSBjZWxsIGhhcyBiZWVuIGNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHJlcG9zaXRpb24oaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlcG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZS1jb2xsZWN0IGFsbCBjZWxsIGVsZW1lbnRzIGluIGBmbGlja2l0eS1zbGlkZXJgLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICByZWxvYWRDZWxscyhpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVsb2FkIGNlbGxzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZWxvYWRDZWxscygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIEZsaWNraXR5IGluc3RhbmNlIGJ5IElEXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldChpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBmaXJzdCBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZ2V0Rmlyc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlcyB8fCB0aGlzLmluc3RhbmNlcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBObyBpbnN0YW5jZXMgZXhpc3QuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldEJ5RWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBmbGlja2l0eS5kYXRhKGVsZW1lbnQpXHJcblxyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlIG5vdCBmb3VuZCBmb3IgJyArIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdhbGxlcnkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJlcGVuZChpZCwgZWxlbWVudHMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFByZXBlbmQgdGhlIHNsaWRlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwZW5kIGVsZW1lbnRzIGFuZCBjcmVhdGUgY2VsbHMgdG8gdGhlIGVuZCBvZiB0aGUgZ2FsbGVyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBhcHBlbmQoaWQsIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHNsaWRlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuYXBwZW5kKGVsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnQgZWxlbWVudHMgaW50byB0aGUgZ2FsbGVyeSBhbmQgY3JlYXRlIGNlbGxzIGF0IHRoZSBkZXNpcmVkIGluZGV4LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XHJcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gWmVybyBiYXNlZCBpbmRleFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBpbnNlcnQoaWQsIGVsZW1lbnRzLCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBzbGlkZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmluc2VydChlbGVtZW50cywgaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZWxlbWVudHMgb2YgdGhlIGNlbGxzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbEVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIGdldENlbGxFbGVtZW50cyhpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgY2VsbHMgYnkgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RWxlbWVudH0gZWxlbWVudChzKVxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICByZW1vdmUoaWQsIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZW1vdmUoZWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGwgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7RWxlbWVudH0gc2VsZWN0ZWRDZWxsRWxlbWVudFxyXG4gICAgICovXHJcbiAgICBzZWxlY3RlZEVsZW1lbnQoaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VsZWN0ZWQgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbiBhcnJheSBvZiBhbGwgY2VsbHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsc1xyXG4gICAgICovXHJcbiAgICBjZWxscyhpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuY2VsbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL1xyXG4gICAgLy8gSGVscGVyIG1ldGhvZHNcclxuICAgIC8vXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCB0aGUgaW5kZXggZm9yIGEgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IGZsaWNraXR5SW5kZXhcclxuICAgICAqL1xyXG4gICAgX2dldEZsaWNraXR5SW5kZXgoaWQpIHtcclxuICAgICAgICBsZXQgZm91bmRJbmRleCA9IC0xO1xyXG5cclxuICAgICAgICAvLyBWZXJpZnkgYXQgbGVhc3Qgb25lIGluc3RhbmNlIGV4aXN0c1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlcy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0aGUgSUQgb2YgZWFjaCBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBtYXRjaGVzIG91ciBJRCwgc2V0IHRoZSBpbmRleFxyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3VuZEluZGV4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJpbmQgYWxsIGV2ZW50cyBmb3IgYSBuZXcgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge0Jvb2x9IGlzRmluaXNoZWRcclxuICAgICAqL1xyXG4gICAgX2JpbmRFdmVudHMoaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgSUQgPSB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZWxlY3QnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnNlbGVjdGAsIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2V0dGxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzZXR0bGVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2Nyb2xsJywgKHByb2dyZXNzLCBwb3NpdGlvblgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06c2Nyb2xsYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHBvc2l0aW9uWCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnU3RhcnQnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06ZHJhZ1N0YXJ0YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdNb3ZlJywgKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmRyYWdNb3ZlYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3I6IG1vdmVWZWN0b3IsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ0VuZCcsIChldmVudCwgcG9pbnRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpkcmFnRW5kYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJEb3duJywgKGV2ZW50LCBwb2ludGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnBvaW50ZXJEb3duYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJNb3ZlJywoZXZlbnQsIHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06cG9pbnRlck1vdmVgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvcixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyVXAnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06cG9pbnRlclVwYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3N0YXRpY0NsaWNrJywgKGV2ZW50LCBwb2ludGVyLCBjZWxsRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzdGF0aWNDbGlja2AsIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4OiBjZWxsSW5kZXgsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignbGF6eUxvYWQnLCAoZXZlbnQsIGNlbGxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmxhenlMb2FkYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCBhbiBvYmplY3Qgd2l0aGluIGFuIGFycmF5IGJ5IElEXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gc291cmNlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gbWF0Y2hcclxuICAgICAqL1xyXG4gICAgX2ZpbmRPYmplY3RCeUlkKHNvdXJjZSwgaWQpIHtcclxuICAgICAgICByZXR1cm4gc291cmNlLmZpbHRlcigob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QuaWQgPT09IGlkO1xyXG4gICAgICAgIH0pWzBdO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovZ2l0L2FuZ3VsYXItZmxpY2tpdHkvfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LnNlcnZpY2UuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImZsaWNraXR5XCIsXCJjb21tb25qczJcIjpcImZsaWNraXR5XCIsXCJhbWRcIjpcImZsaWNraXR5XCIsXCJyb290XCI6XCJGbGlja2l0eVwifVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZsaWNraXR5RGlyZWN0aXZlID0gRmxpY2tpdHlEaXJlY3RpdmU7XG4vKiBnbG9iYWwgZmxpY2tpdHkgKi9cblxuZnVuY3Rpb24gRmxpY2tpdHlEaXJlY3RpdmUoJHRpbWVvdXQsIEZsaWNraXR5U2VydmljZSwgRmxpY2tpdHlDb25maWcpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5OiAnQD8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxuICAgICAgICAgICAgICAgIHBvc3Q6IHBvc3RMaW5rRnVuY3Rpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7fSxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgdXNlcidzIG9wdGlvbnMgb3Igc3RhcnQgd2l0aCBhbiBlbXB0eSBvYmplY3RcblxuICAgICAgICB2YXIgdXNlck9wdGlvbnMgPSBhbmd1bGFyLmZyb21Kc29uKCRjb250cm9sbGVyLmJjRmxpY2tpdHkgfHwge30pO1xuICAgICAgICAvLyBDb21iaW5lIHRoZSB1c2VyIG9wdGlvbnMgd2l0aCB0aGUgZGVmYXVsdCBvcHRpb25zXG4gICAgICAgICRjb250cm9sbGVyLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgRmxpY2tpdHlDb25maWcsIHVzZXJPcHRpb25zKTtcblxuICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgIGlmICghJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBvbmUgZXhpc3RzXG4gICAgICAgICAgICBpZiAoJGF0dHJzLmlkKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gJGF0dHJzLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBQb3N0IExpbmtcclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBvc3RMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGBjcmVhdGUoKWAgZ2V0cyBwaWNrZWQgdXAgaW4gdGhlIG5leHQgZGlnZXN0IGN5Y2xlXG5cbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIEZsaWNraXR5XG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UuY3JlYXRlKCRlbGVtZW50WzBdLCAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQsICRjb250cm9sbGVyLm9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGZsaWNraXR5SW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgICAgIC8vIEV4cG9zZSB0aGUgRmxpY2tpdHkgaW5zdGFuY2UgYW5kIElEXG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuRmxpY2tpdHkgPSBmbGlja2l0eUluc3RhbmNlLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9IGZsaWNraXR5SW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgZGlyZWN0aXZlIGlzIGJlaW5nIGRlc3Ryb3llZFxuICAgICAgICB2YXIgb25EZXN0cm95ID0gJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmRlc3Ryb3koJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qc1xuICoqLyIsIi8qIGdsb2JhbCBmbGlja2l0eSAqL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZsaWNraXR5RGlyZWN0aXZlKFxyXG4gICAgJHRpbWVvdXQsXHJcbiAgICBGbGlja2l0eVNlcnZpY2UsXHJcbiAgICBGbGlja2l0eUNvbmZpZ1xyXG4pIHtcclxuICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcclxuICAgICAgICAgICAgYmNGbGlja2l0eTogJ0A/JyxcclxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXHJcbiAgICAgICAgICAgICAgICBwb3N0OiBwb3N0TGlua0Z1bmN0aW9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge30sXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xyXG4gICAgICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgdXNlcidzIG9wdGlvbnMgb3Igc3RhcnQgd2l0aCBhbiBlbXB0eSBvYmplY3RcclxuICAgICAgICBjb25zdCB1c2VyT3B0aW9ucyA9IGFuZ3VsYXIuZnJvbUpzb24oJGNvbnRyb2xsZXIuYmNGbGlja2l0eSB8fCB7fSk7XHJcbiAgICAgICAgLy8gQ29tYmluZSB0aGUgdXNlciBvcHRpb25zIHdpdGggdGhlIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAgICAgICRjb250cm9sbGVyLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgRmxpY2tpdHlDb25maWcsIHVzZXJPcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gSWYgbm8gSUQgd2FzIHBhc3NlZCBpblxyXG4gICAgICAgIGlmICghJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkKSB7XHJcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZWxlbWVudCdzIElEIGlmIG9uZSBleGlzdHNcclxuICAgICAgICAgICAgaWYgKCRhdHRycy5pZCkge1xyXG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gJGF0dHJzLmlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBvc3QgTGlua1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwb3N0TGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcclxuICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBgY3JlYXRlKClgIGdldHMgcGlja2VkIHVwIGluIHRoZSBuZXh0IGRpZ2VzdCBjeWNsZVxyXG4gICAgICAgICR0aW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgRmxpY2tpdHlcclxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmNyZWF0ZSgkZWxlbWVudFswXSwgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkLCAkY29udHJvbGxlci5vcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGZsaWNraXR5SW5zdGFuY2UpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRXhwb3NlIHRoZSBGbGlja2l0eSBpbnN0YW5jZSBhbmQgSURcclxuICAgICAgICAgICAgICAgICAgICAkY29udHJvbGxlci5GbGlja2l0eSA9IGZsaWNraXR5SW5zdGFuY2UuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gZmxpY2tpdHlJbnN0YW5jZS5pZDtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBXaGVuIHRoZSBkaXJlY3RpdmUgaXMgYmVpbmcgZGVzdHJveWVkXHJcbiAgICAgICAgY29uc3Qgb25EZXN0cm95ID0gJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5kZXN0cm95KCRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovZ2l0L2FuZ3VsYXItZmxpY2tpdHkvfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eU5leHREaXJlY3RpdmUgPSBGbGlja2l0eU5leHREaXJlY3RpdmU7XG5cbnZhciBfbmV4dCA9IHJlcXVpcmUoJy4vbmV4dC5jb250cm9sbGVyJyk7XG5cbmZ1bmN0aW9uIEZsaWNraXR5TmV4dERpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSwgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZSkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHlOZXh0OiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfbmV4dC5OZXh0Q29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAvKipcclxuICAgICAqIFByZSBMaW5rXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcblxuICAgICAgICB2YXIgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgdmFyIHNlbGVjdEV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6Y2VsbFNlbGVjdCc7XG4gICAgICAgIHZhciBzZXR0bGVFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOnNldHRsZSc7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIHZhciBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNsaWRlcy5sZW5ndGgsIGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCArIDEpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHNldHRsZSA9ICRyb290U2NvcGUuJG9uKHNldHRsZUV2ZW50LCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zbGlkZXMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5uZXh0KCRjb250cm9sbGVyLmZsaWNraXR5SWQsICRjb250cm9sbGVyLndyYXBBcm91bmQpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluZGV4LCBjZWxsQ291bnQpIHtcblxuICAgICAgICAgICAgLy8gRGlzYWJsZSBidXR0b24gaWYgYXQgdGhlIGJlZ2lubmluZyBhbmQgd2Ugc2hvdWxkbid0IHdyYXBcbiAgICAgICAgICAgIGlmICghJGNvbnRyb2xsZXIud3JhcEFyb3VuZCAmJiBpbmRleCA9PT0gY2VsbENvdW50KSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9uZXh0L25leHQuZGlyZWN0aXZlLmpzXG4gKiovIiwiaW1wb3J0IHsgTmV4dENvbnRyb2xsZXIgfSBmcm9tICcuL25leHQuY29udHJvbGxlcic7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRmxpY2tpdHlOZXh0RGlyZWN0aXZlKFxyXG4gICAgJGxvZywgJHRpbWVvdXQsICRyb290U2NvcGUsXHJcbiAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXHJcbikge1xyXG4gICAgJ25nSW5qZWN0JztcclxuXHJcbiAgICBjb25zdCBkaXJlY3RpdmUgPSB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xyXG4gICAgICAgICAgICBiY0ZsaWNraXR5TmV4dDogJz0/JyxcclxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiBOZXh0Q29udHJvbGxlcixcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBkaXJlY3RpdmU7XHJcblxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmUgTGlua1xyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oXHJcbiAgICAgICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlclxyXG4gICAgKSB7XHJcbiAgICAgICAgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBJRFxyXG4gICAgICAgIGNvbnN0IElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcclxuXHJcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBicm9hZGNhc3QgbmFtZXMgdG8gbGlzdGVuIGZvclxyXG4gICAgICAgIGNvbnN0IHNlbGVjdEV2ZW50ID0gYEZsaWNraXR5OiR7SUR9OmNlbGxTZWxlY3RgO1xyXG4gICAgICAgIGNvbnN0IHNldHRsZUV2ZW50ID0gYEZsaWNraXR5OiR7SUR9OnNldHRsZWA7XHJcblxyXG4gICAgICAgIC8vIExpc3RlblxyXG4gICAgICAgIGNvbnN0IGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zbGlkZXMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zbGlkZXMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgY2VsbFxyXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UubmV4dCgkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGluc3RhbmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCwgY2VsbENvdW50KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxyXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IGNlbGxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovZ2l0L2FuZ3VsYXItZmxpY2tpdHkvfi9lc2xpbnQtbG9hZGVyIS4vc3JjL25leHQvbmV4dC5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE5leHRDb250cm9sbGVyID0gZXhwb3J0cy5OZXh0Q29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOZXh0Q29udHJvbGxlcigkbG9nLCAkcSwgJHRpbWVvdXQsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTmV4dENvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKE5leHRDb250cm9sbGVyLCBbe1xuICAgICAgICBrZXk6ICdfYWN0aXZhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2FjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy8gQXNzaWduIHdyYXAgYXJvdW5kIG9yIGZhbGwgYmFjayB0byBhIGRlZmF1bHRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5iY0ZsaWNraXR5TmV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlOZXh0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICAgICAgdGhpcy5fc2V0SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCBJRCB0byB3aGF0IGlzIGRlZmluZWQsIGZhbGxiYWNrIHRvIGZpcnN0IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX3NldElkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRJZCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChfdGhpcy5iY0ZsaWNraXR5SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZsaWNraXR5SWQgPSBfdGhpcy5iY0ZsaWNraXR5SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5GbGlja2l0eVNlcnZpY2UuZ2V0Rmlyc3QoKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBOZXh0Q29udHJvbGxlcjtcbn0oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qc1xuICoqLyIsImV4cG9ydCBjbGFzcyBOZXh0Q29udHJvbGxlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJGxvZywgJHEsICR0aW1lb3V0LFxyXG4gICAgICAgIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XHJcbiAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UgPSBGbGlja2l0eVNlcnZpY2U7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBfYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgLy8gQXNzaWduIHdyYXAgYXJvdW5kIG9yIGZhbGwgYmFjayB0byBhIGRlZmF1bHRcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYmNGbGlja2l0eU5leHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuYmNGbGlja2l0eU5leHQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGFuIElEXHJcbiAgICAgICAgdGhpcy5fc2V0SWQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmxpY2tpdHlJZFxyXG4gICAgICovXHJcbiAgICBfc2V0SWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmNGbGlja2l0eUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gdGhpcy5iY0ZsaWNraXR5SWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZmxpY2tpdHlJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGxvZy53YXJuKGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEM6L2dpdC9hbmd1bGFyLWZsaWNraXR5L34vZXNsaW50LWxvYWRlciEuL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlID0gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZTtcblxudmFyIF9wcmV2aW91cyA9IHJlcXVpcmUoJy4vcHJldmlvdXMuY29udHJvbGxlcicpO1xuXG5mdW5jdGlvbiBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eVByZXZpb3VzOiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfcHJldmlvdXMuUHJldmlvdXNDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIC8qKlxyXG4gICAgICogUHJlIExpbmtcclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBJRFxuXG4gICAgICAgIHZhciBJRCA9ICRjb250cm9sbGVyLmZsaWNraXR5SWQ7XG5cbiAgICAgICAgLy8gRGVmaW5lIHRoZSBicm9hZGNhc3QgbmFtZXMgdG8gbGlzdGVuIGZvclxuICAgICAgICB2YXIgc2VsZWN0RXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpjZWxsU2VsZWN0JztcbiAgICAgICAgdmFyIHNldHRsZUV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6c2V0dGxlJztcblxuICAgICAgICAvLyBMaXN0ZW5cbiAgICAgICAgdmFyIGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2V0dGxlID0gJHJvb3RTY29wZS4kb24oc2V0dGxlRXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgY2VsbFxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLnByZXZpb3VzKCRjb250cm9sbGVyLmZsaWNraXR5SWQsICRjb250cm9sbGVyLndyYXBBcm91bmQpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluZGV4KSB7XG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanNcbiAqKi8iLCJpbXBvcnQgeyBQcmV2aW91c0NvbnRyb2xsZXIgfSBmcm9tICcuL3ByZXZpb3VzLmNvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUoXHJcbiAgICAkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSxcclxuICAgIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2VcclxuKSB7XHJcbiAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHlQcmV2aW91czogJz0/JyxcclxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiBQcmV2aW91c0NvbnRyb2xsZXIsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZSBMaW5rXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbihcclxuICAgICAgICAkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyXHJcbiAgICApIHtcclxuICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIElEXHJcbiAgICAgICAgY29uc3QgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xyXG5cclxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0RXZlbnQgPSBgRmxpY2tpdHk6JHtJRH06Y2VsbFNlbGVjdGA7XHJcbiAgICAgICAgY29uc3Qgc2V0dGxlRXZlbnQgPSBgRmxpY2tpdHk6JHtJRH06c2V0dGxlYDtcclxuXHJcbiAgICAgICAgLy8gTGlzdGVuXHJcbiAgICAgICAgY29uc3QgY2VsbFNlbGVjdCA9ICRyb290U2NvcGUuJG9uKHNlbGVjdEV2ZW50LCAoZXZlbnQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHNldHRsZSA9ICRyb290U2NvcGUuJG9uKHNldHRsZUV2ZW50LCAoZXZlbnQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXHJcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5wcmV2aW91cygkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGluc3RhbmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCkge1xyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxyXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBDOi9naXQvYW5ndWxhci1mbGlja2l0eS9+L2VzbGludC1sb2FkZXIhLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBQcmV2aW91c0NvbnRyb2xsZXIgPSBleHBvcnRzLlByZXZpb3VzQ29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQcmV2aW91c0NvbnRyb2xsZXIoJGxvZywgJHEsICR0aW1lb3V0LCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFByZXZpb3VzQ29udHJvbGxlcik7XG5cbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlDb25maWcgPSBGbGlja2l0eUNvbmZpZztcbiAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UgPSBGbGlja2l0eVNlcnZpY2U7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUHJldmlvdXNDb250cm9sbGVyLCBbe1xuICAgICAgICBrZXk6ICdfYWN0aXZhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2FjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy8gQXNzaWduIHdyYXAgYXJvdW5kIG9yIGZhbGwgYmFjayB0byBhIGRlZmF1bHRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5iY0ZsaWNraXR5UHJldmlvdXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5UHJldmlvdXM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IG51bGw7XG5cbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIGFuIElEXG4gICAgICAgICAgICB0aGlzLl9zZXRJZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmxpY2tpdHlJZFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfc2V0SWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3NldElkKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IF90aGlzLmJjRmxpY2tpdHlJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkZsaWNraXR5U2VydmljZS5nZXRGaXJzdCgpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiRsb2cud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFByZXZpb3VzQ29udHJvbGxlcjtcbn0oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5jb250cm9sbGVyLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIFByZXZpb3VzQ29udHJvbGxlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJGxvZywgJHEsICR0aW1lb3V0LFxyXG4gICAgICAgIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XHJcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XHJcbiAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UgPSBGbGlja2l0eVNlcnZpY2U7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICBfYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgLy8gQXNzaWduIHdyYXAgYXJvdW5kIG9yIGZhbGwgYmFjayB0byBhIGRlZmF1bHRcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYmNGbGlja2l0eVByZXZpb3VzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cztcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcclxuICAgICAgICB0aGlzLl9zZXRJZCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBJRCB0byB3aGF0IGlzIGRlZmluZWQsIGZhbGxiYWNrIHRvIGZpcnN0IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXHJcbiAgICAgKi9cclxuICAgIF9zZXRJZCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iY0ZsaWNraXR5SWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSB0aGlzLmJjRmxpY2tpdHlJZDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UuZ2V0Rmlyc3QoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGluc3RhbmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbG9nLndhcm4oZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQzovZ2l0L2FuZ3VsYXItZmxpY2tpdHkvfi9lc2xpbnQtbG9hZGVyIS4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmNvbnRyb2xsZXIuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9