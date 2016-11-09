describe('FlickityDirective', () => {
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
            this.$scope.extraSlide =
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide5.jpg';
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

    describe(`on $scope.$destroy()`, () => {

        it(`should destroy the Flickity instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo" bc-flickity>
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const DELAY = 200;

            this.$timeout(() => {
                this.FlickityService.getAll().then((instances) => {
                    const actual = instances.length;
                    const expected = 1;

                    expect(actual).toEqual(expected);

                    this.$scope.$destroy();

                    this.FlickityService.getAll().then((instances) => {
                        const actual = instances.length;
                        const expected = 0;

                        expect(actual).toEqual(expected);

                        done();
                    });
                });
            });

            this.$timeout.flush();

            this.$timeout.verifyNoPendingTasks();
        });

    });


});


