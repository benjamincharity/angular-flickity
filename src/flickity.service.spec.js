/* global set */
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
        });

    });


    beforeEach(function() {
        this.compileDirective = function(template) {
            this.element = this.$compile(template)(this.$scope);
            this.vm = this.element.isolateScope().vm;
        };
    });


    afterEach(function() {
        this.element.remove();
    });

    describe('create()', () => {

        it(`should instantiate a Flickity instance`, function(done) {
            const template = angular.element(`
                <div
                    class="demo__slides"
                    bc-flickity="{{ flickityOptions }}"
                    bc-flickity-id="demoId1"
                    id="demo-slider"
                >
                    <figure class="demo__slide" data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ ::slide }}" alt="" />
                    </figure>

                </div>
            `);
            jasmine.set(template)
            //this.element = $(template);
            //$(document.body).append(this.element);

            const element = angular.element(document.getElementById('demo-slider'));
            console.log('element: ', element);
            //this.FlickityService.create(element[0], element[0].id)



            // Verify that two images were added
            const actual = this.vm.instance.images.length;
            const expected = 1;
            expect(actual).toEqual(expected);
        });

    });








});

