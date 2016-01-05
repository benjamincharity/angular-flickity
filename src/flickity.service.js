/* global Flickity */
export class FlickityService {

    constructor(
        $timeout
    ) {
        'ngInject';

        this.$timeout = $timeout;

        this.instances = [];

    }




    /**
     * Create a new Flickity instance
     *
     * @param {Element} element
     * @param {String} id
     * @param {Object} options
     * @return {Element} element
     */
    create(element, id = this.instances.length + 1, options) {

        // Define the new instance
        const instance = {
            id: id,
            instance: new Flickity(element, options),
        };

        // Save this instance to the array
        this.instances.push(instance);

        return instance;

    }


    /**
     * Destroy a Flickity instance
     *
     * @param {String} id
     */
    destroy(id) {
        const pauseBeforeDestruction = 3000;
        const flickityIndex = this._getFlickityIndex(id);

        if (!flickityIndex) {
            return false;
        }

        // Pause to allow other scope cleanup to occur
        // NOTE: Without this pause, Flickity is being destroyed before the view containing the
        // directive can leave view
        this.$timeout(() => {

            // Destroy the Flickity instance
            this.instances[flickityIndex].instance.destroy();

            // Remove the instance from the array
            this.instances.splice(flickityIndex, 1);

        }, pauseBeforeDestruction);

    }


    /**
     * Move to the next slide
     *
     * @param {Bool} isWrapped
     */
    next(id, isWrapped) {
        const flickityIndex = this._getFlickityIndex(id);

        if (!flickityIndex) {
            return false;
        }

        // Trigger the next slide
        this.instances[flickityIndex].instance.next(isWrapped);
    }


    /**
     * Move to the previous slide
     *
     * @param {Bool} isWrapped
     */
    previous(id, isWrapped) {
        const flickityIndex = this._getFlickityIndex(id);

        if (!flickityIndex) {
            return false;
        }

        // Trigger the next slide
        this.instances[flickityIndex].instance.previous(isWrapped);
    }


    /**
     * Select a slide
     *
     * @param {String} id
     * @param {Number} index
     * @param {Bool} isWrapped
     * @param {Bool} isInstant
     */
    select(id, index, isWrapped = false, isInstant = false) {
        const flickityIndex = this._getFlickityIndex(id);

        if (!flickityIndex) {
            return false;
        }

        // Trigger the next slide
        this.instances[flickityIndex].instance.select(index, isWrapped, isInstant);
    }


    /**
     * Get the current slide index
     *
     * @param {String} id
     * @return {Number} index
     */
    getSelectedIndex(id) {
        const flickityIndex = this._getFlickityIndex(id);

        if (!flickityIndex) {
            return false;
        }

        // Return the current index
        return this.instances[flickityIndex].instance.selectedIndex;
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

        // If no instances exist, cancel
        if (this.instances.length < 1) {

            return false;

        } else {
            // Try to find the instance by ID
            let flickityIndex = _.findIndex(this.instances, {
                id: id,
            });

            // If not found, return the first instance
            if (!flickityIndex) {
                flickityIndex = 0;
            }

            return flickityIndex;

        }

    }


}

