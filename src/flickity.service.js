export class FlickityService {

    constructor(
        $timeout
    ) {
        'ngInject';

        this.$timeout = $timeout;

        this.instances = [];

    }



    create(element, id, options) {
        const instance = {
            id: id || this.createId(),
            instance: new Flickity(element, options),
        };

        // Save this instance to the array
        this.instances.push(instance);

        console.log('created new flickity: ', this.instances);

        this.$timeout(() => {
            this.destroy(instance.id);
        }, 5000);

        return instance;
    }


    /**
     * Helper function to create a random ID
     *
     * @return {String} id
     */
    createId() {
        return s4() + s4() + s4() + s4() + s4();

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
    }


    /**
     * Destroy a Flickity instance
     *
     * @param {String} id
     */
    destroy(id) {

        const flickityIndex = _.findIndex(this.instances, {
            id: id,
        });

        if (flickityIndex < 0) {
            console.warn('Flickity instance not found!', flickityIndex);

            return false;
        }

        // Destroy the Flickity instance
        this.instances[flickityIndex].instance.destroy();

        // Remove the instance from the array
        this.instances.splice(flickityIndex, 1);

    }


    /**
     * Move to the next slide
     *
     * @param {Bool} isWrapped
     */
    next(id, isWrapped) {
        const flickityIndex = _.findIndex(this.instances, {
            id: id,
        });

        if (flickityIndex < 0) {
            console.warn('Flickity instance not found!', flickityIndex);

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
        const flickityIndex = _.findIndex(this.instances, {
            id: id,
        });

        if (flickityIndex < 0) {
            console.warn('Flickity instance not found!', flickityIndex);

            return false;
        }

        // Trigger the next slide
        this.instances[flickityIndex].instance.previous(isWrapped);
    }


    select(id, index, isWrapped = false, isInstant = false) {
        const flickityIndex = _.findIndex(this.instances, {
            id: id,
        });

        if (flickityIndex < 0) {
            console.warn('Flickity instance not found!', flickityIndex);

            return false;
        }

        // Trigger the next slide
        this.instances[flickityIndex].instance.select(index, isWrapped, isInstant);
    }

}

