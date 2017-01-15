export class PreviousController {

    constructor(
        $log, $q, $timeout,
        FlickityConfig, FlickityService
    ) {
        'ngInject';

        this.$log = $log;
        this.$q = $q;
        this.$timeout = $timeout;
        this.FlickityConfig = FlickityConfig;
        this.FlickityService = FlickityService;


        this._activate();

    }




    _activate() {
        // Assign wrap around or fall back to a default
        if (typeof this.bcFlickityPrevious !== 'undefined') {
            this.wrapAround = this.bcFlickityPrevious;
        } else if (typeof this.FlickityConfig.wrapAround !== 'undefined') {
            this.wrapAround = this.FlickityConfig.wrapAround;
        } else {
            this.wrapAround = false;
        }
        this.flickityId = null;

        // Make sure we have an ID
        this._setId();
    }


    /**
     * Set ID to what is defined, fallback to first instance
     *
     * @return {String} flickityId
     */
    _setId() {
        return new Promise((resolve, reject) => {
            this.$timeout(() => {

                if (this.bcFlickityId) {
                    this.flickityId = this.bcFlickityId;
                    return resolve(this.flickityId);
                } else {
                    this.$timeout(() => {
                        this.FlickityService.getFirst()
                            .then((instance) => {
                                this.flickityId = instance.id;
                                return resolve(this.flickityId);
                            })
                            .catch((error) => {
                                this.$log.warn(error);
                                return reject(error);
                            })
                        ;
                    });
                }

            });
        });
    }


}

