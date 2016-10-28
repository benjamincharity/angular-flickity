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
            //this.$scope.always = jasmine.createSpy('always');
            //this.$scope.done = jasmine.createSpy('done');
            //this.$scope.fail = jasmine.createSpy('fail');
            //this.$scope.progress = jasmine.createSpy('progress');
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

        it(`should instantiate a Flickity instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            console.log('compiled: ', this.element[0].id);


            this.FlickityService.create(this.element[0], 'js_demo').then((instance) => {
                console.log('in test promise resolve: ', instance.id);

                const actual = instance.id;
                const expected = 'js_demo';

                expect(actual).toEqual(expected);

                console.log('before done');
                done();
            });


        });

    });








});

