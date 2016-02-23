export class NextController {

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
        // Assign or fall back to default
        this.wrapAround = this.bcFlickityNext || this.FlickityConfig.wrapAround;
        this.flickityId = null;
        this.cellCount;
        this.selectedIndex;
        this.bcIsDisabled = false;

        // Make sure we have an ID before we wire everything up
        this._setId().then(() => {

            // Get the cells
            this.FlickityService.cells(this.flickityId).then((cells) => {
                console.log('cells: ', cells, cells.length);

                // Save the count
                this.cellCount = cells.length;
            });

        });


    }


    setDisabledState() {
        console.log('in setDisabledStateeeeee');

        // If we can wrap, we should never disable
        if (this.wrapAround) {
            this.bcIsDisabled = false;
        } else {
            // if we cannot wrap

            // If we are at the end
            if (this.cellCount - this.selectedIndex < 1) {
                this.bcIsDisabled = true;
            } else {
                this.bcIsDisabled = false;
            }
        }

        console.log('in setDisabledState: ', this.cellCount, this.selectedIndex, this.bcIsDisabled);

    }


    _setId() {

        return this.$q((resolve, reject) => {

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

