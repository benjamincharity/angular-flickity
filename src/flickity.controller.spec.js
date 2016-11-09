describe('FlickityController', () => {
    let $compile;
    let $rootScope;

    beforeEach(angular.mock.module('bc.Flickity'));

    beforeEach(function() {

        inject(function($compile, $rootScope, $timeout, FlickityService) {
            this.$compile = $compile;
            this.$rootScope = $rootScope;
            this.$timeout = $timeout;
            this.FlickityService = FlickityService;

            this.$scope = this.$rootScope.$new();
            this.$scope.slides = [
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide1.jpg',
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide2.jpg',
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide3.jpg',
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide4.jpg',
            ];
            this.$scope.flickityOptions = {
                accessibility: false,
            };
        });

    });

    beforeEach(function() {
        this.compileDirective = function(template) {
            const angularElement = angular.element(template);
            this.element = this.$compile(angularElement)(this.$scope);
            this.$scope.$digest();
        };
    });

    afterEach(function() {
        if (this.element) {
            this.element.remove();
        }
    });



    describe(`options`, () => {

        it(`should merge user options with config`, function(done) {
            const template = `
                <div>
                    <div bc-flickity="{{ flickityOptions }}">
                        <figure data-ng-repeat="slide in slides track by $index">
                            <img data-ng-src="{{ slide }}" alt="" />
                        </figure>
                    </div>
                </div>
            `;
            this.compileDirective(template);
            const directiveElement = angular.element(this.element.find('div'));
            this.FlickityController = directiveElement.controller('bcFlickity');

            // We must wrap in a $timeout since create() is also in a $timeout
            this.$timeout(() => {
                const actual = this.FlickityController.options.accessibility;
                const expected = false;

                expect(actual).toEqual(expected);
                done();
            });

            this.$timeout.flush();
            this.$timeout.verifyNoPendingTasks();
        });

        it(`should work if the user passes in no options`, function(done) {
            const template = `
                <div>
                    <div bc-flickity>
                        <figure data-ng-repeat="slide in slides track by $index">
                            <img data-ng-src="{{ slide }}" alt="" />
                        </figure>
                    </div>
                </div>
            `;
            this.compileDirective(template);
            const directiveElement = angular.element(this.element.find('div'));
            this.FlickityController = directiveElement.controller('bcFlickity');

            // We must wrap in a $timeout since create() is also in a $timeout
            this.$timeout(() => {
                const actual = this.FlickityController.options.accessibility;
                const expected = true;

                expect(actual).toEqual(expected);
                done();
            });

            this.$timeout.flush();
            this.$timeout.verifyNoPendingTasks();
        });

    });

});

