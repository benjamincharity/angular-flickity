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
	/* global Flickity */
	
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
	            _disableButtonIfNeeded(data.instance.cells.length, data.instance.selectedIndex + 1);
	        });
	        var settle = $rootScope.$on(settleEvent, function (event, data) {
	            _disableButtonIfNeeded(data.instance.cells.length, data.instance.selectedIndex + 1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyNGFhZTZjMGU0NWI0ZmQwN2ZlOCIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzPzFmMzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5wcm92aWRlci5qcz8wMWY1Iiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzP2FkYTUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiRmxpY2tpdHlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanM/ZjYyNCIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qcz82NWFhIiwid2VicGFjazovLy8uL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanM/MDE5ZSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanM/ZDI0NSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qcz9iOGY5Il0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJwcm92aWRlciIsInNlcnZpY2UiLCJkaXJlY3RpdmUiLCJGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyIiwiYWNjZXNzaWJpbGl0eSIsImNlbGxBbGlnbiIsImZyZWVTY3JvbGxGcmljdGlvbiIsImZyaWN0aW9uIiwicGVyY2VudFBvc2l0aW9uIiwicmVzaXplIiwic2VsZWN0ZWRBdHRyYWN0aW9uIiwic2V0R2FsbGVyeVNpemUiLCIkdGltZW91dCIsIiRxIiwiJHJvb3RTY29wZSIsIiRsb2ciLCJpbnN0YW5jZXMiLCJlbGVtZW50IiwiaWQiLCJvcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsZW5ndGgiLCJfZmluZE9iamVjdEJ5SWQiLCJpbmRleCIsIl9nZXRGbGlja2l0eUluZGV4IiwiZXJyb3IiLCJpbnN0YW5jZSIsInB1c2giLCJfYmluZEV2ZW50cyIsInRoZW4iLCJmbGlja2l0eUluZGV4IiwiZGVzdHJveSIsInNwbGljZSIsImlzV3JhcHBlZCIsImlzSW5zdGFudCIsIm5leHQiLCJwcmV2aW91cyIsInNlbGVjdCIsInZhbHVlIiwic2VsZWN0Q2VsbCIsInNlbGVjdGVkSW5kZXgiLCJyZXBvc2l0aW9uIiwicmVsb2FkQ2VsbHMiLCJkYXRhIiwiZWxlbWVudHMiLCJwcmVwZW5kIiwiYXBwZW5kIiwiaW5zZXJ0IiwiZ2V0Q2VsbEVsZW1lbnRzIiwicmVtb3ZlIiwic2VsZWN0ZWRFbGVtZW50IiwiY2VsbHMiLCJmb3VuZEluZGV4IiwiZm9yRWFjaCIsIklEIiwib24iLCIkZW1pdCIsInByb2dyZXNzIiwicG9zaXRpb25YIiwiZXZlbnQiLCJwb2ludGVyIiwibW92ZVZlY3RvciIsImNlbGxFbGVtZW50IiwiY2VsbEluZGV4Iiwic291cmNlIiwiZmlsdGVyIiwib2JqZWN0IiwiRmxpY2tpdHlEaXJlY3RpdmUiLCJGbGlja2l0eVNlcnZpY2UiLCJGbGlja2l0eUNvbmZpZyIsInJlc3RyaWN0Iiwic2NvcGUiLCJiaW5kVG9Db250cm9sbGVyIiwiYmNGbGlja2l0eSIsImJjRmxpY2tpdHlJZCIsImNvbXBpbGUiLCJwcmUiLCJwcmVMaW5rRnVuY3Rpb24iLCJwb3N0IiwicG9zdExpbmtGdW5jdGlvbiIsImNvbnRyb2xsZXIiLCJjb250cm9sbGVyQXMiLCIkc2NvcGUiLCIkZWxlbWVudCIsIiRhdHRycyIsIiRjb250cm9sbGVyIiwidXNlck9wdGlvbnMiLCJmcm9tSnNvbiIsImV4dGVuZCIsImNyZWF0ZSIsImZsaWNraXR5SW5zdGFuY2UiLCJGbGlja2l0eSIsIm9uRGVzdHJveSIsIiRvbiIsIkZsaWNraXR5TmV4dERpcmVjdGl2ZSIsImJjRmxpY2tpdHlOZXh0IiwiZmxpY2tpdHlJZCIsInNlbGVjdEV2ZW50Iiwic2V0dGxlRXZlbnQiLCJjZWxsU2VsZWN0IiwiX2Rpc2FibGVCdXR0b25JZk5lZWRlZCIsInNldHRsZSIsIndyYXBBcm91bmQiLCJjZWxsQ291bnQiLCIkc2V0IiwiX2FjdGl2YXRlIiwiX3NldElkIiwiZ2V0Rmlyc3QiLCJjYXRjaCIsIndhcm4iLCJGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlIiwiYmNGbGlja2l0eVByZXZpb3VzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUFBLFNBQVFDLE9BQU8sZUFBZSxJQUN6QkMsU0FBUyxrQkFEZCxrQ0FFS0MsUUFBUSxtQkFGYiw0QkFHS0MsVUFBVSxjQUhmLDhCQUlLQSxVQUFVLGtCQUpmLDZCQUtLQSxVQUFVLHNCQUxmLHFDOzs7Ozs7QUNOQTs7QUFFQSxRQUFPLGVBQWUsU0FBUyxj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RCw0QkFDSTNGLE1BQU1GLElBQUlELFVBQ1YyRCxnQkFBZ0JELGlCQUNsQjtTQUNFOztTQURGOztTQUdFLEtBQUt2RCxPQUFPQTtTQUNaLEtBQUtGLEtBQUtBO1NBQ1YsS0FBS0QsV0FBV0E7U0FDaEIsS0FBSzJELGlCQUFpQkE7U0FDdEIsS0FBS0Qsa0JBQWtCQTs7U0FHdkIsS0FBS3FDOzs7S0RVVCxhQUFhLG9CQUFvQixDQUFDO1NBQzlCLEtBQUs7U0FDTCxPQUFPLFNBQVMsWUNMUjs7YUFFUixJQUFJLE9BQU8sS0FBS00sdUJBQXVCLGFBQWE7aUJBQ2hELEtBQUtULGFBQWEsS0FBS1M7b0JBQ3BCLElBQUksT0FBTyxLQUFLMUMsZUFBZWlDLGVBQWUsYUFBYTtpQkFDOUQsS0FBS0EsYUFBYSxLQUFLakMsZUFBZWlDO29CQUNuQztpQkFDSCxLQUFLQSxhQUFhOzthQUV0QixLQUFLTixhQUFhOzs7YUFHbEIsS0FBS1U7Ozs7Ozs7OztRRGNOO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxTQ1BYO2FBQUE7O2FBQ0wsT0FBTyxJQUFJeEYsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxNQUFLVixTQUFTLFlBQU07O3FCQUVoQixJQUFJLE1BQUtnRSxjQUFjO3lCQUNuQixNQUFLc0IsYUFBYSxNQUFLdEI7eUJBQ3ZCLE9BQU92RCxRQUFRLE1BQUs2RTs0QkFDakI7eUJBQ0gsTUFBS3RGLFNBQVMsWUFBTTs2QkFDaEIsTUFBSzBELGdCQUFnQnVDLFdBQ2hCOUUsS0FBSyxVQUFDSCxVQUFhO2lDQUNoQixNQUFLc0UsYUFBYXRFLFNBQVNWO2lDQUMzQixPQUFPRyxRQUFRLE1BQUs2RTtnQ0FFdkJZLE1BQU0sVUFBQ25GLE9BQVU7aUNBQ2QsTUFBS1osS0FBS2dHLEtBQUtwRjtpQ0FDZixPQUFPTCxPQUFPSzs7Ozs7Ozs7O0tEZ0IxQyxPQUFPIiwiZmlsZSI6ImFuZ3VsYXItZmxpY2tpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJGbGlja2l0eVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImFuZ3VsYXItZmxpY2tpdHlcIiwgW1wiRmxpY2tpdHlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5ndWxhci1mbGlja2l0eVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIkZsaWNraXR5XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhbmd1bGFyLWZsaWNraXR5XCJdID0gZmFjdG9yeShyb290W1wiRmxpY2tpdHlcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDI0YWFlNmMwZTQ1YjRmZDA3ZmU4XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ZsaWNraXR5ID0gcmVxdWlyZSgnLi9mbGlja2l0eS5wcm92aWRlcicpO1xuXG52YXIgX2ZsaWNraXR5MiA9IHJlcXVpcmUoJy4vZmxpY2tpdHkuc2VydmljZScpO1xuXG52YXIgX2ZsaWNraXR5MyA9IHJlcXVpcmUoJy4vZmxpY2tpdHkuZGlyZWN0aXZlJyk7XG5cbnZhciBfbmV4dCA9IHJlcXVpcmUoJy4vbmV4dC9uZXh0LmRpcmVjdGl2ZScpO1xuXG52YXIgX3ByZXZpb3VzID0gcmVxdWlyZSgnLi9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUnKTtcblxuYW5ndWxhci5tb2R1bGUoJ2JjLkZsaWNraXR5JywgW10pLnByb3ZpZGVyKCdGbGlja2l0eUNvbmZpZycsIF9mbGlja2l0eS5GbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKS5zZXJ2aWNlKCdGbGlja2l0eVNlcnZpY2UnLCBfZmxpY2tpdHkyLkZsaWNraXR5U2VydmljZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5JywgX2ZsaWNraXR5My5GbGlja2l0eURpcmVjdGl2ZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5TmV4dCcsIF9uZXh0LkZsaWNraXR5TmV4dERpcmVjdGl2ZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5UHJldmlvdXMnLCBfcHJldmlvdXMuRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgeyBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyIH0gZnJvbSAnLi9mbGlja2l0eS5wcm92aWRlcidcclxuaW1wb3J0IHsgRmxpY2tpdHlTZXJ2aWNlIH0gZnJvbSAnLi9mbGlja2l0eS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRmxpY2tpdHlEaXJlY3RpdmUgfSBmcm9tICcuL2ZsaWNraXR5LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsaWNraXR5TmV4dERpcmVjdGl2ZSB9IGZyb20gJy4vbmV4dC9uZXh0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUgfSBmcm9tICcuL3ByZXZpb3VzL3ByZXZpb3VzLmRpcmVjdGl2ZSc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnYmMuRmxpY2tpdHknLCBbXSlcclxuICAgIC5wcm92aWRlcignRmxpY2tpdHlDb25maWcnLCBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKVxyXG4gICAgLnNlcnZpY2UoJ0ZsaWNraXR5U2VydmljZScsIEZsaWNraXR5U2VydmljZSlcclxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHknLCBGbGlja2l0eURpcmVjdGl2ZSlcclxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHlOZXh0JywgRmxpY2tpdHlOZXh0RGlyZWN0aXZlKVxyXG4gICAgLmRpcmVjdGl2ZSgnYmNGbGlja2l0eVByZXZpb3VzJywgRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSlcclxuO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIgPSBleHBvcnRzLkZsaWNraXR5Q29uZmlnUHJvdmlkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmxpY2tpdHlDb25maWdQcm92aWRlcigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIpO1xuXG4gICAgICAgIC8vIERlZmluZSBGbGlja2l0eSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmFjY2Vzc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmNlbGxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICB0aGlzLmZyZWVTY3JvbGxGcmljdGlvbiA9IC4wNzU7XG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSAuMjg7XG4gICAgICAgIHRoaXMucGVyY2VudFBvc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNpemUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQXR0cmFjdGlvbiA9IC4wMjU7XG4gICAgICAgIHRoaXMuc2V0R2FsbGVyeVNpemUgPSB0cnVlO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyLCBbe1xuICAgICAgICBrZXk6ICckZ2V0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICRnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyO1xufSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8vIERlZmluZSBGbGlja2l0eSBkZWZhdWx0c1xyXG4gICAgICAgIHRoaXMuYWNjZXNzaWJpbGl0eSAgICAgID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNlbGxBbGlnbiAgICAgICAgICA9ICdjZW50ZXInO1xyXG4gICAgICAgIHRoaXMuZnJlZVNjcm9sbEZyaWN0aW9uID0gLjA3NTtcclxuICAgICAgICB0aGlzLmZyaWN0aW9uICAgICAgICAgICA9IC4yODtcclxuICAgICAgICB0aGlzLnBlcmNlbnRQb3NpdGlvbiAgICA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZXNpemUgICAgICAgICAgICAgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBdHRyYWN0aW9uID0gLjAyNTtcclxuICAgICAgICB0aGlzLnNldEdhbGxlcnlTaXplICAgICA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgJGdldCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9mbGlja2l0eS5wcm92aWRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eVNlcnZpY2UgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZmxpY2tpdHkgPSByZXF1aXJlKCdmbGlja2l0eScpO1xuXG52YXIgX2ZsaWNraXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsaWNraXR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZsaWNraXR5U2VydmljZSA9IGV4cG9ydHMuRmxpY2tpdHlTZXJ2aWNlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZsaWNraXR5U2VydmljZSgkdGltZW91dCwgJHEsICRyb290U2NvcGUsICRsb2cpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpY2tpdHlTZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcblxuICAgICAgICB0aGlzLmluc3RhbmNlcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbmV3IEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKEZsaWNraXR5U2VydmljZSwgW3tcbiAgICAgICAga2V5OiAnY3JlYXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZShlbGVtZW50LCBpZCwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzc2lnbiBhIG5ldyBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBfdGhpcy5pbnN0YW5jZXMubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgSUQgaXMgYWxyZWFkeSBpbiB1c2VcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2ZpbmRPYmplY3RCeUlkKF90aGlzLmluc3RhbmNlcywgaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IF90aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZTogJywgX3RoaXMuaW5zdGFuY2VzW2luZGV4XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERlZmluZSB0aGUgbmV3IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiBuZXcgX2ZsaWNraXR5Mi5kZWZhdWx0KGVsZW1lbnQsIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIFNhdmUgdGhpcyBpbnN0YW5jZSB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRvIGFsbCBldmVudHNcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX2JpbmRFdmVudHMoaWQpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlc3Ryb3kgYSBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkZXN0cm95JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIF90aGlzMi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbnN0YW5jZSBmcm9tIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIF90aGlzMi5pbnN0YW5jZXMuc3BsaWNlKGZsaWNraXR5SW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoJ0luc3RhbmNlICcgKyBpZCArICcgZGVzdHJveWVkLicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gYWxsIGluc3RhbmNlc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGluc3RhbmNlc1xyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRBbGwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWxsKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMzLmluc3RhbmNlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ25leHQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbmV4dChpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM0Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UubmV4dChpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczQuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcmV2aW91cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmV2aW91cyhpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM1Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczUuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnByZXZpb3VzKGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VsZWN0IGEgc2xpZGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXhcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3QnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0KGlkLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBpc1dyYXBwZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGlzSW5zdGFudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczYuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHNlbGVjdGVkIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0KGluZGV4LCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlbGVjdCBhIHNsaWRlIG9mIGEgY2VsbFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfFN0cmluZ30gdmFsdWVcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RDZWxsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdENlbGwoaWQsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGlzV3JhcHBlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB2YXIgaXNJbnN0YW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RDZWxsKHZhbHVlLCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczcuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudCBzbGlkZSBpbmRleFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7SW50ZWdlcn0gc2VsZWN0ZWRJbmRleFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RlZEluZGV4JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdGVkSW5kZXgoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM4Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM4Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlc2l6ZSB0aGUgZ2FsbGVyeSBhbmQgcmUtcG9zaXRpb24gY2VsbHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Jlc2l6ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXNpemUoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM5Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSByZXNpemVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM5Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZXNpemUoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzOS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9zaXRpb24gY2VsbHMgYXQgc2VsZWN0ZWQgcG9zaXRpb24uXHJcbiAgICAgICAgICogVHJpZ2dlciByZXBvc2l0aW9uIGFmdGVyIHRoZSBzaXplIG9mIGEgY2VsbCBoYXMgYmVlbiBjaGFuZ2VkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZXBvc2l0aW9uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlcG9zaXRpb24oaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczEwID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTAuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVwb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmUtY29sbGVjdCBhbGwgY2VsbCBlbGVtZW50cyBpbiBgZmxpY2tpdHktc2xpZGVyYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVsb2FkQ2VsbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVsb2FkQ2VsbHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczExID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTEuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbG9hZCBjZWxsc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczExLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZWxvYWRDZWxscygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IGEgRmxpY2tpdHkgaW5zdGFuY2UgYnkgSURcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEyLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIGZpcnN0IEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEZpcnN0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpcnN0KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMxMy5pbnN0YW5jZXMgfHwgX3RoaXMxMy5pbnN0YW5jZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdObyBpbnN0YW5jZXMgZXhpc3QuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEzLmluc3RhbmNlc1swXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEJ5RWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRCeUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBfZmxpY2tpdHkyLmRlZmF1bHQuZGF0YShlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSBub3QgZm91bmQgZm9yICcgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBnYWxsZXJ5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcmVwZW5kJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBlbmQoaWQsIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE0Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBQcmVwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBcHBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgZW5kIG9mIHRoZSBnYWxsZXJ5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTUgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuYXBwZW5kKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTUuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluc2VydCBlbGVtZW50cyBpbnRvIHRoZSBnYWxsZXJ5IGFuZCBjcmVhdGUgY2VsbHMgYXQgdGhlIGRlc2lyZWQgaW5kZXguXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcclxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gWmVybyBiYXNlZCBpbmRleFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaW5zZXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluc2VydChpZCwgZWxlbWVudHMsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE2Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbnNlcnQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5pbnNlcnQoZWxlbWVudHMsIGluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldCB0aGUgZWxlbWVudHMgb2YgdGhlIGNlbGxzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbEVsZW1lbnRzXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldENlbGxFbGVtZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDZWxsRWxlbWVudHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE3ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTcuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYXJyYXkgb2YgY2VsbCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW1vdmUgY2VsbHMgYnkgZWxlbWVudFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RWxlbWVudH0gZWxlbWVudChzKVxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVtb3ZlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE4ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTguX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbW92ZShlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE4Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxsIGVsZW1lbnRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IHNlbGVjdGVkQ2VsbEVsZW1lbnRcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2VsZWN0ZWRFbGVtZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdGVkRWxlbWVudChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTkgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxOS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBzZWxlY3RlZCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgYW4gYXJyYXkgb2YgYWxsIGNlbGxzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbHNcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2VsbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2VsbHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIwID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMjAuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYXJyYXkgb2YgY2VsbHNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMyMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuY2VsbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSGVscGVyIG1ldGhvZHNcbiAgICAgICAgLy9cblxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZpbmQgdGhlIGluZGV4IGZvciBhIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBmbGlja2l0eUluZGV4XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRGbGlja2l0eUluZGV4JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRGbGlja2l0eUluZGV4KGlkKSB7XG4gICAgICAgICAgICB2YXIgZm91bmRJbmRleCA9IC0xO1xuXG4gICAgICAgICAgICAvLyBWZXJpZnkgYXQgbGVhc3Qgb25lIGluc3RhbmNlIGV4aXN0c1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoZSBJRCBvZiBlYWNoIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UsIGluZGV4KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgbWF0Y2hlcyBvdXIgSUQsIHNldCB0aGUgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmb3VuZEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmluZCBhbGwgZXZlbnRzIGZvciBhIG5ldyBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgICAgICogQHJldHVybiB7Qm9vbH0gaXNGaW5pc2hlZFxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfYmluZEV2ZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYmluZEV2ZW50cyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMjEgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyMS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBJRCA9IF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmlkO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NlbGVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNlbGVjdCcsIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZXR0bGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpzZXR0bGUnLCBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2Nyb2xsJywgZnVuY3Rpb24gKHByb2dyZXNzLCBwb3NpdGlvblgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNjcm9sbCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcG9zaXRpb25YXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ1N0YXJ0Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnTW92ZScsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgbW92ZVZlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ01vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnRW5kJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpkcmFnRW5kJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyRG93bicsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlckRvd24nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJNb3ZlJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpwb2ludGVyTW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJVcCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlclVwJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzdGF0aWNDbGljaycsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgY2VsbEVsZW1lbnQsIGNlbGxJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c3RhdGljQ2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQ6IGNlbGxFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4OiBjZWxsSW5kZXhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignbGF6eUxvYWQnLCBmdW5jdGlvbiAoZXZlbnQsIGNlbGxFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpsYXp5TG9hZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBGaW5kIGFuIG9iamVjdCB3aXRoaW4gYW4gYXJyYXkgYnkgSURcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZVxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gbWF0Y2hcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2ZpbmRPYmplY3RCeUlkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9maW5kT2JqZWN0QnlJZChzb3VyY2UsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlLmZpbHRlcihmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5pZCA9PT0gaWQ7XG4gICAgICAgICAgICB9KVswXTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGbGlja2l0eVNlcnZpY2U7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkuc2VydmljZS5qc1xuICoqLyIsImltcG9ydCBGbGlja2l0eSBmcm9tICdmbGlja2l0eSc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmxpY2tpdHlTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkdGltZW91dCwgJHEsICRyb290U2NvcGUsICRsb2dcclxuICAgICkge1xyXG4gICAgICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcclxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xyXG5cclxuICAgICAgICB0aGlzLmluc3RhbmNlcyA9IFtdO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIG5ldyBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBjcmVhdGUoZWxlbWVudCwgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXHJcbiAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgaXQgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBlbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzc2lnbiBhIG5ldyBJRFxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gdGhpcy5pbnN0YW5jZXMubGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBJRCBpcyBhbHJlYWR5IGluIHVzZVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fZmluZE9iamVjdEJ5SWQodGhpcy5pbnN0YW5jZXMsIGlkKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGxvZy5lcnJvcihgVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZTogYCwgdGhpcy5pbnN0YW5jZXNbaW5kZXhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZWplY3QoYFRoaXMgSUQgaXMgYWxyZWFkeSBpbiB1c2UuYCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIERlZmluZSB0aGUgbmV3IGluc3RhbmNlXHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IG5ldyBGbGlja2l0eShlbGVtZW50LCBvcHRpb25zKSxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNhdmUgdGhpcyBpbnN0YW5jZSB0byB0aGUgYXJyYXlcclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBCaW5kIHRvIGFsbCBldmVudHNcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRFdmVudHMoaWQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95IGEgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZGVzdHJveShpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5kZXN0cm95KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGluc3RhbmNlIGZyb20gdGhlIGFycmF5XHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLnNwbGljZShmbGlja2l0eUluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCdJbnN0YW5jZSAnICsgaWQgKyAnIGRlc3Ryb3llZC4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYWxsIGluc3RhbmNlc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSBpbnN0YW5jZXNcclxuICAgICAqL1xyXG4gICAgZ2V0QWxsKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHRoaXMuaW5zdGFuY2VzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgbmV4dChpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm5leHQoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJldmlvdXMoaWQsIGlzV3JhcHBlZCwgaXNJbnN0YW50KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJldmlvdXMoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCBhIHNsaWRlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XHJcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgc2VsZWN0KGlkLCBpbmRleCwgaXNXcmFwcGVkID0gZmFsc2UsIGlzSW5zdGFudCA9IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0KGluZGV4LCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IGEgc2xpZGUgb2YgYSBjZWxsXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ8U3RyaW5nfSB2YWx1ZVxyXG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcclxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdENlbGwoaWQsIHZhbHVlLCBpc1dyYXBwZWQgPSBmYWxzZSwgaXNJbnN0YW50ID0gZmFsc2UpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHNlbGVjdGVkIHNsaWRlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RDZWxsKHZhbHVlLCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBzZWxlY3RlZEluZGV4XHJcbiAgICAgKi9cclxuICAgIHNlbGVjdGVkSW5kZXgoaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY3VycmVudCBpbmRleFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNpemUgdGhlIGdhbGxlcnkgYW5kIHJlLXBvc2l0aW9uIGNlbGxzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICByZXNpemUoaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlc2l6ZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVzaXplKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUG9zaXRpb24gY2VsbHMgYXQgc2VsZWN0ZWQgcG9zaXRpb24uXHJcbiAgICAgKiBUcmlnZ2VyIHJlcG9zaXRpb24gYWZ0ZXIgdGhlIHNpemUgb2YgYSBjZWxsIGhhcyBiZWVuIGNoYW5nZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIHJlcG9zaXRpb24oaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlcG9zaXRpb25cclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlcG9zaXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZS1jb2xsZWN0IGFsbCBjZWxsIGVsZW1lbnRzIGluIGBmbGlja2l0eS1zbGlkZXJgLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICByZWxvYWRDZWxscyhpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVsb2FkIGNlbGxzXHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZWxvYWRDZWxscygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhIEZsaWNraXR5IGluc3RhbmNlIGJ5IElEXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldChpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0IHRoZSBmaXJzdCBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgZ2V0Rmlyc3QoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlcyB8fCB0aGlzLmluc3RhbmNlcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBObyBpbnN0YW5jZXMgZXhpc3QuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBHZXQgdGhlIEZsaWNraXR5IGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXHJcbiAgICAgKi9cclxuICAgIGdldEJ5RWxlbWVudChlbGVtZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBGbGlja2l0eS5kYXRhKGVsZW1lbnQpXHJcblxyXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlIG5vdCBmb3VuZCBmb3IgJyArIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGdhbGxlcnkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcclxuICAgICAqL1xyXG4gICAgcHJlcGVuZChpZCwgZWxlbWVudHMpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFByZXBlbmQgdGhlIHNsaWRlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwZW5kIGVsZW1lbnRzIGFuZCBjcmVhdGUgY2VsbHMgdG8gdGhlIGVuZCBvZiB0aGUgZ2FsbGVyeS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBhcHBlbmQoaWQsIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHNsaWRlc1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuYXBwZW5kKGVsZW1lbnRzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnNlcnQgZWxlbWVudHMgaW50byB0aGUgZ2FsbGVyeSBhbmQgY3JlYXRlIGNlbGxzIGF0IHRoZSBkZXNpcmVkIGluZGV4LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XHJcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gWmVybyBiYXNlZCBpbmRleFxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICBpbnNlcnQoaWQsIGVsZW1lbnRzLCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBzbGlkZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmluc2VydChlbGVtZW50cywgaW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgZWxlbWVudHMgb2YgdGhlIGNlbGxzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXHJcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbEVsZW1lbnRzXHJcbiAgICAgKi9cclxuICAgIGdldENlbGxFbGVtZW50cyhpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsIGVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgY2VsbHMgYnkgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RWxlbWVudH0gZWxlbWVudChzKVxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxyXG4gICAgICovXHJcbiAgICByZW1vdmUoaWQsIGVsZW1lbnRzKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZW1vdmUoZWxlbWVudHMpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGwgZWxlbWVudFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxyXG4gICAgICogQHJldHVybiB7RWxlbWVudH0gc2VsZWN0ZWRDZWxsRWxlbWVudFxyXG4gICAgICovXHJcbiAgICBzZWxlY3RlZEVsZW1lbnQoaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VsZWN0ZWQgZWxlbWVudFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldCBhbiBhcnJheSBvZiBhbGwgY2VsbHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsc1xyXG4gICAgICovXHJcbiAgICBjZWxscyhpZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuY2VsbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvL1xyXG4gICAgLy8gSGVscGVyIG1ldGhvZHNcclxuICAgIC8vXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCB0aGUgaW5kZXggZm9yIGEgRmxpY2tpdHkgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IGZsaWNraXR5SW5kZXhcclxuICAgICAqL1xyXG4gICAgX2dldEZsaWNraXR5SW5kZXgoaWQpIHtcclxuICAgICAgICBsZXQgZm91bmRJbmRleCA9IC0xO1xyXG5cclxuICAgICAgICAvLyBWZXJpZnkgYXQgbGVhc3Qgb25lIGluc3RhbmNlIGV4aXN0c1xyXG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlcy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0aGUgSUQgb2YgZWFjaCBpbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSwgaW5kZXgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBtYXRjaGVzIG91ciBJRCwgc2V0IHRoZSBpbmRleFxyXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3VuZEluZGV4O1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJpbmQgYWxsIGV2ZW50cyBmb3IgYSBuZXcgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge0Jvb2x9IGlzRmluaXNoZWRcclxuICAgICAqL1xyXG4gICAgX2JpbmRFdmVudHMoaWQpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgSUQgPSB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZWxlY3QnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnNlbGVjdGAsIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2V0dGxlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzZXR0bGVgLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2Nyb2xsJywgKHByb2dyZXNzLCBwb3NpdGlvblgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06c2Nyb2xsYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHBvc2l0aW9uWCxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnU3RhcnQnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06ZHJhZ1N0YXJ0YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdNb3ZlJywgKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmRyYWdNb3ZlYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3I6IG1vdmVWZWN0b3IsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ0VuZCcsIChldmVudCwgcG9pbnRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpkcmFnRW5kYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJEb3duJywgKGV2ZW50LCBwb2ludGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnBvaW50ZXJEb3duYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJNb3ZlJywoZXZlbnQsIHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06cG9pbnRlck1vdmVgLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvcixcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyVXAnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06cG9pbnRlclVwYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3N0YXRpY0NsaWNrJywgKGV2ZW50LCBwb2ludGVyLCBjZWxsRWxlbWVudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxJbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzdGF0aWNDbGlja2AsIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcclxuICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4OiBjZWxsSW5kZXgsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignbGF6eUxvYWQnLCAoZXZlbnQsIGNlbGxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmxhenlMb2FkYCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcclxuICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZCBhbiBvYmplY3Qgd2l0aGluIGFuIGFycmF5IGJ5IElEXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtBcnJheX0gc291cmNlXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gbWF0Y2hcclxuICAgICAqL1xyXG4gICAgX2ZpbmRPYmplY3RCeUlkKHNvdXJjZSwgaWQpIHtcclxuICAgICAgICByZXR1cm4gc291cmNlLmZpbHRlcigob2JqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QuaWQgPT09IGlkO1xyXG4gICAgICAgIH0pWzBdO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvZmxpY2tpdHkuc2VydmljZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIkZsaWNraXR5XCJcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eURpcmVjdGl2ZSA9IEZsaWNraXR5RGlyZWN0aXZlO1xuLyogZ2xvYmFsIEZsaWNraXR5ICovXG5cbmZ1bmN0aW9uIEZsaWNraXR5RGlyZWN0aXZlKCR0aW1lb3V0LCBGbGlja2l0eVNlcnZpY2UsIEZsaWNraXR5Q29uZmlnKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eTogJ0A/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/J1xuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgICAgICBwb3N0OiBwb3N0TGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiBjb250cm9sbGVyKCkge30sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIHVzZXIncyBvcHRpb25zIG9yIHN0YXJ0IHdpdGggYW4gZW1wdHkgb2JqZWN0XG5cbiAgICAgICAgdmFyIHVzZXJPcHRpb25zID0gYW5ndWxhci5mcm9tSnNvbigkY29udHJvbGxlci5iY0ZsaWNraXR5IHx8IHt9KTtcbiAgICAgICAgLy8gQ29tYmluZSB0aGUgdXNlciBvcHRpb25zIHdpdGggdGhlIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICAkY29udHJvbGxlci5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIEZsaWNraXR5Q29uZmlnLCB1c2VyT3B0aW9ucyk7XG5cbiAgICAgICAgLy8gSWYgbm8gSUQgd2FzIHBhc3NlZCBpblxuICAgICAgICBpZiAoISRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgb25lIGV4aXN0c1xuICAgICAgICAgICAgaWYgKCRhdHRycy5pZCkge1xuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9ICRhdHRycy5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogUG9zdCBMaW5rXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwb3N0TGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBgY3JlYXRlKClgIGdldHMgcGlja2VkIHVwIGluIHRoZSBuZXh0IGRpZ2VzdCBjeWNsZVxuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBGbGlja2l0eVxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmNyZWF0ZSgkZWxlbWVudFswXSwgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkLCAkY29udHJvbGxlci5vcHRpb25zKS50aGVuKGZ1bmN0aW9uIChmbGlja2l0eUluc3RhbmNlKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBFeHBvc2UgdGhlIEZsaWNraXR5IGluc3RhbmNlIGFuZCBJRFxuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLkZsaWNraXR5ID0gZmxpY2tpdHlJbnN0YW5jZS5pbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQgPSBmbGlja2l0eUluc3RhbmNlLmlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIGRpcmVjdGl2ZSBpcyBiZWluZyBkZXN0cm95ZWRcbiAgICAgICAgdmFyIG9uRGVzdHJveSA9ICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZGVzdHJveSB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5kZXN0cm95KCRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanNcbiAqKi8iLCIvKiBnbG9iYWwgRmxpY2tpdHkgKi9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGbGlja2l0eURpcmVjdGl2ZShcclxuICAgICR0aW1lb3V0LFxyXG4gICAgRmxpY2tpdHlTZXJ2aWNlLFxyXG4gICAgRmxpY2tpdHlDb25maWdcclxuKSB7XHJcbiAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHk6ICdAPycsXHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgcG9zdDogcG9zdExpbmtGdW5jdGlvbixcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9LFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcclxuICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIHVzZXIncyBvcHRpb25zIG9yIHN0YXJ0IHdpdGggYW4gZW1wdHkgb2JqZWN0XHJcbiAgICAgICAgY29uc3QgdXNlck9wdGlvbnMgPSBhbmd1bGFyLmZyb21Kc29uKCRjb250cm9sbGVyLmJjRmxpY2tpdHkgfHwge30pO1xyXG4gICAgICAgIC8vIENvbWJpbmUgdGhlIHVzZXIgb3B0aW9ucyB3aXRoIHRoZSBkZWZhdWx0IG9wdGlvbnNcclxuICAgICAgICAkY29udHJvbGxlci5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIEZsaWNraXR5Q29uZmlnLCB1c2VyT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIElEIHdhcyBwYXNzZWQgaW5cclxuICAgICAgICBpZiAoISRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCkge1xyXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBvbmUgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmICgkYXR0cnMuaWQpIHtcclxuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9ICRhdHRycy5pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQb3N0IExpbmtcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcG9zdExpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XHJcbiAgICAgICAgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgYGNyZWF0ZSgpYCBnZXRzIHBpY2tlZCB1cCBpbiB0aGUgbmV4dCBkaWdlc3QgY3ljbGVcclxuICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIEZsaWNraXR5XHJcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5jcmVhdGUoJGVsZW1lbnRbMF0sICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIub3B0aW9ucylcclxuICAgICAgICAgICAgICAgIC50aGVuKChmbGlja2l0eUluc3RhbmNlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEV4cG9zZSB0aGUgRmxpY2tpdHkgaW5zdGFuY2UgYW5kIElEXHJcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuRmxpY2tpdHkgPSBmbGlja2l0eUluc3RhbmNlLmluc3RhbmNlO1xyXG4gICAgICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9IGZsaWNraXR5SW5zdGFuY2UuaWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgZGlyZWN0aXZlIGlzIGJlaW5nIGRlc3Ryb3llZFxyXG4gICAgICAgIGNvbnN0IG9uRGVzdHJveSA9ICRzY29wZS4kb24oJyRkZXN0cm95JywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxyXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UuZGVzdHJveSgkY29udHJvbGxlci5iY0ZsaWNraXR5SWQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eU5leHREaXJlY3RpdmUgPSBGbGlja2l0eU5leHREaXJlY3RpdmU7XG5cbnZhciBfbmV4dCA9IHJlcXVpcmUoJy4vbmV4dC5jb250cm9sbGVyJyk7XG5cbmZ1bmN0aW9uIEZsaWNraXR5TmV4dERpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSwgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZSkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHlOZXh0OiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfbmV4dC5OZXh0Q29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAvKipcclxuICAgICAqIFByZSBMaW5rXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcblxuICAgICAgICB2YXIgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgdmFyIHNlbGVjdEV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6Y2VsbFNlbGVjdCc7XG4gICAgICAgIHZhciBzZXR0bGVFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOnNldHRsZSc7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIHZhciBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLmNlbGxzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2V0dGxlID0gJHJvb3RTY29wZS4kb24oc2V0dGxlRXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLmNlbGxzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UubmV4dCgkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5zdGFuY2UuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCwgY2VsbENvdW50KSB7XG5cbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IGNlbGxDb3VudCkge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qc1xuICoqLyIsImltcG9ydCB7IE5leHRDb250cm9sbGVyIH0gZnJvbSAnLi9uZXh0LmNvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZsaWNraXR5TmV4dERpcmVjdGl2ZShcclxuICAgICRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLFxyXG4gICAgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZVxyXG4pIHtcclxuICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcclxuICAgICAgICAgICAgYmNGbGlja2l0eU5leHQ6ICc9PycsXHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogTmV4dENvbnRyb2xsZXIsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlIExpbmtcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKFxyXG4gICAgICAgICRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXJcclxuICAgICkge1xyXG4gICAgICAgICduZ0luamVjdCc7XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgSURcclxuICAgICAgICBjb25zdCBJRCA9ICRjb250cm9sbGVyLmZsaWNraXR5SWQ7XHJcblxyXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcclxuICAgICAgICBjb25zdCBzZWxlY3RFdmVudCA9IGBGbGlja2l0eToke0lEfTpjZWxsU2VsZWN0YDtcclxuICAgICAgICBjb25zdCBzZXR0bGVFdmVudCA9IGBGbGlja2l0eToke0lEfTpzZXR0bGVgO1xyXG5cclxuICAgICAgICAvLyBMaXN0ZW5cclxuICAgICAgICBjb25zdCBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIChldmVudCwgZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2UuY2VsbHMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5jZWxscy5sZW5ndGgsIGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCArIDEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXHJcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5uZXh0KCRjb250cm9sbGVyLmZsaWNraXR5SWQsICRjb250cm9sbGVyLndyYXBBcm91bmQpXHJcbiAgICAgICAgICAgICAgICAudGhlbigoaW5zdGFuY2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluc3RhbmNlLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluZGV4LCBjZWxsQ291bnQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXHJcbiAgICAgICAgICAgIGlmICghJGNvbnRyb2xsZXIud3JhcEFyb3VuZCAmJiBpbmRleCA9PT0gY2VsbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9uZXh0L25leHQuZGlyZWN0aXZlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBOZXh0Q29udHJvbGxlciA9IGV4cG9ydHMuTmV4dENvbnRyb2xsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmV4dENvbnRyb2xsZXIoJGxvZywgJHEsICR0aW1lb3V0LCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE5leHRDb250cm9sbGVyKTtcblxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhOZXh0Q29udHJvbGxlciwgW3tcbiAgICAgICAga2V5OiAnX2FjdGl2YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vIEFzc2lnbiB3cmFwIGFyb3VuZCBvciBmYWxsIGJhY2sgdG8gYSBkZWZhdWx0XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYmNGbGlja2l0eU5leHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5TmV4dDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgICAgIHRoaXMuX3NldElkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0SWQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gX3RoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTmV4dENvbnRyb2xsZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgTmV4dENvbnRyb2xsZXIge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRsb2csICRxLCAkdGltZW91dCxcclxuICAgICAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xyXG4gICAgICAgIHRoaXMuJHEgPSAkcTtcclxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XHJcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xyXG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgX2FjdGl2YXRlKCkge1xyXG4gICAgICAgIC8vIEFzc2lnbiB3cmFwIGFyb3VuZCBvciBmYWxsIGJhY2sgdG8gYSBkZWZhdWx0XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJjRmxpY2tpdHlOZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlOZXh0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxyXG4gICAgICAgIHRoaXMuX3NldElkKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcclxuICAgICAqL1xyXG4gICAgX3NldElkKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJjRmxpY2tpdHlJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IHRoaXMuYmNGbGlja2l0eUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZmxpY2tpdHlJZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZS5nZXRGaXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaW5zdGFuY2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRsb2cud2FybihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlID0gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZTtcblxudmFyIF9wcmV2aW91cyA9IHJlcXVpcmUoJy4vcHJldmlvdXMuY29udHJvbGxlcicpO1xuXG5mdW5jdGlvbiBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eVByZXZpb3VzOiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfcHJldmlvdXMuUHJldmlvdXNDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIC8qKlxyXG4gICAgICogUHJlIExpbmtcclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBJRFxuXG4gICAgICAgIHZhciBJRCA9ICRjb250cm9sbGVyLmZsaWNraXR5SWQ7XG5cbiAgICAgICAgLy8gRGVmaW5lIHRoZSBicm9hZGNhc3QgbmFtZXMgdG8gbGlzdGVuIGZvclxuICAgICAgICB2YXIgc2VsZWN0RXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpjZWxsU2VsZWN0JztcbiAgICAgICAgdmFyIHNldHRsZUV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6c2V0dGxlJztcblxuICAgICAgICAvLyBMaXN0ZW5cbiAgICAgICAgdmFyIGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgc2V0dGxlID0gJHJvb3RTY29wZS4kb24oc2V0dGxlRXZlbnQsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgY2VsbFxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLnByZXZpb3VzKCRjb250cm9sbGVyLmZsaWNraXR5SWQsICRjb250cm9sbGVyLndyYXBBcm91bmQpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluZGV4KSB7XG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanNcbiAqKi8iLCJpbXBvcnQgeyBQcmV2aW91c0NvbnRyb2xsZXIgfSBmcm9tICcuL3ByZXZpb3VzLmNvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUoXHJcbiAgICAkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSxcclxuICAgIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2VcclxuKSB7XHJcbiAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgIGNvbnN0IGRpcmVjdGl2ZSA9IHtcclxuICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XHJcbiAgICAgICAgICAgIGJjRmxpY2tpdHlQcmV2aW91czogJz0/JyxcclxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiBQcmV2aW91c0NvbnRyb2xsZXIsXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gZGlyZWN0aXZlO1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZSBMaW5rXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbihcclxuICAgICAgICAkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyXHJcbiAgICApIHtcclxuICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIElEXHJcbiAgICAgICAgY29uc3QgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xyXG5cclxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0RXZlbnQgPSBgRmxpY2tpdHk6JHtJRH06Y2VsbFNlbGVjdGA7XHJcbiAgICAgICAgY29uc3Qgc2V0dGxlRXZlbnQgPSBgRmxpY2tpdHk6JHtJRH06c2V0dGxlYDtcclxuXHJcbiAgICAgICAgLy8gTGlzdGVuXHJcbiAgICAgICAgY29uc3QgY2VsbFNlbGVjdCA9ICRyb290U2NvcGUuJG9uKHNlbGVjdEV2ZW50LCAoZXZlbnQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHNldHRsZSA9ICRyb290U2NvcGUuJG9uKHNldHRsZUV2ZW50LCAoZXZlbnQsIGRhdGEpID0+IHtcclxuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXHJcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5wcmV2aW91cygkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKGluc3RhbmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCkge1xyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxyXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFByZXZpb3VzQ29udHJvbGxlciA9IGV4cG9ydHMuUHJldmlvdXNDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByZXZpb3VzQ29udHJvbGxlcigkbG9nLCAkcSwgJHRpbWVvdXQsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJldmlvdXNDb250cm9sbGVyKTtcblxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhQcmV2aW91c0NvbnRyb2xsZXIsIFt7XG4gICAgICAgIGtleTogJ19hY3RpdmF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAvLyBBc3NpZ24gd3JhcCBhcm91bmQgb3IgZmFsbCBiYWNrIHRvIGEgZGVmYXVsdFxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgICAgIHRoaXMuX3NldElkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0SWQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gX3RoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gUHJldmlvdXNDb250cm9sbGVyO1xufSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3ByZXZpb3VzL3ByZXZpb3VzLmNvbnRyb2xsZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgUHJldmlvdXNDb250cm9sbGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkbG9nLCAkcSwgJHRpbWVvdXQsXHJcbiAgICAgICAgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgJ25nSW5qZWN0JztcclxuXHJcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcclxuICAgICAgICB0aGlzLiRxID0gJHE7XHJcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xyXG4gICAgICAgIHRoaXMuRmxpY2tpdHlDb25maWcgPSBGbGlja2l0eUNvbmZpZztcclxuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIF9hY3RpdmF0ZSgpIHtcclxuICAgICAgICAvLyBBc3NpZ24gd3JhcCBhcm91bmQgb3IgZmFsbCBiYWNrIHRvIGEgZGVmYXVsdFxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5iY0ZsaWNraXR5UHJldmlvdXMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuYmNGbGlja2l0eVByZXZpb3VzO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxyXG4gICAgICAgIHRoaXMuX3NldElkKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcclxuICAgICAqL1xyXG4gICAgX3NldElkKCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJjRmxpY2tpdHlJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IHRoaXMuYmNGbGlja2l0eUlkO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZmxpY2tpdHlJZCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZS5nZXRGaXJzdCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaW5zdGFuY2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRsb2cud2FybihlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5jb250cm9sbGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==