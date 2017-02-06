describe('FlickityNextDirective', () => {
    let $compile;
    let $rootScope;

    // Include the module
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
                groupCells: 2,
                prevNextButtons: true,
                wrapAround: false,
            };
        });

    });


    beforeEach(function() {
        this.compileDirective = function(template) {
            this.element = this.$compile(template)(this.$scope);
            this.$scope.$digest();
        };
    });


    afterEach(function() {
        if (this.element) {
            this.element.remove();
        }
    });

    describe(`when wrapping is set to false`, () => {

        it(`should disable button when at the end`, function(done) {
            const template = angular.element(`
                <div id="wrapper">
                    <div id="js_demo" bc-flickity="{{ flickityOptions }}">
                        <figure data-ng-repeat="slide in slides track by $index">
                            <img data-ng-src="{{ slide }}" alt="" />
                        </figure>
                    </div>
                    <button id="next" bc-flickity-next bc-flickity-id="js_demo">
                        Next
                    </button>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'js_demo';
            const DELAY = 300;

            // We must wrap in a $timeout since create() is also in a $timeout
            this.$timeout(() => {
                Array.apply(null, Array(this.$scope.slides.length / 2 - 1))
                    .reduce((acc) => acc.then(() => this.FlickityService.next(customID)), Promise.resolve())
                    .then((data) => {
                        const button = angular.element(data.instance.element.querySelector('button.next'));
                        const actual = button.attr('disabled');

                        expect(actual).toBeTruthy();
                        done();
                    });
            }, DELAY);

            this.$timeout.flush();
            this.$timeout.verifyNoPendingTasks();
        });

    });

});


