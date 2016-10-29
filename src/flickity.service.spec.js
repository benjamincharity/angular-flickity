/* global set, loadFixtures */
describe('FlickityService', () => {
    let $compile;
    let $rootScope;

    // Include the module
    beforeEach(angular.mock.module('bc.Flickity'));

    beforeEach(function() {

        inject(function($compile, $rootScope, FlickityService) {
            this.$compile = $compile;
            this.$rootScope = $rootScope;
            this.FlickityService = FlickityService;

            this.$scope = this.$rootScope.$new();
            this.$scope.slides = [
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide1.jpg',
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide2.jpg',
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide3.jpg',
                'http://cdn.benjamincharity.com/codepen/angular-flickity/slide4.jpg',
            ];
        });

    });


    beforeEach(function() {
        this.compileDirective = function(template) {
            this.element = this.$compile(template)(this.$scope);
        };
    });


    afterEach(function() {
        this.element.remove();
    });

    describe('create()', () => {

        it(`should instantiate a Flickity instance with a custom ID`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'myId';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);
                done();
            });
        });

        it(`should instantiate a Flickity instance with the element's ID`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);

            this.FlickityService.create(this.element[0]).then((instance) => {
                const actual = instance.id;
                const expected = 'js_demo';

                expect(actual).toEqual(expected);
                done();
            });
        });

        it(`should instantiate a Flickity instance with a created ID`, function(done) {
            const template = angular.element(`
                <div>
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);

            this.FlickityService.create(this.element[0]).then((instance) => {
                const actual = instance.id;
                const expected = 1;

                expect(actual).toEqual(expected);
                done();
            });
        });

    });


    describe('destroy()', () => {

        it(`should destroy a Flickity instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'myTest';

            this.FlickityService.create(this.element[0], testId).then((instance) => {
                this.FlickityService.getAll().then((results) => {
                    const actual = results.length;
                    const expected = 1;

                    // Verify an instance was created
                    expect(actual).toEqual(expected);

                    this.FlickityService.destroy(testId).then((result) => {
                        this.FlickityService.getAll().then((results) => {
                            const actual = results.length;
                            const expected = 0;

                            // Verify the instance was removed
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });


    });






});

