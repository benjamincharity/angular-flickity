export class EventsService {

    constructor(
        $q,
        FlickityService
    ) {
        'ngInject';

        this.FlickityService = FlickityService;


        this.$q = $q;

    }



    /**
     * Merge event arrays and remove duplicates
     *
     * @param {Array} defaultEvents
     * @param {Array} userDefinedEvents
     * @return {Array} deduplicatedEvents
     */
    mergeEvents(defaultEvents, userDefinedEvents) {
        return this.$q((resolve) => {

            // Merge defaultEvents with user defined events
            const allEvents = defaultEvents.concat(userDefinedEvents);

            // Remove any duplicate items
            const deduplicated = Array.from(new Set(allEvents));

            resolve(deduplicated);
        });
    }


    /**
     * Bind events to a Flickity instance
     *
     * @param {String} id
     * @param {Array} events
     */
    bindEvents(id, events) {
        return this.$q((resolve, reject) => {

            // Get the instance
            this.FlickityService.get(id)
                .then((flickity) => {
                    let event;

                    // Loop through events
                    for(event in events) {
                        // Bind each event to a function
                        flickity.instance.on(events[event], this['_' + events[event]]);
                    }

                    resolve(flickity);
                })
                .catch((error) => {
                    reject(error);
                })
            ;

        });
    }


    /**
     * Unbind events from a Flickity instance
     *
     * @param {String} id
     * @param {Array} events
     */
    unbindEvents(id, events) {
        return this.$q((resolve, reject) => {

            // Get the instance
            this.FlickityService.get(id)
                .then((flickity) => {
                    let event;

                    // Loop through events
                    for(event in events) {
                        // Unbind each event
                        flickity.instance.off(events[event], this['_' + events[event]]);
                    }

                    resolve(flickity);
                })
                .catch((error) => {
                    reject(error);
                })
            ;

        });
    }


    _cellSelect() {
        console.log('in _cellSelect');
    }


    _settle() {
        console.log('in _settle');
    }

}

