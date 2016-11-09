describe('NextController', () => {
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
                prevNextButtons: false,
                wrapAround: false,
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



    describe(`this.flickityId`, () => {

        it(`should be set to the passed in ID`, function(done) {
            const template = `
                <div id="wrapper">
                    <div id="instanceId" bc-flickity="{{ flickityOptions }}">
                        <figure data-ng-repeat="slide in slides track by $index">
                            <img data-ng-src="{{ slide }}" alt="" />
                        </figure>
                    </div>
                    <button bc-flickity-next bc-flickity-id="buttonId">
                        Next
                    </button>
                </div>
            `;
            this.compileDirective(template);
            const directiveElement = angular.element(this.element.find('button'));
            this.NextController = directiveElement.controller('bcFlickityNext');

            // We must wrap in a $timeout since create() is also in a $timeout
            this.$timeout(() => {
                const actual = this.NextController.flickityId;
                const expected = 'buttonId';

                expect(actual).toEqual(expected);
                done();
            });

            this.$timeout.flush();
            this.$timeout.verifyNoPendingTasks();
        });

        it(`should be set to the ID of the first instance`, function(done) {
            const template = `
                <div id="wrapper">
                    <div id="instanceId" bc-flickity="{{ flickityOptions }}">
                        <figure data-ng-repeat="slide in slides track by $index">
                            <img data-ng-src="{{ slide }}" alt="" />
                        </figure>
                    </div>
                    <button bc-flickity-next>
                        Next
                    </button>
                </div>
            `;
            this.compileDirective(template);
            const directiveElement = angular.element(this.element.find('button'));
            const DELAY = 300;
            this.NextController = directiveElement.controller('bcFlickityNext');

            this.$timeout(() => {
                this.FlickityService.getFirst().then((instance) => {
                    const actual = this.NextController.flickityId;
                    const expected = instance.id;

                    expect(actual).toEqual(expected);
                    done();
                });
            }, DELAY);

            this.$timeout.flush();
            this.$timeout.verifyNoPendingTasks();
        });

    });

});

