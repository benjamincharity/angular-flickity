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
        // Assign or fall back to a default
        this.wrapAround = this.bcFlickityPrevious || this.FlickityConfig.wrapAround || true;
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

            if (this.bcFlickityId) {
                this.flickityId = this.bcFlickityId;
                resolve(this.flickityId);
            } else {
                this.$timeout(() => {
                    this.FlickityService.getFirst()
                        .then((instance) => {
                            this.flickityId = instance.id;
                            resolve(this.flickityId);
                        })
                        .catch((error) => {
                            this.$log.warn(error);
                            reject(error);
                        })
                    ;
                });
            }

        });
    }


}

