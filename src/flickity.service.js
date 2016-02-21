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
                reject(false);
            }

            // Pause to allow other scope cleanup to occur
            // NOTE: Without this pause, Flickity is being destroyed before the view containing the
            // directive can leave view
            this.$timeout(() => {

                // Destroy the Flickity instance
                this.instances[flickityIndex].instance.destroy();

                // Remove the instance from the array
                this.instances.splice(flickityIndex, 1);

                resolve(true);

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

        if (flickityIndex < 0) {
            return false;
        }

        // Trigger the next slide
        this.instances[flickityIndex].instance.next(isWrapped);

        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex]);
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

        if (flickityIndex < 0) {
            return false;
        }

        // Trigger the next slide
        this.instances[flickityIndex].instance.previous(isWrapped);

        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex]);
        });

    }


    /**
     * Select a slide
     *
     * @param {String} id
     * @param {Number} index
     * @param {Bool} isWrapped
     * @param {Bool} isInstant
     * @return {Object} instance
     */
    select(id, index, isWrapped = false, isInstant = false) {
        const flickityIndex = this._getFlickityIndex(id);

        if (flickityIndex < 0) {
            return false;
        }

        // Trigger the next slide
        this.instances[flickityIndex].instance.select(index, isWrapped, isInstant);

        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex]);
        });
    }


    /**
     * Get the current slide index
     *
     * @param {String} id
     * @return {Number} selectedIndex
     */
    getSelectedIndex(id) {
        const flickityIndex = this._getFlickityIndex(id);

        if (flickityIndex < 0) {
            return false;
        }

        // Return the current index
        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex].instance.selectedIndex);
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

        if (flickityIndex < 0) {
            return false;
        }

        // Trigger the resize
        this.instances[flickityIndex].instance.resize();

        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex]);
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

        if (flickityIndex < 0) {
            return false;
        }

        // Trigger the resize
        this.instances[flickityIndex].instance.reposition();

        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex]);
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

        if (flickityIndex < 0) {
            return false;
        }

        // Trigger the resize
        this.instances[flickityIndex].instance.reposition();

        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex]);
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

        if (flickityIndex < 0) {
            return false;
        }

        // Trigger the resize
        this.instances[flickityIndex].instance.reloadCells();

        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex]);
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

        if (flickityIndex < 0) {
            return false;
        }

        return this.$q((resolve) => {
            resolve(this.instances[flickityIndex]);
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
                reject(instance);
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
     * @return {Number} flickityIndex
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

