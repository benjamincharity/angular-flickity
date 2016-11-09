export class FlickityConfigProvider {

    constructor() {
        // Define Flickity defaults
        this.accessibility      = true;
        this.cellAlign          = 'center';
        this.freeScrollFriction = .075;
        this.friction           = .28;
        this.percentPosition    = true;
        this.resize             = true;
        this.selectedAttraction = .025;
        this.setGallerySize     = true;
    }




    $get() {
        return this;
    }


}

