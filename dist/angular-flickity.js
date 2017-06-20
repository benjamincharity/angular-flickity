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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZDIwZDMyMWEzMzczZTlhOTI3MSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzPzFmMzkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5wcm92aWRlci5qcz8wMWY1Iiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzP2FkYTUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiRmxpY2tpdHlcIiIsIndlYnBhY2s6Ly8vLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9mbGlja2l0eS5kaXJlY3RpdmUuanM/ZjYyNCIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmRpcmVjdGl2ZS5qcz82NWFhIiwid2VicGFjazovLy8uL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanM/MDE5ZSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanM/ZDI0NSIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qcz9iOGY5Il0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJwcm92aWRlciIsInNlcnZpY2UiLCJkaXJlY3RpdmUiLCJGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyIiwiYWNjZXNzaWJpbGl0eSIsImNlbGxBbGlnbiIsImZyZWVTY3JvbGxGcmljdGlvbiIsImZyaWN0aW9uIiwicGVyY2VudFBvc2l0aW9uIiwicmVzaXplIiwic2VsZWN0ZWRBdHRyYWN0aW9uIiwic2V0R2FsbGVyeVNpemUiLCIkdGltZW91dCIsIiRxIiwiJHJvb3RTY29wZSIsIiRsb2ciLCJpbnN0YW5jZXMiLCJlbGVtZW50IiwiaWQiLCJvcHRpb25zIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJsZW5ndGgiLCJfZmluZE9iamVjdEJ5SWQiLCJpbmRleCIsIl9nZXRGbGlja2l0eUluZGV4IiwiZXJyb3IiLCJpbnN0YW5jZSIsInB1c2giLCJfYmluZEV2ZW50cyIsInRoZW4iLCJmbGlja2l0eUluZGV4IiwiZGVzdHJveSIsInNwbGljZSIsImlzV3JhcHBlZCIsImlzSW5zdGFudCIsIm5leHQiLCJwcmV2aW91cyIsInNlbGVjdCIsInZhbHVlIiwic2VsZWN0Q2VsbCIsInNlbGVjdGVkSW5kZXgiLCJyZXBvc2l0aW9uIiwicmVsb2FkQ2VsbHMiLCJkYXRhIiwiZWxlbWVudHMiLCJwcmVwZW5kIiwiYXBwZW5kIiwiaW5zZXJ0IiwiZ2V0Q2VsbEVsZW1lbnRzIiwicmVtb3ZlIiwic2VsZWN0ZWRFbGVtZW50IiwiY2VsbHMiLCJmb3VuZEluZGV4IiwiZm9yRWFjaCIsIklEIiwib24iLCIkZW1pdCIsInByb2dyZXNzIiwicG9zaXRpb25YIiwiZXZlbnQiLCJwb2ludGVyIiwibW92ZVZlY3RvciIsImNlbGxFbGVtZW50IiwiY2VsbEluZGV4Iiwic291cmNlIiwiZmlsdGVyIiwib2JqZWN0IiwiRmxpY2tpdHlEaXJlY3RpdmUiLCJGbGlja2l0eVNlcnZpY2UiLCJGbGlja2l0eUNvbmZpZyIsInJlc3RyaWN0Iiwic2NvcGUiLCJiaW5kVG9Db250cm9sbGVyIiwiYmNGbGlja2l0eSIsImJjRmxpY2tpdHlJZCIsImNvbXBpbGUiLCJwcmUiLCJwcmVMaW5rRnVuY3Rpb24iLCJwb3N0IiwicG9zdExpbmtGdW5jdGlvbiIsImNvbnRyb2xsZXIiLCJjb250cm9sbGVyQXMiLCIkc2NvcGUiLCIkZWxlbWVudCIsIiRhdHRycyIsIiRjb250cm9sbGVyIiwidXNlck9wdGlvbnMiLCJmcm9tSnNvbiIsImV4dGVuZCIsImNyZWF0ZSIsImZsaWNraXR5SW5zdGFuY2UiLCJGbGlja2l0eSIsIm9uRGVzdHJveSIsIiRvbiIsIkZsaWNraXR5TmV4dERpcmVjdGl2ZSIsImJjRmxpY2tpdHlOZXh0IiwiZmxpY2tpdHlJZCIsInNlbGVjdEV2ZW50Iiwic2V0dGxlRXZlbnQiLCJjZWxsU2VsZWN0IiwiX2Rpc2FibGVCdXR0b25JZk5lZWRlZCIsInNsaWRlcyIsInNldHRsZSIsIndyYXBBcm91bmQiLCJjZWxsQ291bnQiLCIkc2V0IiwiX2FjdGl2YXRlIiwiX3NldElkIiwiZ2V0Rmlyc3QiLCJjYXRjaCIsIndhcm4iLCJGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlIiwiYmNGbGlja2l0eVByZXZpb3VzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FDQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUFBLFNBQVFDLE9BQU8sZUFBZSxJQUN6QkMsU0FBUyxrQkFEZCxrQ0FFS0MsUUFBUSxtQkFGYiw0QkFHS0MsVUFBVSxjQUhmLDhCQUlLQSxVQUFVLGtCQUpmLDZCQUtLQSxVQUFVLHNCQUxmLHFDOzs7Ozs7QUNOQTs7QUFFQSxRQUFPLGVB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QUU5QztLQ1I5RCw0QkFDSTVGLE1BQU1GLElBQUlELFVBQ1YyRCxnQkFBZ0JELGlCQUNsQjtTQUNFOztTQURGOztTQUdFLEtBQUt2RCxPQUFPQTtTQUNaLEtBQUtGLEtBQUtBO1NBQ1YsS0FBS0QsV0FBV0E7U0FDaEIsS0FBSzJELGlCQUFpQkE7U0FDdEIsS0FBS0Qsa0JBQWtCQTs7U0FHdkIsS0FBS3NDOzs7S0RVVCxhQUFhLG9CQUFvQixDQUFDO1NBQzlCLEtBQUs7U0FDTCxPQUFPLFNBQVMsWUNMUjs7YUFFUixJQUFJLE9BQU8sS0FBS00sdUJBQXVCLGFBQWE7aUJBQ2hELEtBQUtULGFBQWEsS0FBS1M7b0JBQ3BCLElBQUksT0FBTyxLQUFLM0MsZUFBZWtDLGVBQWUsYUFBYTtpQkFDOUQsS0FBS0EsYUFBYSxLQUFLbEMsZUFBZWtDO29CQUNuQztpQkFDSCxLQUFLQSxhQUFhOzthQUV0QixLQUFLUCxhQUFhOzs7YUFHbEIsS0FBS1c7Ozs7Ozs7OztRRGNOO1NBQ0MsS0FBSztTQUNMLE9BQU8sU0FBUyxTQ1BYO2FBQUE7O2FBQ0wsT0FBTyxJQUFJekYsUUFBUSxVQUFDQyxTQUFTQyxRQUFXO2lCQUNwQyxNQUFLVixTQUFTLFlBQU07O3FCQUVoQixJQUFJLE1BQUtnRSxjQUFjO3lCQUNuQixNQUFLc0IsYUFBYSxNQUFLdEI7eUJBQ3ZCLE9BQU92RCxRQUFRLE1BQUs2RTs0QkFDakI7eUJBQ0gsTUFBS3RGLFNBQVMsWUFBTTs2QkFDaEIsTUFBSzBELGdCQUFnQndDLFdBQ2hCL0UsS0FBSyxVQUFDSCxVQUFhO2lDQUNoQixNQUFLc0UsYUFBYXRFLFNBQVNWO2lDQUMzQixPQUFPRyxRQUFRLE1BQUs2RTtnQ0FFdkJhLE1BQU0sVUFBQ3BGLE9BQVU7aUNBQ2QsTUFBS1osS0FBS2lHLEtBQUtyRjtpQ0FDZixPQUFPTCxPQUFPSzs7Ozs7Ozs7O0tEZ0IxQyxPQUFPIiwiZmlsZSI6ImFuZ3VsYXItZmxpY2tpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJGbGlja2l0eVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcImFuZ3VsYXItZmxpY2tpdHlcIiwgW1wiRmxpY2tpdHlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiYW5ndWxhci1mbGlja2l0eVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIkZsaWNraXR5XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhbmd1bGFyLWZsaWNraXR5XCJdID0gZmFjdG9yeShyb290W1wiRmxpY2tpdHlcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGFkMjBkMzIxYTMzNzNlOWE5MjcxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ZsaWNraXR5ID0gcmVxdWlyZSgnLi9mbGlja2l0eS5wcm92aWRlcicpO1xuXG52YXIgX2ZsaWNraXR5MiA9IHJlcXVpcmUoJy4vZmxpY2tpdHkuc2VydmljZScpO1xuXG52YXIgX2ZsaWNraXR5MyA9IHJlcXVpcmUoJy4vZmxpY2tpdHkuZGlyZWN0aXZlJyk7XG5cbnZhciBfbmV4dCA9IHJlcXVpcmUoJy4vbmV4dC9uZXh0LmRpcmVjdGl2ZScpO1xuXG52YXIgX3ByZXZpb3VzID0gcmVxdWlyZSgnLi9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUnKTtcblxuYW5ndWxhci5tb2R1bGUoJ2JjLkZsaWNraXR5JywgW10pLnByb3ZpZGVyKCdGbGlja2l0eUNvbmZpZycsIF9mbGlja2l0eS5GbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKS5zZXJ2aWNlKCdGbGlja2l0eVNlcnZpY2UnLCBfZmxpY2tpdHkyLkZsaWNraXR5U2VydmljZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5JywgX2ZsaWNraXR5My5GbGlja2l0eURpcmVjdGl2ZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5TmV4dCcsIF9uZXh0LkZsaWNraXR5TmV4dERpcmVjdGl2ZSkuZGlyZWN0aXZlKCdiY0ZsaWNraXR5UHJldmlvdXMnLCBfcHJldmlvdXMuRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgeyBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyIH0gZnJvbSAnLi9mbGlja2l0eS5wcm92aWRlcidcbmltcG9ydCB7IEZsaWNraXR5U2VydmljZSB9IGZyb20gJy4vZmxpY2tpdHkuc2VydmljZSc7XG5pbXBvcnQgeyBGbGlja2l0eURpcmVjdGl2ZSB9IGZyb20gJy4vZmxpY2tpdHkuZGlyZWN0aXZlJztcbmltcG9ydCB7IEZsaWNraXR5TmV4dERpcmVjdGl2ZSB9IGZyb20gJy4vbmV4dC9uZXh0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlIH0gZnJvbSAnLi9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYmMuRmxpY2tpdHknLCBbXSlcbiAgICAucHJvdmlkZXIoJ0ZsaWNraXR5Q29uZmlnJywgRmxpY2tpdHlDb25maWdQcm92aWRlcilcbiAgICAuc2VydmljZSgnRmxpY2tpdHlTZXJ2aWNlJywgRmxpY2tpdHlTZXJ2aWNlKVxuICAgIC5kaXJlY3RpdmUoJ2JjRmxpY2tpdHknLCBGbGlja2l0eURpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKCdiY0ZsaWNraXR5TmV4dCcsIEZsaWNraXR5TmV4dERpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKCdiY0ZsaWNraXR5UHJldmlvdXMnLCBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKVxuO1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmxpY2tpdHlDb25maWdQcm92aWRlciA9IGV4cG9ydHMuRmxpY2tpdHlDb25maWdQcm92aWRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGbGlja2l0eUNvbmZpZ1Byb3ZpZGVyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmxpY2tpdHlDb25maWdQcm92aWRlcik7XG5cbiAgICAgICAgLy8gRGVmaW5lIEZsaWNraXR5IGRlZmF1bHRzXG4gICAgICAgIHRoaXMuYWNjZXNzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgIHRoaXMuY2VsbEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgIHRoaXMuZnJlZVNjcm9sbEZyaWN0aW9uID0gLjA3NTtcbiAgICAgICAgdGhpcy5mcmljdGlvbiA9IC4yODtcbiAgICAgICAgdGhpcy5wZXJjZW50UG9zaXRpb24gPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc2l6ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBdHRyYWN0aW9uID0gLjAyNTtcbiAgICAgICAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEZsaWNraXR5Q29uZmlnUHJvdmlkZXIsIFt7XG4gICAgICAgIGtleTogJyRnZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gJGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEZsaWNraXR5Q29uZmlnUHJvdmlkZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkucHJvdmlkZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgRmxpY2tpdHlDb25maWdQcm92aWRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy8gRGVmaW5lIEZsaWNraXR5IGRlZmF1bHRzXG4gICAgICAgIHRoaXMuYWNjZXNzaWJpbGl0eSAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jZWxsQWxpZ24gICAgICAgICAgPSAnY2VudGVyJztcbiAgICAgICAgdGhpcy5mcmVlU2Nyb2xsRnJpY3Rpb24gPSAuMDc1O1xuICAgICAgICB0aGlzLmZyaWN0aW9uICAgICAgICAgICA9IC4yODtcbiAgICAgICAgdGhpcy5wZXJjZW50UG9zaXRpb24gICAgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlc2l6ZSAgICAgICAgICAgICA9IHRydWU7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRBdHRyYWN0aW9uID0gLjAyNTtcbiAgICAgICAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSAgICAgPSB0cnVlO1xuICAgIH1cblxuXG5cblxuICAgICRnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL2ZsaWNraXR5LnByb3ZpZGVyLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZsaWNraXR5U2VydmljZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9mbGlja2l0eSA9IHJlcXVpcmUoJ2ZsaWNraXR5Jyk7XG5cbnZhciBfZmxpY2tpdHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZmxpY2tpdHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmxpY2tpdHlTZXJ2aWNlID0gZXhwb3J0cy5GbGlja2l0eVNlcnZpY2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRmxpY2tpdHlTZXJ2aWNlKCR0aW1lb3V0LCAkcSwgJHJvb3RTY29wZSwgJGxvZykge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGbGlja2l0eVNlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IEZsaWNraXR5IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKEZsaWNraXR5U2VydmljZSwgW3tcbiAgICAgICAga2V5OiAnY3JlYXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZShlbGVtZW50LCBpZCwgb3B0aW9ucykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgICAgICAgICAgaWYgKCFpZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgaXQgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA9IGVsZW1lbnQuaWQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UsIGFzc2lnbiBhIG5ldyBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQgPSBfdGhpcy5pbnN0YW5jZXMubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgSUQgaXMgYWxyZWFkeSBpbiB1c2VcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuX2ZpbmRPYmplY3RCeUlkKF90aGlzLmluc3RhbmNlcywgaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IF90aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy5lcnJvcignVGhpcyBJRCBpcyBhbHJlYWR5IGluIHVzZTogJywgX3RoaXMuaW5zdGFuY2VzW2luZGV4XSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCdUaGlzIElEIGlzIGFscmVhZHkgaW4gdXNlLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERlZmluZSB0aGUgbmV3IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgIGluc3RhbmNlOiBuZXcgX2ZsaWNraXR5Mi5kZWZhdWx0KGVsZW1lbnQsIG9wdGlvbnMpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIFNhdmUgdGhpcyBpbnN0YW5jZSB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgICAgICBfdGhpcy5pbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBCaW5kIHRvIGFsbCBldmVudHNcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuX2JpbmRFdmVudHMoaWQpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXN0cm95IGEgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveShpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczIuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIERlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAgICAgICAgX3RoaXMyLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5kZXN0cm95KCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGluc3RhbmNlIGZyb20gdGhlIGFycmF5XG4gICAgICAgICAgICAgICAgX3RoaXMyLmluc3RhbmNlcy5zcGxpY2UoZmxpY2tpdHlJbmRleCwgMSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgnSW5zdGFuY2UgJyArIGlkICsgJyBkZXN0cm95ZWQuJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gYWxsIGluc3RhbmNlc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX0gaW5zdGFuY2VzXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRBbGwnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0QWxsKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMzLmluc3RhbmNlcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb3ZlIHRvIHRoZSBuZXh0IHNsaWRlXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICduZXh0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG5leHQoaWQsIGlzV3JhcHBlZCwgaXNJbnN0YW50KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczQuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm5leHQoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTW92ZSB0byB0aGUgcHJldmlvdXMgc2xpZGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNJbnN0YW50XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXZpb3VzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHByZXZpb3VzKGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczUuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIHByZXZpb3VzIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgIF90aGlzNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJldmlvdXMoaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM1Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2VsZWN0IGEgc2xpZGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXhcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2VsZWN0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdChpZCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgaXNXcmFwcGVkID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgICAgICAgICAgIHZhciBpc0luc3RhbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IGZhbHNlO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXM2Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxuICAgICAgICAgICAgICAgICAgICBfdGhpczYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdChpbmRleCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXM2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2VsZWN0IGEgc2xpZGUgb2YgYSBjZWxsXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0ge0ludGVnZXJ8U3RyaW5nfSB2YWx1ZVxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzV3JhcHBlZFxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZWxlY3RDZWxsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNlbGVjdENlbGwoaWQsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGlzV3JhcHBlZCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG4gICAgICAgICAgICB2YXIgaXNJbnN0YW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzNy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM3Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RDZWxsKHZhbHVlLCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczcuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnQgc2xpZGUgaW5kZXhcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IHNlbGVjdGVkSW5kZXhcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdGVkSW5kZXgnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2VsZWN0ZWRJbmRleChpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczguX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY3VycmVudCBpbmRleFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc2l6ZSB0aGUgZ2FsbGVyeSBhbmQgcmUtcG9zaXRpb24gY2VsbHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZXNpemUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVzaXplKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM5ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzOS5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciB0aGUgcmVzaXplXG4gICAgICAgICAgICAgICAgICAgIF90aGlzOS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVzaXplKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczkuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQb3NpdGlvbiBjZWxscyBhdCBzZWxlY3RlZCBwb3NpdGlvbi5cbiAgICAgICAgICogVHJpZ2dlciByZXBvc2l0aW9uIGFmdGVyIHRoZSBzaXplIG9mIGEgY2VsbCBoYXMgYmVlbiBjaGFuZ2VkLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVwb3NpdGlvbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXBvc2l0aW9uKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczEwLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSByZXBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIF90aGlzMTAuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlcG9zaXRpb24oKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTAuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZS1jb2xsZWN0IGFsbCBjZWxsIGVsZW1lbnRzIGluIGBmbGlja2l0eS1zbGlkZXJgLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVsb2FkQ2VsbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVsb2FkQ2VsbHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczExID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTEuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbG9hZCBjZWxsc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczExLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZWxvYWRDZWxscygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBhIEZsaWNraXR5IGluc3RhbmNlIGJ5IElEXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0KGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczEyLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTIuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGZpcnN0IEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEZpcnN0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEZpcnN0KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGlmICghX3RoaXMxMy5pbnN0YW5jZXMgfHwgX3RoaXMxMy5pbnN0YW5jZXMubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdObyBpbnN0YW5jZXMgZXhpc3QuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczEzLmluc3RhbmNlc1swXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0QnlFbGVtZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEJ5RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IF9mbGlja2l0eTIuZGVmYXVsdC5kYXRhKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoaW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlIG5vdCBmb3VuZCBmb3IgJyArIGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByZXBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBnYWxsZXJ5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3ByZXBlbmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcHJlcGVuZChpZCwgZWxlbWVudHMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE0ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTQuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFByZXBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE0Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5wcmVwZW5kKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTQuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcHBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgZW5kIG9mIHRoZSBnYWxsZXJ5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FwcGVuZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBlbmQoaWQsIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNSA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE1Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE1Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5hcHBlbmQoZWxlbWVudHMpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMxNS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydCBlbGVtZW50cyBpbnRvIHRoZSBnYWxsZXJ5IGFuZCBjcmVhdGUgY2VsbHMgYXQgdGhlIGRlc2lyZWQgaW5kZXguXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgICAgICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIFplcm8gYmFzZWQgaW5kZXhcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaW5zZXJ0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluc2VydChpZCwgZWxlbWVudHMsIGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMxNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGZsaWNraXR5SW5kZXggPSBfdGhpczE2Ll9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KCdJbnN0YW5jZSAnICsgaWQgKyAnIG5vdCBmb3VuZC4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBJbnNlcnQgdGhlIHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICBfdGhpczE2Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5pbnNlcnQoZWxlbWVudHMsIGluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTYuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGVsZW1lbnRzIG9mIHRoZSBjZWxsc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGNlbGxFbGVtZW50c1xuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Q2VsbEVsZW1lbnRzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldENlbGxFbGVtZW50cyhpZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTcgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxNy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheSBvZiBjZWxsIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTcuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmdldENlbGxFbGVtZW50cygpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgY2VsbHMgYnkgZWxlbWVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RWxlbWVudH0gZWxlbWVudChzKVxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW1vdmUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGlkLCBlbGVtZW50cykge1xuICAgICAgICAgICAgdmFyIF90aGlzMTggPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHZhciBmbGlja2l0eUluZGV4ID0gX3RoaXMxOC5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdCgnSW5zdGFuY2UgJyArIGlkICsgJyBub3QgZm91bmQuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMxOC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucmVtb3ZlKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzMTguaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBjZWxsIGVsZW1lbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0VsZW1lbnR9IHNlbGVjdGVkQ2VsbEVsZW1lbnRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NlbGVjdGVkRWxlbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RlZEVsZW1lbnQoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczE5ID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMTkuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VsZWN0ZWQgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpczE5Lmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBhbiBhcnJheSBvZiBhbGwgY2VsbHNcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsc1xuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2VsbHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2VsbHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIwID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMjAuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlICcgKyBpZCArICcgbm90IGZvdW5kLicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgYXJyYXkgb2YgY2VsbHNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMyMC5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuY2VsbHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gSGVscGVyIG1ldGhvZHNcbiAgICAgICAgLy9cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaW5kIHRoZSBpbmRleCBmb3IgYSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7SW50ZWdlcn0gZmxpY2tpdHlJbmRleFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldEZsaWNraXR5SW5kZXgnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldEZsaWNraXR5SW5kZXgoaWQpIHtcbiAgICAgICAgICAgIHZhciBmb3VuZEluZGV4ID0gLTE7XG5cbiAgICAgICAgICAgIC8vIFZlcmlmeSBhdCBsZWFzdCBvbmUgaW5zdGFuY2UgZXhpc3RzXG4gICAgICAgICAgICBpZiAodGhpcy5pbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgdGhlIElEIG9mIGVhY2ggaW5zdGFuY2VcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0YW5jZSwgaW5kZXgpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBpdCBtYXRjaGVzIG91ciBJRCwgc2V0IHRoZSBpbmRleFxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2UuaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEluZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZvdW5kSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQmluZCBhbGwgZXZlbnRzIGZvciBhIG5ldyBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgICAgICogQHJldHVybiB7Qm9vbH0gaXNGaW5pc2hlZFxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2JpbmRFdmVudHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2JpbmRFdmVudHMoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIxID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmxpY2tpdHlJbmRleCA9IF90aGlzMjEuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgSUQgPSBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pZDtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzZWxlY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpzZWxlY3QnLCBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2V0dGxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6c2V0dGxlJywgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3Njcm9sbCcsIGZ1bmN0aW9uIChwcm9ncmVzcywgcG9zaXRpb25YKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzMjEuJHJvb3RTY29wZS4kZW1pdCgnRmxpY2tpdHk6JyArIElEICsgJzpzY3JvbGwnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblg6IHBvc2l0aW9uWFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOmRyYWdTdGFydCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ01vdmUnLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOmRyYWdNb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3I6IG1vdmVWZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ0VuZCcsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6ZHJhZ0VuZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlckRvd24nLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnBvaW50ZXJEb3duJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyTW92ZScsIGZ1bmN0aW9uIChldmVudCwgcG9pbnRlciwgbW92ZVZlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6cG9pbnRlck1vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIF90aGlzMjEuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyVXAnLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnBvaW50ZXJVcCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBfdGhpczIxLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc3RhdGljQ2xpY2snLCBmdW5jdGlvbiAoZXZlbnQsIHBvaW50ZXIsIGNlbGxFbGVtZW50LCBjZWxsSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMyMS4kcm9vdFNjb3BlLiRlbWl0KCdGbGlja2l0eTonICsgSUQgKyAnOnN0YXRpY0NsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxJbmRleDogY2VsbEluZGV4XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgX3RoaXMyMS5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2xhenlMb2FkJywgZnVuY3Rpb24gKGV2ZW50LCBjZWxsRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpczIxLiRyb290U2NvcGUuJGVtaXQoJ0ZsaWNraXR5OicgKyBJRCArICc6bGF6eUxvYWQnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsRWxlbWVudDogY2VsbEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpbmQgYW4gb2JqZWN0IHdpdGhpbiBhbiBhcnJheSBieSBJRFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBzb3VyY2VcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gbWF0Y2hcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19maW5kT2JqZWN0QnlJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZmluZE9iamVjdEJ5SWQoc291cmNlLCBpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZS5maWx0ZXIoZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3QuaWQgPT09IGlkO1xuICAgICAgICAgICAgfSlbMF07XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRmxpY2tpdHlTZXJ2aWNlO1xufSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2ZsaWNraXR5LnNlcnZpY2UuanNcbiAqKi8iLCJpbXBvcnQgZmxpY2tpdHkgZnJvbSAnZmxpY2tpdHknO1xuXG5leHBvcnQgY2xhc3MgRmxpY2tpdHlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICAkdGltZW91dCwgJHEsICRyb290U2NvcGUsICRsb2dcbiAgICApIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcblxuICAgICAgICB0aGlzLmluc3RhbmNlcyA9IFtdO1xuXG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IEZsaWNraXR5IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBjcmVhdGUoZWxlbWVudCwgaWQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIC8vIElmIG5vIElEIHdhcyBwYXNzZWQgaW5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5pZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBpdCBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBlbGVtZW50LmlkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSwgYXNzaWduIGEgbmV3IElEXG4gICAgICAgICAgICAgICAgICAgIGlkID0gdGhpcy5pbnN0YW5jZXMubGVuZ3RoICsgMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgSUQgaXMgYWxyZWFkeSBpbiB1c2VcbiAgICAgICAgICAgIGlmICh0aGlzLl9maW5kT2JqZWN0QnlJZCh0aGlzLmluc3RhbmNlcywgaWQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRsb2cuZXJyb3IoYFRoaXMgSUQgaXMgYWxyZWFkeSBpbiB1c2U6IGAsIHRoaXMuaW5zdGFuY2VzW2luZGV4XSk7XG5cbiAgICAgICAgICAgICAgICByZWplY3QoYFRoaXMgSUQgaXMgYWxyZWFkeSBpbiB1c2UuYCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIERlZmluZSB0aGUgbmV3IGluc3RhbmNlXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgaW5zdGFuY2U6IG5ldyBmbGlja2l0eShlbGVtZW50LCBvcHRpb25zKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIFNhdmUgdGhpcyBpbnN0YW5jZSB0byB0aGUgYXJyYXlcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xuXG4gICAgICAgICAgICAvLyBCaW5kIHRvIGFsbCBldmVudHNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iaW5kRXZlbnRzKGlkKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IGEgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBkZXN0cm95KGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRGVzdHJveSB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLmRlc3Ryb3koKTtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbnN0YW5jZSBmcm9tIHRoZSBhcnJheVxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMuc3BsaWNlKGZsaWNraXR5SW5kZXgsIDEpO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgnSW5zdGFuY2UgJyArIGlkICsgJyBkZXN0cm95ZWQuJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGFsbCBpbnN0YW5jZXNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBpbnN0YW5jZXNcbiAgICAgKi9cbiAgICBnZXRBbGwoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLmluc3RhbmNlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTW92ZSB0byB0aGUgbmV4dCBzbGlkZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBuZXh0KGlkLCBpc1dyYXBwZWQsIGlzSW5zdGFudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgc2xpZGVcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5uZXh0KGlzV3JhcHBlZCwgaXNJbnN0YW50KTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogTW92ZSB0byB0aGUgcHJldmlvdXMgc2xpZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7Qm9vbH0gaXNXcmFwcGVkXG4gICAgICogQHBhcmFtIHtCb29sfSBpc0luc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgcHJldmlvdXMoaWQsIGlzV3JhcHBlZCwgaXNJbnN0YW50KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgcHJldmlvdXMgc2xpZGVcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5wcmV2aW91cyhpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCBhIHNsaWRlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZWxlY3QoaWQsIGluZGV4LCBpc1dyYXBwZWQgPSBmYWxzZSwgaXNJbnN0YW50ID0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBzZWxlY3RlZCBzbGlkZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdChpbmRleCwgaXNXcmFwcGVkLCBpc0luc3RhbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgYSBzbGlkZSBvZiBhIGNlbGxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcnxTdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sfSBpc1dyYXBwZWRcbiAgICAgKiBAcGFyYW0ge0Jvb2x9IGlzSW5zdGFudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZWxlY3RDZWxsKGlkLCB2YWx1ZSwgaXNXcmFwcGVkID0gZmFsc2UsIGlzSW5zdGFudCA9IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgc2VsZWN0ZWQgc2xpZGVcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RDZWxsKHZhbHVlLCBpc1dyYXBwZWQsIGlzSW5zdGFudCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBzbGlkZSBpbmRleFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7SW50ZWdlcn0gc2VsZWN0ZWRJbmRleFxuICAgICAqL1xuICAgIHNlbGVjdGVkSW5kZXgoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgdGhlIGdhbGxlcnkgYW5kIHJlLXBvc2l0aW9uIGNlbGxzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHJlc2l6ZShpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlc2l6ZVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlc2l6ZSgpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQb3NpdGlvbiBjZWxscyBhdCBzZWxlY3RlZCBwb3NpdGlvbi5cbiAgICAgKiBUcmlnZ2VyIHJlcG9zaXRpb24gYWZ0ZXIgdGhlIHNpemUgb2YgYSBjZWxsIGhhcyBiZWVuIGNoYW5nZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgcmVwb3NpdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgdGhlIHJlcG9zaXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZXBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFJlLWNvbGxlY3QgYWxsIGNlbGwgZWxlbWVudHMgaW4gYGZsaWNraXR5LXNsaWRlcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgcmVsb2FkQ2VsbHMoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZWxvYWQgY2VsbHNcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5yZWxvYWRDZWxscygpO1xuXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBGbGlja2l0eSBpbnN0YW5jZSBieSBJRFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldChpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBmaXJzdCBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGdldEZpcnN0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmluc3RhbmNlcyB8fCB0aGlzLmluc3RhbmNlcy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgTm8gaW5zdGFuY2VzIGV4aXN0LmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgRmxpY2tpdHkgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBnZXRCeUVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBmbGlja2l0eS5kYXRhKGVsZW1lbnQpXG5cbiAgICAgICAgICAgIGlmIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShpbnN0YW5jZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoJ0luc3RhbmNlIG5vdCBmb3VuZCBmb3IgJyArIGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFByZXBlbmQgZWxlbWVudHMgYW5kIGNyZWF0ZSBjZWxscyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBnYWxsZXJ5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHsqfSBlbGVtZW50KHMpIC0galF1ZXJ5IG9iamVjdCwgQXJyYXkgb2YgRWxlbWVudHMsIEVsZW1lbnQsIG9yIE5vZGVMaXN0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHByZXBlbmQoaWQsIGVsZW1lbnRzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUHJlcGVuZCB0aGUgc2xpZGVzXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UucHJlcGVuZChlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCBlbGVtZW50cyBhbmQgY3JlYXRlIGNlbGxzIHRvIHRoZSBlbmQgb2YgdGhlIGdhbGxlcnkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0geyp9IGVsZW1lbnQocykgLSBqUXVlcnkgb2JqZWN0LCBBcnJheSBvZiBFbGVtZW50cywgRWxlbWVudCwgb3IgTm9kZUxpc3RcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgYXBwZW5kKGlkLCBlbGVtZW50cykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgc2xpZGVzXG4gICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuYXBwZW5kKGVsZW1lbnRzKTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0IGVsZW1lbnRzIGludG8gdGhlIGdhbGxlcnkgYW5kIGNyZWF0ZSBjZWxscyBhdCB0aGUgZGVzaXJlZCBpbmRleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7Kn0gZWxlbWVudChzKSAtIGpRdWVyeSBvYmplY3QsIEFycmF5IG9mIEVsZW1lbnRzLCBFbGVtZW50LCBvciBOb2RlTGlzdFxuICAgICAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBaZXJvIGJhc2VkIGluZGV4XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZVxuICAgICAqL1xuICAgIGluc2VydChpZCwgZWxlbWVudHMsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoYEluc3RhbmNlICR7aWR9IG5vdCBmb3VuZC5gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBzbGlkZXNcbiAgICAgICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5pbnNlcnQoZWxlbWVudHMsIGluZGV4KTtcblxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBlbGVtZW50cyBvZiB0aGUgY2VsbHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBjZWxsRWxlbWVudHNcbiAgICAgKi9cbiAgICBnZXRDZWxsRWxlbWVudHMoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGwgZWxlbWVudHNcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5nZXRDZWxsRWxlbWVudHMoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGNlbGxzIGJ5IGVsZW1lbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEVsZW1lbnR9IGVsZW1lbnQocylcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlXG4gICAgICovXG4gICAgcmVtb3ZlKGlkLCBlbGVtZW50cykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnJlbW92ZShlbGVtZW50cyk7XG5cbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGNlbGwgZWxlbWVudFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7RWxlbWVudH0gc2VsZWN0ZWRDZWxsRWxlbWVudFxuICAgICAqL1xuICAgIHNlbGVjdGVkRWxlbWVudChpZCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxpY2tpdHlJbmRleCA9IHRoaXMuX2dldEZsaWNraXR5SW5kZXgoaWQpO1xuXG4gICAgICAgICAgICBpZiAoZmxpY2tpdHlJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGBJbnN0YW5jZSAke2lkfSBub3QgZm91bmQuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VsZWN0ZWQgZWxlbWVudFxuICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLnNlbGVjdGVkRWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogR2V0IGFuIGFycmF5IG9mIGFsbCBjZWxsc1xuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7QXJyYXl9IGNlbGxzXG4gICAgICovXG4gICAgY2VsbHMoaWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZsaWNraXR5SW5kZXggPSB0aGlzLl9nZXRGbGlja2l0eUluZGV4KGlkKTtcblxuICAgICAgICAgICAgaWYgKGZsaWNraXR5SW5kZXggPCAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChgSW5zdGFuY2UgJHtpZH0gbm90IGZvdW5kLmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5IG9mIGNlbGxzXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2UuY2VsbHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG4gICAgLy9cbiAgICAvLyBIZWxwZXIgbWV0aG9kc1xuICAgIC8vXG5cblxuICAgIC8qKlxuICAgICAqIEZpbmQgdGhlIGluZGV4IGZvciBhIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSBmbGlja2l0eUluZGV4XG4gICAgICovXG4gICAgX2dldEZsaWNraXR5SW5kZXgoaWQpIHtcbiAgICAgICAgbGV0IGZvdW5kSW5kZXggPSAtMTtcblxuICAgICAgICAvLyBWZXJpZnkgYXQgbGVhc3Qgb25lIGluc3RhbmNlIGV4aXN0c1xuICAgICAgICBpZiAodGhpcy5pbnN0YW5jZXMubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAvLyBDaGVjayB0aGUgSUQgb2YgZWFjaCBpbnN0YW5jZVxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXMuZm9yRWFjaCgoaW5zdGFuY2UsIGluZGV4KSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiBpdCBtYXRjaGVzIG91ciBJRCwgc2V0IHRoZSBpbmRleFxuICAgICAgICAgICAgICAgIGlmIChpbnN0YW5jZS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmRJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmb3VuZEluZGV4O1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQmluZCBhbGwgZXZlbnRzIGZvciBhIG5ldyBpbnN0YW5jZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybiB7Qm9vbH0gaXNGaW5pc2hlZFxuICAgICAqL1xuICAgIF9iaW5kRXZlbnRzKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbGlja2l0eUluZGV4ID0gdGhpcy5fZ2V0RmxpY2tpdHlJbmRleChpZCk7XG5cbiAgICAgICAgICAgIGlmIChmbGlja2l0eUluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgSUQgPSB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pZDtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3NlbGVjdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnNlbGVjdGAsIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignc2V0dGxlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06c2V0dGxlYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdzY3JvbGwnLCAocHJvZ3Jlc3MsIHBvc2l0aW9uWCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06c2Nyb2xsYCwge1xuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uWDogcG9zaXRpb25YLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnU3RhcnQnLCAoZXZlbnQsIHBvaW50ZXIpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OmRyYWdTdGFydGAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdkcmFnTW92ZScsIChldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06ZHJhZ01vdmVgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICAgICAgbW92ZVZlY3RvcjogbW92ZVZlY3RvcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbignZHJhZ0VuZCcsIChldmVudCwgcG9pbnRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06ZHJhZ0VuZGAsIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBwb2ludGVyOiBwb2ludGVyLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2VzW2ZsaWNraXR5SW5kZXhdLmluc3RhbmNlLm9uKCdwb2ludGVyRG93bicsIChldmVudCwgcG9pbnRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06cG9pbnRlckRvd25gLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRlcjogcG9pbnRlcixcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmluc3RhbmNlc1tmbGlja2l0eUluZGV4XS5pbnN0YW5jZS5vbigncG9pbnRlck1vdmUnLChldmVudCwgcG9pbnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3IpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnBvaW50ZXJNb3ZlYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIG1vdmVWZWN0b3I6IG1vdmVWZWN0b3IsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3BvaW50ZXJVcCcsIChldmVudCwgcG9pbnRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06cG9pbnRlclVwYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ3N0YXRpY0NsaWNrJywgKGV2ZW50LCBwb2ludGVyLCBjZWxsRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGVtaXQoYEZsaWNraXR5OiR7SUR9OnN0YXRpY0NsaWNrYCwge1xuICAgICAgICAgICAgICAgICAgICBldmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgIHBvaW50ZXI6IHBvaW50ZXIsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxFbGVtZW50OiBjZWxsRWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgY2VsbEluZGV4OiBjZWxsSW5kZXgsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZXNbZmxpY2tpdHlJbmRleF0uaW5zdGFuY2Uub24oJ2xhenlMb2FkJywgKGV2ZW50LCBjZWxsRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kZW1pdChgRmxpY2tpdHk6JHtJRH06bGF6eUxvYWRgLCB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgY2VsbEVsZW1lbnQ6IGNlbGxFbGVtZW50LFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRydWUpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogRmluZCBhbiBvYmplY3Qgd2l0aGluIGFuIGFycmF5IGJ5IElEXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzb3VyY2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IG1hdGNoXG4gICAgICovXG4gICAgX2ZpbmRPYmplY3RCeUlkKHNvdXJjZSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5maWx0ZXIoKG9iamVjdCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdC5pZCA9PT0gaWQ7XG4gICAgICAgIH0pWzBdO1xuICAgIH1cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9mbGlja2l0eS5zZXJ2aWNlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiRmxpY2tpdHlcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZsaWNraXR5RGlyZWN0aXZlID0gRmxpY2tpdHlEaXJlY3RpdmU7XG4vKiBnbG9iYWwgZmxpY2tpdHkgKi9cblxuZnVuY3Rpb24gRmxpY2tpdHlEaXJlY3RpdmUoJHRpbWVvdXQsIEZsaWNraXR5U2VydmljZSwgRmxpY2tpdHlDb25maWcpIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgdmFyIGRpcmVjdGl2ZSA9IHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgc2NvcGU6IHt9LFxuICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB7XG4gICAgICAgICAgICBiY0ZsaWNraXR5OiAnQD8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxuICAgICAgICAgICAgICAgIHBvc3Q6IHBvc3RMaW5rRnVuY3Rpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uIGNvbnRyb2xsZXIoKSB7fSxcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nXG4gICAgfTtcblxuICAgIHJldHVybiBkaXJlY3RpdmU7XG5cbiAgICBmdW5jdGlvbiBwcmVMaW5rRnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlcikge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgdXNlcidzIG9wdGlvbnMgb3Igc3RhcnQgd2l0aCBhbiBlbXB0eSBvYmplY3RcblxuICAgICAgICB2YXIgdXNlck9wdGlvbnMgPSBhbmd1bGFyLmZyb21Kc29uKCRjb250cm9sbGVyLmJjRmxpY2tpdHkgfHwge30pO1xuICAgICAgICAvLyBDb21iaW5lIHRoZSB1c2VyIG9wdGlvbnMgd2l0aCB0aGUgZGVmYXVsdCBvcHRpb25zXG4gICAgICAgICRjb250cm9sbGVyLm9wdGlvbnMgPSBhbmd1bGFyLmV4dGVuZCh7fSwgRmxpY2tpdHlDb25maWcsIHVzZXJPcHRpb25zKTtcblxuICAgICAgICAvLyBJZiBubyBJRCB3YXMgcGFzc2VkIGluXG4gICAgICAgIGlmICghJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAvLyBVc2UgdGhlIGVsZW1lbnQncyBJRCBpZiBvbmUgZXhpc3RzXG4gICAgICAgICAgICBpZiAoJGF0dHJzLmlkKSB7XG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gJGF0dHJzLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9zdCBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcG9zdExpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgYGNyZWF0ZSgpYCBnZXRzIHBpY2tlZCB1cCBpbiB0aGUgbmV4dCBkaWdlc3QgY3ljbGVcblxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgRmxpY2tpdHlcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5jcmVhdGUoJGVsZW1lbnRbMF0sICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIub3B0aW9ucykudGhlbihmdW5jdGlvbiAoZmxpY2tpdHlJbnN0YW5jZSkge1xuXG4gICAgICAgICAgICAgICAgLy8gRXhwb3NlIHRoZSBGbGlja2l0eSBpbnN0YW5jZSBhbmQgSURcbiAgICAgICAgICAgICAgICAkY29udHJvbGxlci5GbGlja2l0eSA9IGZsaWNraXR5SW5zdGFuY2UuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkID0gZmxpY2tpdHlJbnN0YW5jZS5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBXaGVuIHRoZSBkaXJlY3RpdmUgaXMgYmVpbmcgZGVzdHJveWVkXG4gICAgICAgIHZhciBvbkRlc3Ryb3kgPSAkc2NvcGUuJG9uKCckZGVzdHJveScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRlc3Ryb3kgdGhlIEZsaWNraXR5IGluc3RhbmNlXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UuZGVzdHJveSgkY29udHJvbGxlci5iY0ZsaWNraXR5SWQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzXG4gKiovIiwiLyogZ2xvYmFsIGZsaWNraXR5ICovXG5cbmV4cG9ydCBmdW5jdGlvbiBGbGlja2l0eURpcmVjdGl2ZShcbiAgICAkdGltZW91dCxcbiAgICBGbGlja2l0eVNlcnZpY2UsXG4gICAgRmxpY2tpdHlDb25maWdcbikge1xuICAgICduZ0luamVjdCc7XG5cbiAgICBjb25zdCBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eTogJ0A/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgICAgICBwb3N0OiBwb3N0TGlua0Z1bmN0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogKCkgPT4ge30sXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIHVzZXIncyBvcHRpb25zIG9yIHN0YXJ0IHdpdGggYW4gZW1wdHkgb2JqZWN0XG4gICAgICAgIGNvbnN0IHVzZXJPcHRpb25zID0gYW5ndWxhci5mcm9tSnNvbigkY29udHJvbGxlci5iY0ZsaWNraXR5IHx8IHt9KTtcbiAgICAgICAgLy8gQ29tYmluZSB0aGUgdXNlciBvcHRpb25zIHdpdGggdGhlIGRlZmF1bHQgb3B0aW9uc1xuICAgICAgICAkY29udHJvbGxlci5vcHRpb25zID0gYW5ndWxhci5leHRlbmQoe30sIEZsaWNraXR5Q29uZmlnLCB1c2VyT3B0aW9ucyk7XG5cbiAgICAgICAgLy8gSWYgbm8gSUQgd2FzIHBhc3NlZCBpblxuICAgICAgICBpZiAoISRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgLy8gVXNlIHRoZSBlbGVtZW50J3MgSUQgaWYgb25lIGV4aXN0c1xuICAgICAgICAgICAgaWYgKCRhdHRycy5pZCkge1xuICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9ICRhdHRycy5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9zdCBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcG9zdExpbmtGdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgYGNyZWF0ZSgpYCBnZXRzIHBpY2tlZCB1cCBpbiB0aGUgbmV4dCBkaWdlc3QgY3ljbGVcbiAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIEZsaWNraXR5XG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UuY3JlYXRlKCRlbGVtZW50WzBdLCAkY29udHJvbGxlci5iY0ZsaWNraXR5SWQsICRjb250cm9sbGVyLm9wdGlvbnMpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGZsaWNraXR5SW5zdGFuY2UpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBFeHBvc2UgdGhlIEZsaWNraXR5IGluc3RhbmNlIGFuZCBJRFxuICAgICAgICAgICAgICAgICAgICAkY29udHJvbGxlci5GbGlja2l0eSA9IGZsaWNraXR5SW5zdGFuY2UuaW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICRjb250cm9sbGVyLmJjRmxpY2tpdHlJZCA9IGZsaWNraXR5SW5zdGFuY2UuaWQ7XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFdoZW4gdGhlIGRpcmVjdGl2ZSBpcyBiZWluZyBkZXN0cm95ZWRcbiAgICAgICAgY29uc3Qgb25EZXN0cm95ID0gJHNjb3BlLiRvbignJGRlc3Ryb3knLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB3ZSBkZXN0cm95IHRoZSBGbGlja2l0eSBpbnN0YW5jZVxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLmRlc3Ryb3koJGNvbnRyb2xsZXIuYmNGbGlja2l0eUlkKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvZmxpY2tpdHkuZGlyZWN0aXZlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkZsaWNraXR5TmV4dERpcmVjdGl2ZSA9IEZsaWNraXR5TmV4dERpcmVjdGl2ZTtcblxudmFyIF9uZXh0ID0gcmVxdWlyZSgnLi9uZXh0LmNvbnRyb2xsZXInKTtcblxuZnVuY3Rpb24gRmxpY2tpdHlOZXh0RGlyZWN0aXZlKCRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eU5leHQ6ICc9PycsXG4gICAgICAgICAgICBiY0ZsaWNraXR5SWQ6ICdAPydcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcHJlOiBwcmVMaW5rRnVuY3Rpb25cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IF9uZXh0Lk5leHRDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIC8qKlxuICAgICAqIFByZSBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG5cbiAgICAgICAgdmFyIElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIHZhciBzZWxlY3RFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOmNlbGxTZWxlY3QnO1xuICAgICAgICB2YXIgc2V0dGxlRXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpzZXR0bGUnO1xuXG4gICAgICAgIC8vIExpc3RlblxuICAgICAgICB2YXIgY2VsbFNlbGVjdCA9ICRyb290U2NvcGUuJG9uKHNlbGVjdEV2ZW50LCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zbGlkZXMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2xpZGVzLmxlbmd0aCwgZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4ICsgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UubmV4dCgkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKS50aGVuKGZ1bmN0aW9uIChpbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5zdGFuY2UuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgsIGNlbGxDb3VudCkge1xuXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSBjZWxsQ291bnQpIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL25leHQvbmV4dC5kaXJlY3RpdmUuanNcbiAqKi8iLCJpbXBvcnQgeyBOZXh0Q29udHJvbGxlciB9IGZyb20gJy4vbmV4dC5jb250cm9sbGVyJztcblxuZXhwb3J0IGZ1bmN0aW9uIEZsaWNraXR5TmV4dERpcmVjdGl2ZShcbiAgICAkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSxcbiAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXG4pIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHlOZXh0OiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nLFxuICAgICAgICB9LFxuICAgICAgICBjb21waWxlOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJvbGxlcjogTmV4dENvbnRyb2xsZXIsXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuXG5cblxuICAgIC8qKlxuICAgICAqIFByZSBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKFxuICAgICAgICAkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsICRjb250cm9sbGVyXG4gICAgKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBJRFxuICAgICAgICBjb25zdCBJRCA9ICRjb250cm9sbGVyLmZsaWNraXR5SWQ7XG5cbiAgICAgICAgLy8gRGVmaW5lIHRoZSBicm9hZGNhc3QgbmFtZXMgdG8gbGlzdGVuIGZvclxuICAgICAgICBjb25zdCBzZWxlY3RFdmVudCA9IGBGbGlja2l0eToke0lEfTpjZWxsU2VsZWN0YDtcbiAgICAgICAgY29uc3Qgc2V0dGxlRXZlbnQgPSBgRmxpY2tpdHk6JHtJRH06c2V0dGxlYDtcblxuICAgICAgICAvLyBMaXN0ZW5cbiAgICAgICAgY29uc3QgY2VsbFNlbGVjdCA9ICRyb290U2NvcGUuJG9uKHNlbGVjdEV2ZW50LCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zbGlkZXMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHNldHRsZSA9ICRyb290U2NvcGUuJG9uKHNldHRsZUV2ZW50LCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zbGlkZXMubGVuZ3RoLCBkYXRhLmluc3RhbmNlLnNlbGVjdGVkSW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkZWxlbWVudC5vbignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIE1vdmUgdG8gdGhlIG5leHQgY2VsbFxuICAgICAgICAgICAgRmxpY2tpdHlTZXJ2aWNlLm5leHQoJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIud3JhcEFyb3VuZClcbiAgICAgICAgICAgICAgICAudGhlbigoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX2Rpc2FibGVCdXR0b25JZk5lZWRlZChpbnN0YW5jZS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgO1xuXG4gICAgICAgIH0pO1xuXG5cblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluZGV4LCBjZWxsQ291bnQpIHtcblxuICAgICAgICAgICAgLy8gRGlzYWJsZSBidXR0b24gaWYgYXQgdGhlIGJlZ2lubmluZyBhbmQgd2Ugc2hvdWxkbid0IHdyYXBcbiAgICAgICAgICAgIGlmICghJGNvbnRyb2xsZXIud3JhcEFyb3VuZCAmJiBpbmRleCA9PT0gY2VsbENvdW50KSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vc3JjL25leHQvbmV4dC5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE5leHRDb250cm9sbGVyID0gZXhwb3J0cy5OZXh0Q29udHJvbGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOZXh0Q29udHJvbGxlcigkbG9nLCAkcSwgJHRpbWVvdXQsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTmV4dENvbnRyb2xsZXIpO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMuX2FjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKE5leHRDb250cm9sbGVyLCBbe1xuICAgICAgICBrZXk6ICdfYWN0aXZhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2FjdGl2YXRlKCkge1xuICAgICAgICAgICAgLy8gQXNzaWduIHdyYXAgYXJvdW5kIG9yIGZhbGwgYmFjayB0byBhIGRlZmF1bHRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5iY0ZsaWNraXR5TmV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlOZXh0O1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBudWxsO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICAgICAgdGhpcy5fc2V0SWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgSUQgdG8gd2hhdCBpcyBkZWZpbmVkLCBmYWxsYmFjayB0byBmaXJzdCBpbnN0YW5jZVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19zZXRJZCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0SWQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIF90aGlzLiR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5mbGlja2l0eUlkID0gX3RoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IGluc3RhbmNlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShfdGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJGxvZy53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTmV4dENvbnRyb2xsZXI7XG59KCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbmV4dC9uZXh0LmNvbnRyb2xsZXIuanNcbiAqKi8iLCJleHBvcnQgY2xhc3MgTmV4dENvbnRyb2xsZXIge1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgICRsb2csICRxLCAkdGltZW91dCxcbiAgICAgICAgRmxpY2tpdHlDb25maWcsIEZsaWNraXR5U2VydmljZVxuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIHRoaXMuJGxvZyA9ICRsb2c7XG4gICAgICAgIHRoaXMuJHEgPSAkcTtcbiAgICAgICAgdGhpcy4kdGltZW91dCA9ICR0aW1lb3V0O1xuICAgICAgICB0aGlzLkZsaWNraXR5Q29uZmlnID0gRmxpY2tpdHlDb25maWc7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlID0gRmxpY2tpdHlTZXJ2aWNlO1xuXG5cbiAgICAgICAgdGhpcy5fYWN0aXZhdGUoKTtcblxuICAgIH1cblxuXG5cblxuICAgIF9hY3RpdmF0ZSgpIHtcbiAgICAgICAgLy8gQXNzaWduIHdyYXAgYXJvdW5kIG9yIGZhbGwgYmFjayB0byBhIGRlZmF1bHRcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJjRmxpY2tpdHlOZXh0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5TmV4dDtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5GbGlja2l0eUNvbmZpZy53cmFwQXJvdW5kO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAvLyBNYWtlIHN1cmUgd2UgaGF2ZSBhbiBJRFxuICAgICAgICB0aGlzLl9zZXRJZCgpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gZmxpY2tpdHlJZFxuICAgICAqL1xuICAgIF9zZXRJZCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYmNGbGlja2l0eUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IHRoaXMuYmNGbGlja2l0eUlkO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSh0aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UuZ2V0Rmlyc3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbG9nLndhcm4oZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9uZXh0L25leHQuY29udHJvbGxlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5GbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlID0gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZTtcblxudmFyIF9wcmV2aW91cyA9IHJlcXVpcmUoJy4vcHJldmlvdXMuY29udHJvbGxlcicpO1xuXG5mdW5jdGlvbiBGbGlja2l0eVByZXZpb3VzRGlyZWN0aXZlKCRsb2csICR0aW1lb3V0LCAkcm9vdFNjb3BlLCBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlKSB7XG4gICAgJ25nSW5qZWN0JztcblxuICAgIHZhciBkaXJlY3RpdmUgPSB7XG4gICAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICAgIHNjb3BlOiB7fSxcbiAgICAgICAgYmluZFRvQ29udHJvbGxlcjoge1xuICAgICAgICAgICAgYmNGbGlja2l0eVByZXZpb3VzOiAnPT8nLFxuICAgICAgICAgICAgYmNGbGlja2l0eUlkOiAnQD8nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHByZTogcHJlTGlua0Z1bmN0aW9uXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBjb250cm9sbGVyOiBfcHJldmlvdXMuUHJldmlvdXNDb250cm9sbGVyLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9O1xuXG4gICAgcmV0dXJuIGRpcmVjdGl2ZTtcblxuICAgIC8qKlxuICAgICAqIFByZSBMaW5rXG4gICAgICovXG4gICAgZnVuY3Rpb24gcHJlTGlua0Z1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICAvLyBHZXQgdGhlIElEXG5cbiAgICAgICAgdmFyIElEID0gJGNvbnRyb2xsZXIuZmxpY2tpdHlJZDtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIGJyb2FkY2FzdCBuYW1lcyB0byBsaXN0ZW4gZm9yXG4gICAgICAgIHZhciBzZWxlY3RFdmVudCA9ICdGbGlja2l0eTonICsgSUQgKyAnOmNlbGxTZWxlY3QnO1xuICAgICAgICB2YXIgc2V0dGxlRXZlbnQgPSAnRmxpY2tpdHk6JyArIElEICsgJzpzZXR0bGUnO1xuXG4gICAgICAgIC8vIExpc3RlblxuICAgICAgICB2YXIgY2VsbFNlbGVjdCA9ICRyb290U2NvcGUuJG9uKHNlbGVjdEV2ZW50LCBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgICAgICAgICAgIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoZGF0YS5pbnN0YW5jZS5zZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRlbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgLy8gTW92ZSB0byB0aGUgbmV4dCBjZWxsXG4gICAgICAgICAgICBGbGlja2l0eVNlcnZpY2UucHJldmlvdXMoJGNvbnRyb2xsZXIuZmxpY2tpdHlJZCwgJGNvbnRyb2xsZXIud3JhcEFyb3VuZCkudGhlbihmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICAgICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluc3RhbmNlLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEaXNhYmxlIGJ1dHRvbiBpZiBuZWVkZWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluZGV4KSB7XG4gICAgICAgICAgICAvLyBEaXNhYmxlIGJ1dHRvbiBpZiBhdCB0aGUgYmVnaW5uaW5nIGFuZCB3ZSBzaG91bGRuJ3Qgd3JhcFxuICAgICAgICAgICAgaWYgKCEkY29udHJvbGxlci53cmFwQXJvdW5kICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRhdHRycy4kc2V0KCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanNcbiAqKi8iLCJpbXBvcnQgeyBQcmV2aW91c0NvbnRyb2xsZXIgfSBmcm9tICcuL3ByZXZpb3VzLmNvbnRyb2xsZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gRmxpY2tpdHlQcmV2aW91c0RpcmVjdGl2ZShcbiAgICAkbG9nLCAkdGltZW91dCwgJHJvb3RTY29wZSxcbiAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXG4pIHtcbiAgICAnbmdJbmplY3QnO1xuXG4gICAgY29uc3QgZGlyZWN0aXZlID0ge1xuICAgICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgICBzY29wZToge30sXG4gICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHtcbiAgICAgICAgICAgIGJjRmxpY2tpdHlQcmV2aW91czogJz0/JyxcbiAgICAgICAgICAgIGJjRmxpY2tpdHlJZDogJ0A/JyxcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGlsZTogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBwcmU6IHByZUxpbmtGdW5jdGlvbixcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyb2xsZXI6IFByZXZpb3VzQ29udHJvbGxlcixcbiAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgIH07XG5cbiAgICByZXR1cm4gZGlyZWN0aXZlO1xuXG5cbiAgICAvKipcbiAgICAgKiBQcmUgTGlua1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIHByZUxpbmtGdW5jdGlvbihcbiAgICAgICAgJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzLCAkY29udHJvbGxlclxuICAgICkge1xuICAgICAgICAnbmdJbmplY3QnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgSURcbiAgICAgICAgY29uc3QgSUQgPSAkY29udHJvbGxlci5mbGlja2l0eUlkO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgYnJvYWRjYXN0IG5hbWVzIHRvIGxpc3RlbiBmb3JcbiAgICAgICAgY29uc3Qgc2VsZWN0RXZlbnQgPSBgRmxpY2tpdHk6JHtJRH06Y2VsbFNlbGVjdGA7XG4gICAgICAgIGNvbnN0IHNldHRsZUV2ZW50ID0gYEZsaWNraXR5OiR7SUR9OnNldHRsZWA7XG5cbiAgICAgICAgLy8gTGlzdGVuXG4gICAgICAgIGNvbnN0IGNlbGxTZWxlY3QgPSAkcm9vdFNjb3BlLiRvbihzZWxlY3RFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBzZXR0bGUgPSAkcm9vdFNjb3BlLiRvbihzZXR0bGVFdmVudCwgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGRhdGEuaW5zdGFuY2Uuc2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJGVsZW1lbnQub24oJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBuZXh0IGNlbGxcbiAgICAgICAgICAgIEZsaWNraXR5U2VydmljZS5wcmV2aW91cygkY29udHJvbGxlci5mbGlja2l0eUlkLCAkY29udHJvbGxlci53cmFwQXJvdW5kKVxuICAgICAgICAgICAgICAgIC50aGVuKChpbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfZGlzYWJsZUJ1dHRvbklmTmVlZGVkKGluc3RhbmNlLmluc3RhbmNlLnNlbGVjdGVkSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgICAgfSk7XG5cblxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgYnV0dG9uIGlmIG5lZWRlZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIF9kaXNhYmxlQnV0dG9uSWZOZWVkZWQoaW5kZXgpIHtcbiAgICAgICAgICAgIC8vIERpc2FibGUgYnV0dG9uIGlmIGF0IHRoZSBiZWdpbm5pbmcgYW5kIHdlIHNob3VsZG4ndCB3cmFwXG4gICAgICAgICAgICBpZiAoISRjb250cm9sbGVyLndyYXBBcm91bmQgJiYgaW5kZXggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkYXR0cnMuJHNldCgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJGF0dHJzLiRzZXQoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5kaXJlY3RpdmUuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFByZXZpb3VzQ29udHJvbGxlciA9IGV4cG9ydHMuUHJldmlvdXNDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFByZXZpb3VzQ29udHJvbGxlcigkbG9nLCAkcSwgJHRpbWVvdXQsIEZsaWNraXR5Q29uZmlnLCBGbGlja2l0eVNlcnZpY2UpIHtcbiAgICAgICAgJ25nSW5qZWN0JztcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUHJldmlvdXNDb250cm9sbGVyKTtcblxuICAgICAgICB0aGlzLiRsb2cgPSAkbG9nO1xuICAgICAgICB0aGlzLiRxID0gJHE7XG4gICAgICAgIHRoaXMuJHRpbWVvdXQgPSAkdGltZW91dDtcbiAgICAgICAgdGhpcy5GbGlja2l0eUNvbmZpZyA9IEZsaWNraXR5Q29uZmlnO1xuICAgICAgICB0aGlzLkZsaWNraXR5U2VydmljZSA9IEZsaWNraXR5U2VydmljZTtcblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhQcmV2aW91c0NvbnRyb2xsZXIsIFt7XG4gICAgICAgIGtleTogJ19hY3RpdmF0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAvLyBBc3NpZ24gd3JhcCBhcm91bmQgb3IgZmFsbCBiYWNrIHRvIGEgZGVmYXVsdFxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLmJjRmxpY2tpdHlQcmV2aW91cztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBBcm91bmQgPSB0aGlzLkZsaWNraXR5Q29uZmlnLndyYXBBcm91bmQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gbnVsbDtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgICAgIHRoaXMuX3NldElkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IElEIHRvIHdoYXQgaXMgZGVmaW5lZCwgZmFsbGJhY2sgdG8gZmlyc3QgaW5zdGFuY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBmbGlja2l0eUlkXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfc2V0SWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX3NldElkKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy4kdGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmxpY2tpdHlJZCA9IF90aGlzLmJjRmxpY2tpdHlJZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKF90aGlzLmZsaWNraXR5SWQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLkZsaWNraXR5U2VydmljZS5nZXRGaXJzdCgpLnRoZW4oZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZsaWNraXR5SWQgPSBpbnN0YW5jZS5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoX3RoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLiRsb2cud2FybihlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFByZXZpb3VzQ29udHJvbGxlcjtcbn0oKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wcmV2aW91cy9wcmV2aW91cy5jb250cm9sbGVyLmpzXG4gKiovIiwiZXhwb3J0IGNsYXNzIFByZXZpb3VzQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgJGxvZywgJHEsICR0aW1lb3V0LFxuICAgICAgICBGbGlja2l0eUNvbmZpZywgRmxpY2tpdHlTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgICduZ0luamVjdCc7XG5cbiAgICAgICAgdGhpcy4kbG9nID0gJGxvZztcbiAgICAgICAgdGhpcy4kcSA9ICRxO1xuICAgICAgICB0aGlzLiR0aW1lb3V0ID0gJHRpbWVvdXQ7XG4gICAgICAgIHRoaXMuRmxpY2tpdHlDb25maWcgPSBGbGlja2l0eUNvbmZpZztcbiAgICAgICAgdGhpcy5GbGlja2l0eVNlcnZpY2UgPSBGbGlja2l0eVNlcnZpY2U7XG5cblxuICAgICAgICB0aGlzLl9hY3RpdmF0ZSgpO1xuXG4gICAgfVxuXG5cblxuXG4gICAgX2FjdGl2YXRlKCkge1xuICAgICAgICAvLyBBc3NpZ24gd3JhcCBhcm91bmQgb3IgZmFsbCBiYWNrIHRvIGEgZGVmYXVsdFxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYmNGbGlja2l0eVByZXZpb3VzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy53cmFwQXJvdW5kID0gdGhpcy5iY0ZsaWNraXR5UHJldmlvdXM7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IHRoaXMuRmxpY2tpdHlDb25maWcud3JhcEFyb3VuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmxpY2tpdHlJZCA9IG51bGw7XG5cbiAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGhhdmUgYW4gSURcbiAgICAgICAgdGhpcy5fc2V0SWQoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFNldCBJRCB0byB3aGF0IGlzIGRlZmluZWQsIGZhbGxiYWNrIHRvIGZpcnN0IGluc3RhbmNlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGZsaWNraXR5SWRcbiAgICAgKi9cbiAgICBfc2V0SWQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmJjRmxpY2tpdHlJZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsaWNraXR5SWQgPSB0aGlzLmJjRmxpY2tpdHlJZDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGhpcy5mbGlja2l0eUlkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiR0aW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRmxpY2tpdHlTZXJ2aWNlLmdldEZpcnN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoaW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbGlja2l0eUlkID0gaW5zdGFuY2UuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRoaXMuZmxpY2tpdHlJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGxvZy53YXJuKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9zcmMvcHJldmlvdXMvcHJldmlvdXMuY29udHJvbGxlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=