import { FlickityDirective } from './flickity.directive';
import { FlickityNextDirective } from './flickityNext.directive';
import { FlickityPreviousDirective } from './flickityPrevious.directive';

angular.module('bc.Flickity', [])
    .directive('bcFlickity', FlickityDirective)
    .directive('bcFlickityNext', FlickityNextDirective)
    .directive('bcFlickityPrevious', FlickityPreviousDirective)
;

