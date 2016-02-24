export class FlickityController {

    constructor(
        FlickityConfig
    ) {
        'ngInject';

        this.FlickityConfig = FlickityConfig;


        this._activate();

    }




    _activate() {

        // Extend the default options with user configuration
        this.options = angular.extend({}, this.FlickityConfig, angular.fromJson(this.bcFlickity));

        // If the user has defined events
        if (this.bcFlickityEvents) {
            // Merge the user defined and default events
            this.defaultEvents = this._mergeEvents(this.FlickityConfig.defaultEvents,
                                                    this.bcFlickityEvents);
        } else {
            // No user events, just use the default
            this.defaultEvents = this.FlickityConfig.defaultEvents;
        }

        console.log('defaultEvents: ', this.defaultEvents);


    }


    /**
     * Merge event arrays and remove duplicates
     *
     * @param {Array} defaultEvents
     * @param {Array} userDefinedEvents
     * @return {Array} deduplicatedEvents
     */
    _mergeEvents(defaultEvents, userDefinedEvents) {
        // Merge defaultEvents with user defined events
        const allEvents = defaultEvents.concat(userDefinedEvents);

        // Remove any duplicate items
        const deduplicated = Array.from(new Set(allEvents));

        return deduplicated;
    }

}

