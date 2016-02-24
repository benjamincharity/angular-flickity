export class FlickityController {

    constructor(
        $timeout,
        FlickityConfig, EventsService
    ) {
        'ngInject';

        this.$timeout = $timeout;
        this.FlickityConfig = FlickityConfig;
        this.EventsService = EventsService;


        this._activate();

    }




    _activate() {

        // Extend the default options with user configuration
        this.options = angular.extend({}, this.FlickityConfig, angular.fromJson(this.bcFlickity));

        this.defaultEvents = this.FlickityConfig.defaultEvents;

    }


    bindEvents() {
        console.log('in CTRL bindEvents');
        this.EventsService.bindEvents(this.bcFlickityId, this.defaultEvents);
    }



}

