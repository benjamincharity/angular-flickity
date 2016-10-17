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
        this.options =
            angular.extend({}, this.FlickityConfig, angular.fromJson(this.bcFlickity || {}));
    }


}

