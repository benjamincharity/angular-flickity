import Flickity from 'flickity';

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
    create(element, id = this.instances.length + 1, options) {
        return new Promise((resolve, reject) => {
            this.$timeout(() => {
                console.log('in create: ID: ', id);

                // Check to see if the ID is already in use
                if (this._findObjectById(this.instances, id)) {
                    const index = this._getFlickityIndex(id);
                    this.$log.error('This ID is already in use: ', this.instances[index]);

                    return false;
                }

                // Define the new instance
                const instance = {
                    id: id,
                    instance: new Flickity(element, options),
                };

                // Save this instance to the array
                this.instances.push(instance);
                console.log('In create: Instances: ', this.instances);

                // Bind to all events
                this._bindEvents(id).then(() => {
                    resolve(instance);
                });
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
            console.log('in destroy ID: ', id);
            //const pauseBeforeDestruction = 100;
            const flickityIndex = this._getFlickityIndex(id);
            console.log('flickityIndex to destroy: ', flickityIndex);


            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            }

            // Destroy the Flickity instance
            this.instances[flickityIndex].instance.destroy();

            // Remove the instance from the array
            this.instances.splice(flickityIndex, 1);
            console.log('in destroy: Instances: ', this.instances);

            resolve('Instance ' + id + ' destroyed.');
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Move to the next slide
                this.instances[flickityIndex].instance.next(isWrapped, isInstant);

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Move to the previous slide
                this.instances[flickityIndex].instance.previous(isWrapped, isInstant);

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Move to the selected slide
                this.instances[flickityIndex].instance.select(index, isWrapped, isInstant);

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Move to the selected slide
                this.instances[flickityIndex].instance.selectCell(value, isWrapped, isInstant);

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Return the current index
                resolve(this.instances[flickityIndex].instance.selectedIndex);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Trigger the resize
                this.instances[flickityIndex].instance.resize();

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Trigger the resize
                this.instances[flickityIndex].instance.reposition();

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Reload cells
                this.instances[flickityIndex].instance.reloadCells();

                resolve(this.instances[flickityIndex]);
            }
        });
    }


    /**
     * Get the Flickity instance
     *
     * @param {String} id
     * @return {Object} instance
     */
    get(id) {
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                resolve(this.instances[flickityIndex]);
            }
        });
    }


    /**
     * Get the first Flickity instance
     *
     * @return {Object} instance
     */
    getFirst() {
        return this.$q((resolve, reject) => {
            if (!this.instances || this.instances.length < 1) {
                reject('No instances exist');
            } else {
                resolve(this.instances[0]);
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
        return this.$q((resolve, reject) => {
            const instance = Flickity.data(element)

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
    prepend(id, elements) {
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Prepend the slides
                this.instances[flickityIndex].instance.prepend(elements);

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Append the slides
                this.instances[flickityIndex].instance.append(elements);

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Insert the slides
                this.instances[flickityIndex].instance.insert(elements, index);

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                resolve(this.instances[flickityIndex].instance.getCellElements());
            }
        });
    }


    /**
     * Get the elements of the cells
     *
     * @param {String} id
     * @return {Object} instance
     */
    remove(id, elements) {
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                this.instances[flickityIndex].instance.remove(elements);

                resolve(this.instances[flickityIndex]);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                resolve(this.instances[flickityIndex].instance.selectedElement);
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
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                resolve(this.instances[flickityIndex].instance.cells);
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
        let foundIndex;

        // If no instances exist
        if (!this.instances.length) {

            foundIndex = -1;

        } else {
            // if instances do exist

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


    _bindEvents(id) {
        const flickityIndex = this._getFlickityIndex(id);

        if (flickityIndex < 0) {
            return false;
        }

        return this.$q((resolve) => {
            const ID = this.instances[flickityIndex].id;

            this.instances[flickityIndex].instance.on('select', () => {
                this.$rootScope.$emit('Flickity:' + ID + ':select', this.instances[flickityIndex]);
            });

            this.instances[flickityIndex].instance.on('settle', () => {
                this.$rootScope.$emit('Flickity:' + ID + ':settle',
                                      this.instances[flickityIndex]);
            });

            this.instances[flickityIndex].instance.on('scroll', (progress, positionX) => {
                this.$rootScope.$emit('Flickity:' + ID + ':scroll', {
                    progress: progress,
                    positionX: positionX,
                });
            });

            this.instances[flickityIndex].instance.on('dragStart', (event, pointer) => {
                this.$rootScope.$emit('Flickity:' + ID + ':dragStart', {
                    event: event,
                    pointer: pointer,
                });
            });

            this.instances[flickityIndex].instance.on('dragMove', (event, pointer, moveVector) => {
                this.$rootScope.$emit('Flickity:' + ID + ':dragMove', {
                    event: event,
                    pointer: pointer,
                    moveVector: moveVector,
                });
            });

            this.instances[flickityIndex].instance.on('dragEnd', (event, pointer) => {
                this.$rootScope.$emit('Flickity:' + ID + ':dragEnd', {
                    event: event,
                    pointer: pointer,
                });
            });

            this.instances[flickityIndex].instance.on('pointerDown', (event, pointer) => {
                this.$rootScope.$emit('Flickity:' + ID + ':pointerDown', {
                    event: event,
                    pointer: pointer,
                });
            });

            this.instances[flickityIndex].instance.on('pointerMove',(event, pointer,
                                                                     moveVector) => {
                this.$rootScope.$emit('Flickity:' + ID + ':pointerMove', {
                    event: event,
                    pointer: pointer,
                    moveVector: moveVector,
                });
            });

            this.instances[flickityIndex].instance.on('pointerUp', (event, pointer) => {
                this.$rootScope.$emit('Flickity:' + ID + ':pointerUp', {
                    event: event,
                    pointer: pointer,
                });
            });

            this.instances[flickityIndex].instance.on('staticClick', (event, pointer, cellElement,
                                                                      cellIndex) => {
                this.$rootScope.$emit('Flickity:' + ID + ':staticClick', {
                    event: event,
                    pointer: pointer,
                    cellElement: cellElement,
                    cellIndex: cellIndex,
                });
            });

            this.instances[flickityIndex].instance.on('lazyLoad', (event, cellElement) => {
                this.$rootScope.$emit('Flickity:' + ID + ':lazyLoad', {
                    event: event,
                    cellElement: cellElement,
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
    _findObjectById(source, id) {
        return source.filter((object) => {
            return object.id === id;
        })[0];
    }


}

