/* global Flickity */
export class FlickityService {

    constructor(
        $timeout, $q
    ) {
        'ngInject';

        this.$timeout = $timeout;
        this.$q = $q;

        this.instances = [];

    }




    /**
     * Create a new Flickity instance
     * TODO: We should verify that the ID doesn't exist in case the user passes in an existing ID
     *
     * @param {Element} element
     * @param {String} id
     * @param {Object} options
     * @return {Object} instance
     */
    create(element, id = this.instances.length + 1, options) {

        // Define the new instance
        const instance = {
            id: id,
            instance: new Flickity(element, options),
        };

        // Save this instance to the array
        this.instances.push(instance);

        return this.$q((resolve) => {
            resolve(instance);
        });

    }


    /**
     * Destroy a Flickity instance
     *
     * @param {String} id
     * @return {Object} instance
     */
    destroy(id) {
        const pauseBeforeDestruction = 2000;
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {

            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            }

            // Pause to allow other scope cleanup to occur
            // NOTE: Without this pause, Flickity is being destroyed before the view containing the
            // directive can leave view
            this.$timeout(() => {

                // Destroy the Flickity instance
                this.instances[flickityIndex].instance.destroy();

                // Remove the instance from the array
                this.instances.splice(flickityIndex, 1);

                resolve('Instance ' + id + ' destroyed.');

            }, pauseBeforeDestruction);
        });

    }


    /**
     * Move to the next slide
     *
     * @param {string} id
     * @param {Bool} isWrapped
     * @return {Object} instance
     */
    next(id, isWrapped) {
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Move to the next slide
                this.instances[flickityIndex].instance.next(isWrapped);

                resolve(this.instances[flickityIndex]);
            }
        });

    }


    /**
     * Move to the previous slide
     *
     * @param {string} id
     * @param {Bool} isWrapped
     * @return {Object} instance
     */
    previous(id, isWrapped) {
        const flickityIndex = this._getFlickityIndex(id);

        return this.$q((resolve, reject) => {
            if (flickityIndex < 0) {
                reject('Instance ' + id + ' not found');
            } else {
                // Move to the previous slide
                this.instances[flickityIndex].instance.previous(isWrapped);

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
     * Get the current slide index
     *
     * @param {String} id
     * @return {Integer} selectedIndex
     */
    getSelectedIndex(id) {
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
                this.instances[flickityIndex].instance.remove(elements)

                resolve(this.instances[flickityIndex]);
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
        const negativeIndexForUnfound = -1;

        // If no instances exist, cancel
        if (this.instances.length < 1) {

            return negativeIndexForUnfound;

        } else {

            // Find the instance by ID
            const index = this.instances.findIndex(matchesId);

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


}

