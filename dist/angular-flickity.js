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
	        }
	    }]);
	
	    return PreviousController;
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxM2EzZWJhYjgxOTNlYTgwZGQyZSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzPzFmMzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5wcm92aWRlci5qcz8wMWY1Iiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzP2FkYTUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiRmxpY2tpdHlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanM/ZjYyNCIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qcz82NWFhIiwid2VicGFjazovLy8uL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanM/MDE5ZSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanM/ZDI0NSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qcz9iOGY5Il0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJwcm92aWRlciIsInNlcnZpY2UiLCJkaXJlY3RpdmUiLCJGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyIiwiYWNjZXNzaWJpbGl0eSIsImNlbGxBbGlnbiIsImZyZWVTY3JvbGxGcmljdGlvbiIsImZyaWN0aW9uIiwicGVyY2VudFBvc2l0aW9uIiwicmVzaXplIiwic2VsZWN0ZWRBdHRyYWN0aW9uIiwic2V0R2FsbGVyeVNpemUiLCIkdGltZW91dCIsIiRxIiwiJHJvb3RTY29wZSIsIiRsb2ciLCJpbnN0YW5jZXMiLCJlbGVtZW50IiwiaWQiLCJvcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsZW5ndGgiLCJfZmluZE9iamVjdEJ5SWQiLCJpbmRleCIsIl9nZXRGbGlja2l0eUluZGV4IiwiZXJyb3IiLCJpbnN0YW5jZSIsInB1c2giLCJfYmluZEV2ZW50cyIsInRoZW4iLCJmbGlja2l0eUluZGV4IiwiZGVzdHJveSIsInNwbGljZSIsImlzV3JhcHBlZCIsImlzSW5zdGFudCIsIm5leHQiLCJwcmV2aW91cyIsInNlbGVjdCIsInZhbHVlIiwic2VsZWN0Q2VsbCIsInNlbGVjdGVkSW5kZXgiLCJyZXBvc2l0aW9uIiwicmVsb2FkQ2VsbHMiLCJkYXRhIiwiZWxlbWVudHMiLCJwcmVwZW5kIiwiYXBwZW5kIiwiaW5zZXJ0IiwiZ2V0Q2VsbEVsZW1lbnRzIiwicmVtb3ZlIiwic2VsZWN0ZWRFbGVtZW50IiwiY2VsbHMiLCJmb3VuZEluZGV4IiwiZm9yRWFjaCIsIklEIiwib24iLCIkZW1pdCIsInByb2dyZXNzIiwicG9zaXRpb25YIiwiZXZlbnQiLCJwb2ludGVyIiwibW92ZVZlY3RvciIsImNlbGxFbGVtZW50IiwiY2VsbEluZGV4Iiwic291cmNlIiwiZmlsdGVyIiwib2JqZWN0IiwiRmxpY2tpdHlEaXJlY3RpdmUiLCJGbGlja2l0eVNlcnZpY2UiLCJGbGlja2l0eUNvbmZpZyIsInJlc3RyaWN0Iiwic2NvcGUiLCJiaW5kVG9Db250cm9sbGVyIiwiYmNGbGlja2l0eSIsImJjRmxpY2tpdHlJZCIsImNvbXBpbGUiLCJwcmUiLCJwcmVMaW5rRnVuY3Rpb24iLCJwb3N0IiwicG9zdExpbmtGdW5jdGlvbiIsImNvbnRyb2xsZXIiLCJjb250cm9sbGVyQXMiLCIkc2NvcGUiLCIkZWxlbWVudCIsIiRhdHRycyIsIiRjb250cm9sbGVyIiwidXNlck9wdGlvbnMiLCJmcm9tSnNvbiIsImV4dGVuZCIsImNyZWF0ZSIsImZsaWNraXR5SW5zdGFuY2UiLCJGbGlja2l0eSIsIm9uRGVzdHJveSIsIiRvbiIsIkZsaWNraXR5TmV4dERpcmVjdGl2ZSIsImJjRmxpY2tpdHlOZXh0IiwiZmxpY2tpdHlJZCIsInNlbGVjdEV2ZW50Iiwic2V0dGxlRXZlbnQiLCJjZWxsU2VsZWN0IiwiX2Rpc2FibGVCdXR0b25JZk5lZWRlZCIsInNldHRsZSIsIndyYXBBcm91bmQiLCJjZWxsQ291bnQiLCIkc2V0IiwiX2FjdGl2YXRlIiwiX3NldElkIiwiZ2V0Rmlyc3QiLCJjYXRjaCIsIndhcm4iLCJGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlIiwiYmNGbGlja2l0eVByZXZpb3VzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUFBLFNBQVFDLE9BQU8sZUFBZSxJQUN6QkMsU0FBUyxrQkFEZCxrQ0FFS0MsUUFBUSxtQkFGYiw0QkFHS0MsVUFBVSxjQUhmLDhCQUlLQSxVQUFVLGtCQUpmLDZCQUtLQSxVQUFVLHNCQUxmLHFDOzs7Ozs7QUNOQTs7QUFFQSxRQUFPLGVBQWUsU0FBUyxj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VjJELGdCQUFnQkQsaUJBQ2xCO1NBQ0U7O1NBREY7O1NBR0UsS0FBS3ZELE9BQU9BO1NBQ1osS0FBS0YsS0FBS0E7U0FDVixLQUFLRCxXQUFXQTtTQUNoQixLQUFLMkQsaUJBQWlCQTtTQUN0QixLQUFLRCxrQkFBa0JBOztTQUd2QixLQUFLcUM7OztLRFVULGFBQWEsb0JBQW9CLENBQUM7U0FDOUIsS0FBSztTQUNMLE9BQU8sU0FBUyxZQ0xSOzthQUVSLElBQUksT0FBTyxLQUFLTSx1QkFBdUIsYUFBYTtpQkFDaEQsS0FBS1QsYUFBYSxLQUFLUztvQkFDcEIsSUFBSSxPQUFPLEtBQUsxQyxlQUFlaUMsZUFBZSxhQUFhO2lCQUM5RCxLQUFLQSxhQUFhLEtBQUtqQyxlQUFlaUM7b0JBQ25DO2lCQUNILEtBQUtBLGFBQWE7O2FBRXRCLEtBQUtOLGFBQWE7OzthQUdsQixLQUFLVTs7Ozs7Ozs7O1FEY047U0FDQyxLQUFLO1NBQ0wsT0FBTyxTQUFTLFNDUFg7YUFBQTs7YUFDTCxPQUFPLElBQUl4RixRQUFRLFVBQUNDLFNBQVNDLFFBQVc7O2lCQUVwQyxJQUFJLE1BQUtzRCxjQUFjO3FCQUNuQixNQUFLc0IsYUFBYSxNQUFLdEI7cUJBQ3ZCLE9BQU92RCxRQUFRLE1BQUs2RTt3QkFDakI7cUJBQ0gsTUFBS3RGLFNBQVMsWUFBTTt5QkFDaEIsTUFBSzBELGdCQUFnQnVDLFdBQ2hCOUUsS0FBSyxVQUFDSCxVQUFhOzZCQUNoQixNQUFLc0UsYUFBYXRFLFNBQVNWOzZCQUMzQixPQUFPRyxRQUFRLE1BQUs2RTs0QkFFdkJZLE1BQU0sVUFBQ25GLE9BQVU7NkJBQ2QsTUFBS1osS0FBS2dHLEtBQUtwRjs2QkFDZixPQUFPTCxPQUFPSzs7Ozs7Ozs7S0RldEMsT0FBTyIsImZpbGUiOiJhbmd1bGFyLWZsaWNraXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiRmxpY2tpdHlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJhbmd1bGFyLWZsaWNraXR5XCIsIFtcIkZsaWNraXR5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFuZ3VsYXItZmxpY2tpdHlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJGbGlja2l0eVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiYW5ndWxhci1mbGlja2l0eVwiXSA9IGZhY3Rvcnkocm9vdFtcIkZsaWNraXR5XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxM2EzZWJhYjgxOTNlYTgwZGQyZVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9mbGlja2l0eSA9IHJlcXVpcmUoJy4vZmxpY2tpdHkucHJvdmlkZXInKTtcblxudmFyIF9mbGlja2l0eTIgPSByZXF1aXJlKCcuL2ZsaWNraXR5LnNlcnZpY2UnKTtcblxudmFyIF9mbGlja2l0eTMgPSByZXF1aXJlKCcuL2ZsaWNraXR5LmRpcmVjdGl2ZScpO1xuXG52YXIgX25leHQgPSByZXF1aXJlKCcuL25leHQvbmV4dC5kaXJlY3RpdmUnKTtcblxudmFyIF9wcmV2aW91cyA9IHJlcXVpcmUoJy4vcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlJyk7XG5cbmFuZ3VsYXIubW9kdWxlKCdiYy5GbGlja2l0eScsIFtdKS5wcm92aWRlcignRmxpY2tpdHlDb25maWcnLCBfZmxpY2tpdHkuRmxpY2tpdHlDb25maWdQcm92aWRlcikuc2VydmljZSgnRmxpY2tpdHlTZXJ2aWNlJywgX2ZsaWNraXR5Mi5GbGlja2l0eVNlcnZpY2UpLmRpcmVjdGl2ZSgnYmNGbGlja2l0eScsIF9mbGlja2l0eTMuRmxpY2tpdHlEaXJlY3RpdmUpLmRpcmVjdGl2ZSgnYmNGbGlja2l0eU5leHQnLCBfbmV4dC5GbGlja2l0eU5leHREaXJlY3RpdmUpLmRpcmVjdGl2ZSgnYmNGbGlja2l0eVByZXZpb3VzJywgX3ByZXZpb3VzLkZsaWNraXR5UHJldmlvdXNEaXJlY3RpdmUpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwiaW1wb3J0IHsgRmxpY2tpdHlDb25maWdQcm92aWRlciB9IGZyb20gJy4vZmxpY2tpdHkucHJvdmlkZXInXG5pbXBvcnQgeyBGbGlja2l0eVNlcnZpY2UgfSBmcm9tICcuL2ZsaWNraXR5LnNlcnZpY2UnO1xuaW1wb3J0IHsgRmxpY2tpdHlEaXJlY3RpdmUgfSBmcm9tICcuL2ZsaWNraXR5LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGbGlja2l0eU5leHREaXJlY3RpdmUgfSBmcm9tICcuL25leHQvbmV4dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSB9IGZyb20gJy4vcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlJztcblxuYW5ndWxhci5tb2R1bGUoJ2JjLkZsaWNraXR5JywgW10pXG4gICAgLnByb3ZpZGVyKCdGbGlja2l0eUNvbmZpZycsIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIpXG4gICAgLnNlcnZpY2UoJ0ZsaWNraXR5U2VydmljZScsIEZsaWNraXR5U2VydmljZSlcbiAgICAuZGlyZWN0aXZlKCdiY0ZsaWNraXR5JywgRmxpY2tpdHlEaXJlY3RpdmUpXG4gICAgLmRpcmVjdGl2ZSgnYmNGbGlja2l0eU5leHQnLCBGbGlja2l0eU5leHREaXJlY3RpdmUpXG4gICAgLmRpcmVjdGl2ZSgnYmNGbGlja2l0eVByZXZpb3VzJywgRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSlcbjtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIgPSBleHBvcnRzLkZsaWNraXR5Q29uZmlnUHJvdmlkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmxpY2tpdHlDb25maWdQcm92aWRlcigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIpO1xuXG4gICAgICAgIC8vIERlZmluZSBGbGlja2l0eSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmFjY2Vzc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICB0aGlzLmNlbGxBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICB0aGlzLmZyZWVTY3JvbGxGcmljdGlvbiA9IC4wNzU7XG4gICAgICAgIHRoaXMuZnJpY3Rpb24gPSAuMjg7XG4gICAgICAgIHRoaXMucGVyY2VudFBvc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNpemUgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQXR0cmFjdGlvbiA9IC4wMjU7XG4gICAgICAgIHRoaXMuc2V0R2FsbGVyeVNpemUgPSB0cnVlO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyLCBbe1xuICAgICAgICBrZXk6ICckZ2V0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICRnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyO1xufSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIEZsaWNraXR5Q29uZmlnUHJvdmlkZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIC8vIERlZmluZSBGbGlja2l0eSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmFjY2Vzc2liaWxpdHkgICAgICA9IHRydWU7XG4gICAgICAgIHRoaXMuY2VsbEFsaWduICAgICAgICAgID0gJ2NlbnRlcic7XG4gICAgICAgIHRoaXMuZnJlZVNjcm9sbEZyaWN0aW9uID0gLjA3NTtcbiAgICAgICAgdGhpcy5mcmljdGlvbiAgICAgICAgICAgPSAuMjg7XG4gICAgICAgIHRoaXMucGVyY2VudFBvc2l0aW9uICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZXNpemUgICAgICAgICAgICAgPSB0cnVlO1xuICAgICAgICB0aGlzLnNlbGVjdGVkQXR0cmFjdGlvbiA9IC4wMjU7XG4gICAgICAgIHRoaXMuc2V0R2FsbGVyeVNpemUgICAgID0gdHJ1ZTtcbiAgICB9XG5cblxuXG5cbiAgICAkZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9mbGlja2l0eS5wcm92aWRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eVNlcnZpY2UgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZmxpY2tpdHkgPSByZXF1aXJlKCdmbGlja2l0eScpO1xuXG52YXIgX2ZsaWNraXR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2ZsaWNraXR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZsaWNraXR5U2VydmljZSA9IGV4cG9ydHMuRmxpY2tpdHlTZXJ2aWNlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZsaWNraXR5U2VydmljZSgkdGltZW91dCwgJHEsICRyb290U2NvcGUsICRsb2cpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpY2tpdHlTZXJ2aWNlKTtcblxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcblxuICAgICAgICB0aGlzLmluc3RhbmNlcyA9IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG5cblxuICAgIF9jcmVhdGVDbGFzcyhGbGlja2l0eVNlcnZpY2UsIFt7XG4gICAgICAgIGtleTogJ2NyZWF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGUoZWxlbWVudCwgaWQsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgbm8gSUQgd2FzIHBhc3NlZCBpblxuICAgICAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSB0aGUgZWxlbWVudCdzIElEIGlmIGl0IGV4aXN0c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBlbGVtZW50LmlkO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCBhc3NpZ24gYSBuZXcgSURcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkID0gX3RoaXMuaW5zdGFuY2VzLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIElEIGlzIGFscmVhZHkgaW4gdXNlXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLl9maW5kT2JqZWN0QnlJZChfdGhpcy5pbnN0YW5jZXMsIGlkKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBfdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLiRsb2cuZXJyb3IoJ1RoaXMgSUQgaXMgYWxyZWFkeSBpbiB1c2U6ICcsIF90aGlzLmluc3RhbmNlc1tpbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCgnVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZS4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgdGhlIG5ldyBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogbmV3IF9mbGlja2l0eTIuZGVmYXVsdChlbGVtZW50LCBvcHRpb25zKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBTYXZlIHRoaXMgaW5zdGFuY2UgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xuXG4gICAgICAgICAgICAgICAgLy8gQmluZCB0byBhbGwgZXZlbnRzXG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLl9iaW5kRXZlbnRzKGlkKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRGVzdHJveSBhIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkZXN0cm95JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMyLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBEZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIF90aGlzMi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuZGVzdHJveSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbnN0YW5jZSBmcm9tIHRoZSBhcnJheVxuICAgICAgICAgICAgICAgIF90aGlzMi5pbnN0YW5jZXMuc3BsaWNlKGZsaWNraXR5SW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoJ0luc3RhbmNlICcgKyBpZCArICcgZGVzdHJveWVkLicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGFsbCBpbnN0YW5jZXNcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGluc3RhbmNlc1xuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0QWxsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEFsbCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKF90aGlzMy5pbnN0YW5jZXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnbmV4dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBuZXh0KGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczQuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5uZXh0KGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcmV2aW91cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBwcmV2aW91cyhpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM1Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBwcmV2aW91cyBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczUuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnByZXZpb3VzKGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbGVjdCBhIHNsaWRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3QoaWQsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGlzV3JhcHBlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB2YXIgaXNJbnN0YW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3QoaW5kZXgsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlbGVjdCBhIHNsaWRlIG9mIGEgY2VsbFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfFN0cmluZ30gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2VsZWN0Q2VsbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RDZWxsKGlkLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBpc1dyYXBwZWQgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGlzSW5zdGFudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczcuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHNlbGVjdGVkIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0Q2VsbCh2YWx1ZSwgaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBjdXJyZW50IHNsaWRlIGluZGV4XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBzZWxlY3RlZEluZGV4XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RlZEluZGV4JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdGVkSW5kZXgoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM4Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM4Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNpemUgdGhlIGdhbGxlcnkgYW5kIHJlLXBvc2l0aW9uIGNlbGxzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVzaXplJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2l6ZShpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczkuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM5Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUG9zaXRpb24gY2VsbHMgYXQgc2VsZWN0ZWQgcG9zaXRpb24uXG4gICAgICAgICAqIFRyaWdnZXIgcmVwb3NpdGlvbiBhZnRlciB0aGUgc2l6ZSBvZiBhIGNlbGwgaGFzIGJlZW4gY2hhbmdlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlcG9zaXRpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVwb3NpdGlvbihpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgcmVwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBfdGhpczEwLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZXBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEwLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmUtY29sbGVjdCBhbGwgY2VsbCBlbGVtZW50cyBpbiBgZmxpY2tpdHktc2xpZGVyYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbG9hZENlbGxzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbG9hZENlbGxzKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczExLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZWxvYWQgY2VsbHNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVsb2FkQ2VsbHMoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYSBGbGlja2l0eSBpbnN0YW5jZSBieSBJRFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTIgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxMi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEyLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBmaXJzdCBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRGaXJzdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRGaXJzdCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczEzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzMTMuaW5zdGFuY2VzIHx8IF90aGlzMTMuaW5zdGFuY2VzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnTm8gaW5zdGFuY2VzIGV4aXN0LicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxMy5pbnN0YW5jZXNbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEJ5RWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRCeUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBfZmxpY2tpdHkyLmRlZmF1bHQuZGF0YShlbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKGluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSBub3QgZm91bmQgZm9yICcgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcmVwZW5kIGVsZW1lbnRzIGFuZCBjcmVhdGUgY2VsbHMgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgZ2FsbGVyeS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwcmVwZW5kJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByZXBlbmQoaWQsIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE0Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBQcmVwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQXBwZW5kIGVsZW1lbnRzIGFuZCBjcmVhdGUgY2VsbHMgdG8gdGhlIGVuZCBvZiB0aGUgZ2FsbGVyeS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhcHBlbmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTUgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuYXBwZW5kKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTUuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnNlcnQgZWxlbWVudHMgaW50byB0aGUgZ2FsbGVyeSBhbmQgY3JlYXRlIGNlbGxzIGF0IHRoZSBkZXNpcmVkIGluZGV4LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBaZXJvIGJhc2VkIGluZGV4XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2luc2VydCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbnNlcnQoaWQsIGVsZW1lbnRzLCBpbmRleCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTYgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNi5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxNi5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuaW5zZXJ0KGVsZW1lbnRzLCBpbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBlbGVtZW50cyBvZiB0aGUgY2VsbHNcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsRWxlbWVudHNcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldENlbGxFbGVtZW50cycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDZWxsRWxlbWVudHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE3ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTcuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYXJyYXkgb2YgY2VsbCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIGNlbGxzIGJ5IGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEVsZW1lbnR9IGVsZW1lbnQocylcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVtb3ZlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE4ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTguX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbW92ZShlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE4Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgY2VsbCBlbGVtZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtFbGVtZW50fSBzZWxlY3RlZENlbGxFbGVtZW50XG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RlZEVsZW1lbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0ZWRFbGVtZW50KGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxOSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE5Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHNlbGVjdGVkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxOS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgYW4gYXJyYXkgb2YgYWxsIGNlbGxzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbHNcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NlbGxzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNlbGxzKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyMCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczIwLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGxzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMjAuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmNlbGxzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEhlbHBlciBtZXRob2RzXG4gICAgICAgIC8vXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogRmluZCB0aGUgaW5kZXggZm9yIGEgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IGZsaWNraXR5SW5kZXhcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRGbGlja2l0eUluZGV4JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRGbGlja2l0eUluZGV4KGlkKSB7XG4gICAgICAgICAgICB2YXIgZm91bmRJbmRleCA9IC0xO1xuXG4gICAgICAgICAgICAvLyBWZXJpZnkgYXQgbGVhc3Qgb25lIGluc3RhbmNlIGV4aXN0c1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRoZSBJRCBvZiBlYWNoIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMuZm9yRWFjaChmdW5jdGlvbiAoaW5zdGFuY2UsIGluZGV4KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgbWF0Y2hlcyBvdXIgSUQsIHNldCB0aGUgaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmb3VuZEluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJpbmQgYWxsIGV2ZW50cyBmb3IgYSBuZXcgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2x9IGlzRmluaXNoZWRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19iaW5kRXZlbnRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9iaW5kRXZlbnRzKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyMSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczIxLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIElEID0gX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaWQ7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2VsZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c2VsZWN0JywgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NldHRsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnNldHRsZScsIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzY3JvbGwnLCBmdW5jdGlvbiAocHJvZ3Jlc3MsIHBvc2l0aW9uWCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c2Nyb2xsJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25YOiBwb3NpdGlvblhcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ1N0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpkcmFnU3RhcnQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdNb3ZlJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpkcmFnTW92ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdFbmQnLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOmRyYWdFbmQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJEb3duJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpwb2ludGVyRG93bicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlck1vdmUnLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnBvaW50ZXJNb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3I6IG1vdmVWZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlclVwJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpwb2ludGVyVXAnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3N0YXRpY0NsaWNrJywgZnVuY3Rpb24gKGV2ZW50LCBwb2ludGVyLCBjZWxsRWxlbWVudCwgY2VsbEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpzdGF0aWNDbGljaycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsSW5kZXg6IGNlbGxJbmRleFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdsYXp5TG9hZCcsIGZ1bmN0aW9uIChldmVudCwgY2VsbEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOmxhenlMb2FkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQ6IGNlbGxFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kIGFuIG9iamVjdCB3aXRoaW4gYW4gYXJyYXkgYnkgSURcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gc291cmNlXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IG1hdGNoXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfZmluZE9iamVjdEJ5SWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbmRPYmplY3RCeUlkKHNvdXJjZSwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0LmlkID09PSBpZDtcbiAgICAgICAgICAgIH0pWzBdO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEZsaWNraXR5U2VydmljZTtcbn0oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzXG4gKiovIiwiaW1wb3J0IEZsaWNraXR5IGZyb20gJ2ZsaWNraXR5JztcblxuZXhwb3J0IGNsYXNzIEZsaWNraXR5U2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgJHRpbWVvdXQsICRxLCAkcm9vdFNjb3BlLCAkbG9nXG4gICAgKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG5cbiAgICAgICAgdGhpcy5pbnN0YW5jZXMgPSBbXTtcblxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgY3JlYXRlKGVsZW1lbnQsIGlkLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIGlkID0gZWxlbWVudC5pZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzc2lnbiBhIG5ldyBJRFxuICAgICAgICAgICAgICAgICAgICBpZCA9IHRoaXMuaW5zdGFuY2VzLmxlbmd0aCArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIElEIGlzIGFscmVhZHkgaW4gdXNlXG4gICAgICAgICAgICBpZiAodGhpcy5fZmluZE9iamVjdEJ5SWQodGhpcy5pbnN0YW5jZXMsIGlkKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbG9nLmVycm9yKGBUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlOiBgLCB0aGlzLmluc3RhbmNlc1tpbmRleF0pO1xuXG4gICAgICAgICAgICAgICAgcmVqZWN0KGBUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlLmApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBEZWZpbmUgdGhlIG5ldyBpbnN0YW5jZVxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlOiBuZXcgRmxpY2tpdHkoZWxlbWVudCwgb3B0aW9ucyksXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBTYXZlIHRoaXMgaW5zdGFuY2UgdG8gdGhlIGFycmF5XG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5wdXNoKGluc3RhbmNlKTtcblxuICAgICAgICAgICAgLy8gQmluZCB0byBhbGwgZXZlbnRzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmluZEV2ZW50cyhpZCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSBhIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgZGVzdHJveShpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgaW5zdGFuY2UgZnJvbSB0aGUgYXJyYXlcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLnNwbGljZShmbGlja2l0eUluZGV4LCAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoJ0luc3RhbmNlICcgKyBpZCArICcgZGVzdHJveWVkLicpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhbGwgaW5zdGFuY2VzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gaW5zdGFuY2VzXG4gICAgICovXG4gICAgZ2V0QWxsKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5pbnN0YW5jZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgbmV4dChpZCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UubmV4dChpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHByZXZpb3VzKGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJldmlvdXMoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgYSBzbGlkZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleFxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgc2VsZWN0KGlkLCBpbmRleCwgaXNXcmFwcGVkID0gZmFsc2UsIGlzSW5zdGFudCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3QoaW5kZXgsIGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2VsZWN0IGEgc2xpZGUgb2YgYSBjZWxsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ8U3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgc2VsZWN0Q2VsbChpZCwgdmFsdWUsIGlzV3JhcHBlZCA9IGZhbHNlLCBpc0luc3RhbnQgPSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHNlbGVjdGVkIHNsaWRlXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0Q2VsbCh2YWx1ZSwgaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXhcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IHNlbGVjdGVkSW5kZXhcbiAgICAgKi9cbiAgICBzZWxlY3RlZEluZGV4KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjdXJyZW50IGluZGV4XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIHRoZSBnYWxsZXJ5IGFuZCByZS1wb3NpdGlvbiBjZWxscy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICByZXNpemUoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSByZXNpemVcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZXNpemUoKTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gY2VsbHMgYXQgc2VsZWN0ZWQgcG9zaXRpb24uXG4gICAgICogVHJpZ2dlciByZXBvc2l0aW9uIGFmdGVyIHRoZSBzaXplIG9mIGEgY2VsbCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlcG9zaXRpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSByZXBvc2l0aW9uXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVwb3NpdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZS1jb2xsZWN0IGFsbCBjZWxsIGVsZW1lbnRzIGluIGBmbGlja2l0eS1zbGlkZXJgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlbG9hZENlbGxzKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmVsb2FkIGNlbGxzXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVsb2FkQ2VsbHMoKTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgRmxpY2tpdHkgaW5zdGFuY2UgYnkgSURcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXQoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZmlyc3QgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXRGaXJzdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pbnN0YW5jZXMgfHwgdGhpcy5pbnN0YW5jZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYE5vIGluc3RhbmNlcyBleGlzdC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgZ2V0QnlFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gRmxpY2tpdHkuZGF0YShlbGVtZW50KVxuXG4gICAgICAgICAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSBub3QgZm91bmQgZm9yICcgKyBlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQcmVwZW5kIGVsZW1lbnRzIGFuZCBjcmVhdGUgY2VsbHMgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgZ2FsbGVyeS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBwcmVwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFByZXBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnByZXBlbmQoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBBcHBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgZW5kIG9mIHRoZSBnYWxsZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGFwcGVuZChpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmFwcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEluc2VydCBlbGVtZW50cyBpbnRvIHRoZSBnYWxsZXJ5IGFuZCBjcmVhdGUgY2VsbHMgYXQgdGhlIGRlc2lyZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gWmVybyBiYXNlZCBpbmRleFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBpbnNlcnQoaWQsIGVsZW1lbnRzLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEluc2VydCB0aGUgc2xpZGVzXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuaW5zZXJ0KGVsZW1lbnRzLCBpbmRleCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZWxlbWVudHMgb2YgdGhlIGNlbGxzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gY2VsbEVsZW1lbnRzXG4gICAgICovXG4gICAgZ2V0Q2VsbEVsZW1lbnRzKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuZ2V0Q2VsbEVsZW1lbnRzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBjZWxscyBieSBlbGVtZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxFbGVtZW50fSBlbGVtZW50KHMpXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlbW92ZShpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZW1vdmUoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxsIGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IHNlbGVjdGVkQ2VsbEVsZW1lbnRcbiAgICAgKi9cbiAgICBzZWxlY3RlZEVsZW1lbnQoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHNlbGVjdGVkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCBhbiBhcnJheSBvZiBhbGwgY2VsbHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsc1xuICAgICAqL1xuICAgIGNlbGxzKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsc1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmNlbGxzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cblxuICAgIC8vXG4gICAgLy8gSGVscGVyIG1ldGhvZHNcbiAgICAvL1xuXG5cbiAgICAvKipcbiAgICAgKiBGaW5kIHRoZSBpbmRleCBmb3IgYSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7SW50ZWdlcn0gZmxpY2tpdHlJbmRleFxuICAgICAqL1xuICAgIF9nZXRGbGlja2l0eUluZGV4KGlkKSB7XG4gICAgICAgIGxldCBmb3VuZEluZGV4ID0gLTE7XG5cbiAgICAgICAgLy8gVmVyaWZ5IGF0IGxlYXN0IG9uZSBpbnN0YW5jZSBleGlzdHNcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2VzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIElEIG9mIGVhY2ggaW5zdGFuY2VcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLmZvckVhY2goKGluc3RhbmNlLCBpbmRleCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQgbWF0Y2hlcyBvdXIgSUQsIHNldCB0aGUgaW5kZXhcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kSW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZm91bmRJbmRleDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEJpbmQgYWxsIGV2ZW50cyBmb3IgYSBuZXcgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0Jvb2x9IGlzRmluaXNoZWRcbiAgICAgKi9cbiAgICBfYmluZEV2ZW50cyhpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IElEID0gdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaWQ7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZWxlY3QnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzZWxlY3RgLCB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NldHRsZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnNldHRsZWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2Nyb2xsJywgKHByb2dyZXNzLCBwb3NpdGlvblgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnNjcm9sbGAsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHBvc2l0aW9uWCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ1N0YXJ0JywgKGV2ZW50LCBwb2ludGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpkcmFnU3RhcnRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ01vdmUnLCAoZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmRyYWdNb3ZlYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3I6IG1vdmVWZWN0b3IsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2RyYWdFbmQnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmRyYWdFbmRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlckRvd24nLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnBvaW50ZXJEb3duYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJNb3ZlJywoZXZlbnQsIHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpwb2ludGVyTW92ZWAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICBtb3ZlVmVjdG9yOiBtb3ZlVmVjdG9yLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyVXAnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnBvaW50ZXJVcGAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzdGF0aWNDbGljaycsIChldmVudCwgcG9pbnRlciwgY2VsbEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KGBGbGlja2l0eToke0lEfTpzdGF0aWNDbGlja2AsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxJbmRleDogY2VsbEluZGV4LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdsYXp5TG9hZCcsIChldmVudCwgY2VsbEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmxhenlMb2FkYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEZpbmQgYW4gb2JqZWN0IHdpdGhpbiBhbiBhcnJheSBieSBJRFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gc291cmNlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBtYXRjaFxuICAgICAqL1xuICAgIF9maW5kT2JqZWN0QnlJZChzb3VyY2UsIGlkKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2UuZmlsdGVyKChvYmplY3QpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QuaWQgPT09IGlkO1xuICAgICAgICB9KVswXTtcbiAgICB9XG5cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvZmxpY2tpdHkuc2VydmljZS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIkZsaWNraXR5XCJcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMVxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eURpcmVjdGl2ZSA9IEZsaWNraXR5RGlyZWN0aXZlO1xuLyogZ2xvYmFsIEZsaWNraXR5ICovXG5cbmZ1bmN0aW9uIEZsaWNraXR5RGlyZWN0aXZlKCR0aW1lb3V0LCBGbGlja2l0eVNlcnZpY2UsIEZsaWNraXR5Q29uZmlnKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eTogJ0A/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/J1xuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgICAgICBwb3N0OiBwb3N0TGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiBjb250cm9sbGVyKCkge30sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIHVzZXIncyBvcHRpb25zIG9yIHN0YXJ0IHdpdGggYW4gZW1wdHkgb2JqZWN0XG5cbiAgICAgICAgdmFyIHVzZXJPcHRpb25zID0gYW5ndWxhci5mcm9tSnNvbigkY29udHJvbGxlci5iY0ZsaWNraXR5IHx8IHt9KTtcbiAgICAgICAgLy8gQ29tYmluZSB0aGUgdXNlciBvcHRpb25zIHdpdGggdGhlIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICAkY29udHJvbGxlci5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIEZsaWNraXR5Q29uZmlnLCB1c2VyT3B0aW9ucyk7XG5cbiAgICAgICAgLy8gSWYgbm8gSUQgd2FzIHBhc3NlZCBpblxuICAgICAgICBpZiAoISRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgb25lIGV4aXN0c1xuICAgICAgICAgICAgaWYgKCRhdHRycy5pZCkge1xuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9ICRhdHRycy5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc3QgTGlua1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBvc3RMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGBjcmVhdGUoKWAgZ2V0cyBwaWNrZWQgdXAgaW4gdGhlIG5leHQgZGlnZXN0IGN5Y2xlXG5cbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIEZsaWNraXR5XG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UuY3JlYXRlKCRlbGVtZW50WzBdLCAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQsICRjb250cm9sbGVyLm9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGZsaWNraXR5SW5zdGFuY2UpIHtcblxuICAgICAgICAgICAgICAgIC8vIEV4cG9zZSB0aGUgRmxpY2tpdHkgaW5zdGFuY2UgYW5kIElEXG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuRmxpY2tpdHkgPSBmbGlja2l0eUluc3RhbmNlLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9IGZsaWNraXR5SW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgZGlyZWN0aXZlIGlzIGJlaW5nIGRlc3Ryb3llZFxuICAgICAgICB2YXIgb25EZXN0cm95ID0gJHNjb3BlLiRvbignJGRlc3Ryb3knLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmRlc3Ryb3koJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qc1xuICoqLyIsIi8qIGdsb2JhbCBGbGlja2l0eSAqL1xuXG5leHBvcnQgZnVuY3Rpb24gRmxpY2tpdHlEaXJlY3RpdmUoXG4gICAgJHRpbWVvdXQsXG4gICAgRmxpY2tpdHlTZXJ2aWNlLFxuICAgIEZsaWNraXR5Q29uZmlnXG4pIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHk6ICdAPycsXG4gICAgICAgICAgICBiY0ZsaWNraXR5SWQ6ICdAPycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXG4gICAgICAgICAgICAgICAgcG9zdDogcG9zdExpbmtGdW5jdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6ICgpID0+IHt9LFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG5cblxuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gR2V0IHRoZSB1c2VyJ3Mgb3B0aW9ucyBvciBzdGFydCB3aXRoIGFuIGVtcHR5IG9iamVjdFxuICAgICAgICBjb25zdCB1c2VyT3B0aW9ucyA9IGFuZ3VsYXIuZnJvbUpzb24oJGNvbnRyb2xsZXIuYmNGbGlja2l0eSB8fCB7fSk7XG4gICAgICAgIC8vIENvbWJpbmUgdGhlIHVzZXIgb3B0aW9ucyB3aXRoIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAgICAgICAgJGNvbnRyb2xsZXIub3B0aW9ucyA9IGFuZ3VsYXIuZXh0ZW5kKHt9LCBGbGlja2l0eUNvbmZpZywgdXNlck9wdGlvbnMpO1xuXG4gICAgICAgIC8vIElmIG5vIElEIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgaWYgKCEkY29udHJvbGxlci5iY0ZsaWNraXR5SWQpIHtcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgZWxlbWVudCdzIElEIGlmIG9uZSBleGlzdHNcbiAgICAgICAgICAgIGlmICgkYXR0cnMuaWQpIHtcbiAgICAgICAgICAgICAgICAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQgPSAkYXR0cnMuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc3QgTGlua1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBvc3RMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGBjcmVhdGUoKWAgZ2V0cyBwaWNrZWQgdXAgaW4gdGhlIG5leHQgZGlnZXN0IGN5Y2xlXG4gICAgICAgICR0aW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBGbGlja2l0eVxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmNyZWF0ZSgkZWxlbWVudFswXSwgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkLCAkY29udHJvbGxlci5vcHRpb25zKVxuICAgICAgICAgICAgICAgIC50aGVuKChmbGlja2l0eUluc3RhbmNlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRXhwb3NlIHRoZSBGbGlja2l0eSBpbnN0YW5jZSBhbmQgSURcbiAgICAgICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuRmxpY2tpdHkgPSBmbGlja2l0eUluc3RhbmNlLmluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQgPSBmbGlja2l0eUluc3RhbmNlLmlkO1xuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIDtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBXaGVuIHRoZSBkaXJlY3RpdmUgaXMgYmVpbmcgZGVzdHJveWVkXG4gICAgICAgIGNvbnN0IG9uRGVzdHJveSA9ICRzY29wZS4kb24oJyRkZXN0cm95JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZGVzdHJveSB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5kZXN0cm95KCRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LmRpcmVjdGl2ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eU5leHREaXJlY3RpdmUgPSBGbGlja2l0eU5leHREaXJlY3RpdmU7XG5cbnZhciBfbmV4dCA9IHJlcXVpcmUoJy4vbmV4dC5jb250cm9sbGVyJyk7XG5cbmZ1bmN0aW9uIEZsaWNraXR5TmV4dERpcmVjdGl2ZSgkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSwgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZSkge1xuICAgICduZ0luamVjdCc7XG5cbiAgICB2YXIgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHlOZXh0OiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfbmV4dC5OZXh0Q29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICAvKipcbiAgICAgKiBQcmUgTGlua1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBJRFxuXG4gICAgICAgIHZhciBJRCA9ICRjb250cm9sbGVyLmZsaWNraXR5SWQ7XG5cbiAgICAgICAgLy8gRGVmaW5lIHRoZSBicm9hZGNhc3QgbmFtZXMgdG8gbGlzdGVuIGZvclxuICAgICAgICB2YXIgc2VsZWN0RXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpjZWxsU2VsZWN0JztcbiAgICAgICAgdmFyIHNldHRsZUV2ZW50ID0gJ0ZsaWNraXR5OicgKyBJRCArICc6c2V0dGxlJztcblxuICAgICAgICAvLyBMaXN0ZW5cbiAgICAgICAgdmFyIGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2UuY2VsbHMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2UuY2VsbHMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5uZXh0KCRjb250cm9sbGVyLmZsaWNraXR5SWQsICRjb250cm9sbGVyLndyYXBBcm91bmQpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzYWJsZSBidXR0b24gaWYgbmVlZGVkXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbmRleCwgY2VsbENvdW50KSB7XG5cbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IGNlbGxDb3VudCkge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qc1xuICoqLyIsImltcG9ydCB7IE5leHRDb250cm9sbGVyIH0gZnJvbSAnLi9uZXh0LmNvbnRyb2xsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gRmxpY2tpdHlOZXh0RGlyZWN0aXZlKFxuICAgICRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLFxuICAgIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2Vcbikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICBjb25zdCBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eU5leHQ6ICc9PycsXG4gICAgICAgICAgICBiY0ZsaWNraXR5SWQ6ICdAPycsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb24sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBOZXh0Q29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG5cblxuXG4gICAgLyoqXG4gICAgICogUHJlIExpbmtcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oXG4gICAgICAgICRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXJcbiAgICApIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG4gICAgICAgIGNvbnN0IElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIGNvbnN0IHNlbGVjdEV2ZW50ID0gYEZsaWNraXR5OiR7SUR9OmNlbGxTZWxlY3RgO1xuICAgICAgICBjb25zdCBzZXR0bGVFdmVudCA9IGBGbGlja2l0eToke0lEfTpzZXR0bGVgO1xuXG4gICAgICAgIC8vIExpc3RlblxuICAgICAgICBjb25zdCBjZWxsU2VsZWN0ID0gJHJvb3RTY29wZS4kb24oc2VsZWN0RXZlbnQsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChkYXRhLmluc3RhbmNlLmNlbGxzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2UuY2VsbHMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgY2VsbFxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLm5leHQoJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIud3JhcEFyb3VuZClcbiAgICAgICAgICAgICAgICAudGhlbigoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluZGV4LCBjZWxsQ291bnQpIHtcblxuICAgICAgICAgICAgLy8gRGlzYWJsZSBidXR0b24gaWYgYXQgdGhlIGJlZ2lubmluZyBhbmQgd2Ugc2hvdWxkbid0IHdyYXBcbiAgICAgICAgICAgIGlmICghJGNvbnRyb2xsZXIud3JhcEFyb3VuZCAmJiBpbmRleCA9PT0gY2VsbENvdW50KSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL25leHQvbmV4dC5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE5leHRDb250cm9sbGVyID0gZXhwb3J0cy5OZXh0Q29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOZXh0Q29udHJvbGxlcigkbG9nLCAkcSwgJHRpbWVvdXQsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTmV4dENvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKE5leHRDb250cm9sbGVyLCBbe1xuICAgICAgICBrZXk6ICdfYWN0aXZhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2FjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy8gQXNzaWduIHdyYXAgYXJvdW5kIG9yIGZhbGwgYmFjayB0byBhIGRlZmF1bHRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5iY0ZsaWNraXR5TmV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlOZXh0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICAgICAgdGhpcy5fc2V0SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0SWQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gX3RoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5GbGlja2l0eVNlcnZpY2UuZ2V0Rmlyc3QoKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiRsb2cud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTmV4dENvbnRyb2xsZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgTmV4dENvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICRsb2csICRxLCAkdGltZW91dCxcbiAgICAgICAgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZVxuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcblxuICAgIH1cblxuXG5cblxuICAgIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgLy8gQXNzaWduIHdyYXAgYXJvdW5kIG9yIGZhbGwgYmFjayB0byBhIGRlZmF1bHRcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJjRmxpY2tpdHlOZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5TmV4dDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICB0aGlzLl9zZXRJZCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmxpY2tpdHlJZFxuICAgICAqL1xuICAgIF9zZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gdGhpcy5iY0ZsaWNraXR5SWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kdGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGxvZy53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlID0gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZTtcblxudmFyIF9wcmV2aW91cyA9IHJlcXVpcmUoJy4vcHJldmlvdXMuY29udHJvbGxlcicpO1xuXG5mdW5jdGlvbiBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eVByZXZpb3VzOiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfcHJldmlvdXMuUHJldmlvdXNDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIC8qKlxuICAgICAqIFByZSBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG5cbiAgICAgICAgdmFyIElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIHZhciBzZWxlY3RFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOmNlbGxTZWxlY3QnO1xuICAgICAgICB2YXIgc2V0dGxlRXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpzZXR0bGUnO1xuXG4gICAgICAgIC8vIExpc3RlblxuICAgICAgICB2YXIgY2VsbFNlbGVjdCA9ICRyb290U2NvcGUuJG9uKHNlbGVjdEV2ZW50LCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UucHJldmlvdXMoJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIud3JhcEFyb3VuZCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluc3RhbmNlLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluZGV4KSB7XG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanNcbiAqKi8iLCJpbXBvcnQgeyBQcmV2aW91c0NvbnRyb2xsZXIgfSBmcm9tICcuL3ByZXZpb3VzLmNvbnRyb2xsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZShcbiAgICAkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSxcbiAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXG4pIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHlQcmV2aW91czogJz0/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IFByZXZpb3VzQ29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG5cbiAgICAvKipcbiAgICAgKiBQcmUgTGlua1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbihcbiAgICAgICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlclxuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcbiAgICAgICAgY29uc3QgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgY29uc3Qgc2VsZWN0RXZlbnQgPSBgRmxpY2tpdHk6JHtJRH06Y2VsbFNlbGVjdGA7XG4gICAgICAgIGNvbnN0IHNldHRsZUV2ZW50ID0gYEZsaWNraXR5OiR7SUR9OnNldHRsZWA7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIGNvbnN0IGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5wcmV2aW91cygkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKVxuICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluc3RhbmNlLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgpIHtcbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFByZXZpb3VzQ29udHJvbGxlciA9IGV4cG9ydHMuUHJldmlvdXNDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByZXZpb3VzQ29udHJvbGxlcigkbG9nLCAkcSwgJHRpbWVvdXQsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJldmlvdXNDb250cm9sbGVyKTtcblxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhQcmV2aW91c0NvbnRyb2xsZXIsIFt7XG4gICAgICAgIGtleTogJ19hY3RpdmF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAvLyBBc3NpZ24gd3JhcCBhcm91bmQgb3IgZmFsbCBiYWNrIHRvIGEgZGVmYXVsdFxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgICAgIHRoaXMuX3NldElkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfc2V0SWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3NldElkKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5iY0ZsaWNraXR5SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IF90aGlzLmJjRmxpY2tpdHlJZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kbG9nLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFByZXZpb3VzQ29udHJvbGxlcjtcbn0oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5jb250cm9sbGVyLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIFByZXZpb3VzQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgJGxvZywgJHEsICR0aW1lb3V0LFxuICAgICAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlDb25maWcgPSBGbGlja2l0eUNvbmZpZztcbiAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UgPSBGbGlja2l0eVNlcnZpY2U7XG5cblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgX2FjdGl2YXRlKCkge1xuICAgICAgICAvLyBBc3NpZ24gd3JhcCBhcm91bmQgb3IgZmFsbCBiYWNrIHRvIGEgZGVmYXVsdFxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYmNGbGlja2l0eVByZXZpb3VzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5UHJldmlvdXM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IG51bGw7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgdGhpcy5fc2V0SWQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldCBJRCB0byB3aGF0IGlzIGRlZmluZWQsIGZhbGxiYWNrIHRvIGZpcnN0IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcbiAgICAgKi9cbiAgICBfc2V0SWQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IHRoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZS5nZXRGaXJzdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRsb2cud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=