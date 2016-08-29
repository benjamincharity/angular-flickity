import { Flickity } from 'flickity';

export function FlickityFactory(
    $window
) {
    'ngInject';
    console.log('in factory: ', Flickity, $window.Flickity);

    // Get a local handle on the global reference
    const Flickity = $window.Flickity;

    // Delete the global reference to make sure no one gets lazy
    delete($window.Flickity);

}

