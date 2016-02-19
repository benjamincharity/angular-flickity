import { FlickityProvider } from './flickity.provider'
import { FlickityDirective } from './flickity.directive';
import { FlickityService } from './flickity.service';
import { FlickityNextDirective } from './flickityNext.directive';
import { FlickityPreviousDirective } from './flickityPrevious.directive';

angular.module('bc.Flickity', [])
    .provider('FlickityProvider', FlickityProvider)
    .directive('bcFlickity', FlickityDirective)
    .service('FlickityService', FlickityService)
    .directive('bcFlickityNext', FlickityNextDirective)
    .directive('bcFlickityPrevious', FlickityPreviousDirective)
;

