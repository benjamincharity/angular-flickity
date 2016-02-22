import { FlickityConfigProvider } from './flickity.provider'
import { FlickityService } from './flickity.service';
import { FlickityDirective } from './flickity.directive';
import { FlickityNextDirective } from './flickityNext.directive';
import { FlickityPreviousDirective } from './flickityPrevious.directive';

angular.module('bc.Flickity', [])
    .provider('FlickityConfig', FlickityConfigProvider)
    .service('FlickityService', FlickityService)
    .directive('bcFlickity', FlickityDirective)
    .directive('bcFlickityNext', FlickityNextDirective)
    .directive('bcFlickityPrevious', FlickityPreviousDirective)
;

