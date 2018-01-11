import flickity from 'flickity-as-nav-for';

export class FlickityService {

    constructor(
        $timeout, $q, $rootScope, $log
    ) {
        'ngInject';

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
    create(element, id, options) {
        return new Promise((resolve, reject) => {
            // If no ID was passed in
            if (!id) {
                if (element.id) {
                    // Use the element's ID if it exists
                    id = element.id;
                } else {
                    // Otherwise, assign a new ID
                    id = this.instances.length + 1;
                }
            }

            // Check to see if the ID is already in use
            if (this._findObjectById(this.instances, id)) {
                const index = this._getFlickityIndex(id);
                this.$log.error(`This ID is already in use: `, this.instances[index]);

                reject(`This ID is already in use.`);
            }

            // Define the new instance
            const instance = {
                id: id,
                instance: new flickity(element, options),
            };

            // Save this instance to the array
            this.instances.push(instance);

            // Bind to all events
            return this._bindEvents(id).then(() => {
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
    destroy(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            }

            // Destroy the Flickity instance
            this.instances[flickityIndex].instance.destroy();

            // Remove the instance from the array
            this.instances.splice(flickityIndex, 1);

            return resolve('Instance ' + id + ' destroyed.');
        });
    }


    /**
     * Return all instances
     *
     * @return {Array} instances
     */
    getAll() {
        return new Promise((resolve) => {
            resolve(this.instances);
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
    next(id, isWrapped, isInstant) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Move to the next slide
                this.instances[flickityIndex].instance.next(isWrapped, isInstant);

                // Return the instance
                return resolve(this.instances[flickityIndex]);
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
    previous(id, isWrapped, isInstant) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Move to the previous slide
                this.instances[flickityIndex].instance.previous(isWrapped, isInstant);

                // Return the instance
                return resolve(this.instances[flickityIndex]);
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
    select(id, index, isWrapped = false, isInstant = false) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Move to the selected slide
                this.instances[flickityIndex].instance.select(index, isWrapped, isInstant);

                // Return the instance
                return resolve(this.instances[flickityIndex]);
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
    selectCell(id, value, isWrapped = false, isInstant = false) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Move to the selected slide
                this.instances[flickityIndex].instance.selectCell(value, isWrapped, isInstant);

                // Return the instance
                return resolve(this.instances[flickityIndex]);
            }
        });
    }


    /**
     * Get the current slide index
     *
     * @param {String} id
     * @return {Integer} selectedIndex
     */
    selectedIndex(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Return the current index
                return resolve(this.instances[flickityIndex].instance.selectedIndex);
            }
        });
    }


    /**
     * Resize the gallery and re-position cells.
     *
     * @param {String} id
     * @return {Object} instance
     */
    resize(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Trigger the resize
                this.instances[flickityIndex].instance.resize();

                // Return the instance
                return resolve(this.instances[flickityIndex]);
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
    reposition(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Trigger the reposition
                this.instances[flickityIndex].instance.reposition();

                // Return the instance
                return resolve(this.instances[flickityIndex]);
            }
        });
    }


    /**
     * Re-collect all cell elements in `flickity-slider`.
     *
     * @param {String} id
     * @return {Object} instance
     */
    reloadCells(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Reload cells
                this.instances[flickityIndex].instance.reloadCells();

                // Return the instance
                return resolve(this.instances[flickityIndex]);
            }
        });
    }


    /**
     * Get a Flickity instance by ID
     *
     * @param {String} id
     * @return {Object} instance
     */
    get(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Return the instance
                return resolve(this.instances[flickityIndex]);
            }
        });
    }


    /**
     * Get the first Flickity instance
     *
     * @return {Object} instance
     */
    getFirst() {
        return new Promise((resolve, reject) => {
            if (!this.instances || this.instances.length < 1) {
                return reject(`No instances exist.`);
            } else {
                // Return the instance
                return resolve(this.instances[0]);
            }
        });
    }


    /**
     * Get the Flickity instance
     *
     * @param {Element} element
     * @return {Object} instance
     */
    getByElement(element) {
        return new Promise((resolve, reject) => {
            const instance = flickity.data(element)

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
    prepend(id, elements) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Prepend the slides
                this.instances[flickityIndex].instance.prepend(elements);

                // Return the instance
                return resolve(this.instances[flickityIndex]);
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
    append(id, elements) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Append the slides
                this.instances[flickityIndex].instance.append(elements);

                // Return the instance
                return resolve(this.instances[flickityIndex]);
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
    insert(id, elements, index) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Insert the slides
                this.instances[flickityIndex].instance.insert(elements, index);

                // Return the instance
                return resolve(this.instances[flickityIndex]);
            }
        });
    }


    /**
     * Get the elements of the cells
     *
     * @param {String} id
     * @return {Array} cellElements
     */
    getCellElements(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Return the array of cell elements
                return resolve(this.instances[flickityIndex].instance.getCellElements());
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
    remove(id, elements) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                this.instances[flickityIndex].instance.remove(elements);

                // Return the instance
                return resolve(this.instances[flickityIndex]);
            }
        });
    }


    /**
     * Get the currently selected cell element
     *
     * @param {String} id
     * @return {Element} selectedCellElement
     */
    selectedElement(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Return the selected element
                return resolve(this.instances[flickityIndex].instance.selectedElement);
            }
        });
    }


    /**
     * Get an array of all cells
     *
     * @param {String} id
     * @return {Array} cells
     */
    cells(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject(`Instance ${id} not found.`);
            } else {
                // Return the array of cells
                return resolve(this.instances[flickityIndex].instance.cells);
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
    _getFlickityIndex(id) {
        let foundIndex = -1;

        // Verify at least one instance exists
        if (this.instances.length > 0) {

            // Check the ID of each instance
            this.instances.forEach((instance, index) => {

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
    _bindEvents(id) {
        return new Promise((resolve, reject) => {
            const flickityIndex = this._getFlickityIndex(id);

            if (flickityIndex < 0) {
                return reject();
            }

            const ID = this.instances[flickityIndex].id;

            this.instances[flickityIndex].instance.on('select', () => {
                this.$rootScope.$emit(`Flickity:${ID}:select`, this.instances[flickityIndex]);
            });

            this.instances[flickityIndex].instance.on('settle', () => {
                this.$rootScope.$emit(`Flickity:${ID}:settle`,
                                      this.instances[flickityIndex]);
            });

            this.instances[flickityIndex].instance.on('scroll', (progress, positionX) => {
                this.$rootScope.$emit(`Flickity:${ID}:scroll`, {
                    progress: progress,
                    positionX: positionX,
                });
            });

            this.instances[flickityIndex].instance.on('dragStart', (event, pointer) => {
                this.$rootScope.$emit(`Flickity:${ID}:dragStart`, {
                    event: event,
                    pointer: pointer,
                });
            });

            this.instances[flickityIndex].instance.on('dragMove', (event, pointer, moveVector) => {
                this.$rootScope.$emit(`Flickity:${ID}:dragMove`, {
                    event: event,
                    pointer: pointer,
                    moveVector: moveVector,
                });
            });

            this.instances[flickityIndex].instance.on('dragEnd', (event, pointer) => {
                this.$rootScope.$emit(`Flickity:${ID}:dragEnd`, {
                    event: event,
                    pointer: pointer,
                });
            });

            this.instances[flickityIndex].instance.on('pointerDown', (event, pointer) => {
                this.$rootScope.$emit(`Flickity:${ID}:pointerDown`, {
                    event: event,
                    pointer: pointer,
                });
            });

            this.instances[flickityIndex].instance.on('pointerMove',(event, pointer,
                                                                     moveVector) => {
                this.$rootScope.$emit(`Flickity:${ID}:pointerMove`, {
                    event: event,
                    pointer: pointer,
                    moveVector: moveVector,
                });
            });

            this.instances[flickityIndex].instance.on('pointerUp', (event, pointer) => {
                this.$rootScope.$emit(`Flickity:${ID}:pointerUp`, {
                    event: event,
                    pointer: pointer,
                });
            });

            this.instances[flickityIndex].instance.on('staticClick', (event, pointer, cellElement,
                                                                      cellIndex) => {
                this.$rootScope.$emit(`Flickity:${ID}:staticClick`, {
                    event: event,
                    pointer: pointer,
                    cellElement: cellElement,
                    cellIndex: cellIndex,
                });
            });

            this.instances[flickityIndex].instance.on('lazyLoad', (event, cellElement) => {
                this.$rootScope.$emit(`Flickity:${ID}:lazyLoad`, {
                    event: event,
                    cellElement: cellElement,
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
    _findObjectById(source, id) {
        return source.filter((object) => {
            return object.id === id;
        })[0];
    }

}

