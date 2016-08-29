/* global Flickity */
import { FlickityConfigProvider } from './flickity.provider'
import { FlickityService } from './flickity.service';
import { FlickityDirective } from './flickity.directive';
import { FlickityNextDirective } from './next/flickityNext.directive';
import { FlickityPreviousDirective } from './previous/flickityPrevious.directive';
console.log('Flickity in DIRECTIVE: ', Flickity, window.Flickity);

angular.module('bc.Flickity', [])
    .provider('FlickityConfig', FlickityConfigProvider)
    .service('FlickityService', FlickityService)
    .directive('bcFlickity', FlickityDirective)
    .directive('bcFlickityNext', FlickityNextDirective)
    .directive('bcFlickityPrevious', FlickityPreviousDirective)
;

