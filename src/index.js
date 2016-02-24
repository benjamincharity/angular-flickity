import { FlickityConfigProvider } from './flickity.provider'
import { FlickityService } from './flickity.service';
import { EventsService } from './events.service';
import { FlickityDirective } from './flickity.directive';
import { FlickityNextDirective } from './next/flickityNext.directive';
import { FlickityPreviousDirective } from './previous/flickityPrevious.directive';

angular.module('bc.Flickity', [])
    .provider('FlickityConfig', FlickityConfigProvider)
    .service('FlickityService', FlickityService)
    .service('EventsService', EventsService)
    .directive('bcFlickity', FlickityDirective)
    .directive('bcFlickityNext', FlickityNextDirective)
    .directive('bcFlickityPrevious', FlickityPreviousDirective)
;

