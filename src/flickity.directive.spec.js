/*
 *describe('FlickityDirective', () => {
 *    let $compile;
 *    let $rootScope;
 *
 *    // Include the module
 *    beforeEach(angular.mock.module('bc.Flickity'));
 *
 *    beforeEach(function() {
 *
 *        inject(function($compile, $rootScope) {
 *            this.$compile = $compile;
 *            this.$rootScope = $rootScope;
 *
 *            this.$scope = this.$rootScope.$new();
 *            //this.$scope.always = jasmine.createSpy('always');
 *            //this.$scope.done = jasmine.createSpy('done');
 *            //this.$scope.fail = jasmine.createSpy('fail');
 *            //this.$scope.progress = jasmine.createSpy('progress');
 *        });
 *
 *    });
 *
 *
 *    beforeEach(function() {
 *        this.compileDirective = function(template) {
 *            this.element = this.$compile(template)(this.$scope);
 *            this.vm = this.element.isolateScope().vm;
 *        };
 *    });
 *
 *
 *    afterEach(function() {
 *        this.element.remove();
 *    });
 *
 *    describe('create()', () => {
 *
 *        it(`should use $element when nothing is passed in`, function(done) {
 *            const template = angular.element(`
 *                <div
 *                    class="demo__slides"
 *                    bc-flickity="{{ flickityOptions }}"
 *                    bc-flickity-id="demoId1"
 *                >
 *                    <figure class="demo__slide" data-ng-repeat="slide in slides track by $index">
 *                        <img data-ng-src="{{ ::slide }}" alt="" />
 *                    </figure>
 *
 *                </div>
 *            `);
 *
 *            this.compileDirective(template);
 *
 *            // Wait for the images to load
 *            setTimeout(() => {
 *                // Verify that two images were added
 *                const actual = this.vm.instance.images.length;
 *                const expected = 1;
 *                expect(actual).toEqual(expected);
 *
 *                done();
 *            }, WAIT);
 *        });
 *
 *    });
 *
 *
 *
 *
 *
 *
 *    // Inject
 *    beforeEach(inject((_$compile_, _$rootScope_) => {
 *        $compile = _$compile_;
 *        $rootScope = _$rootScope_;
 *    }));
 *
 *
 *    describe('create()', () => {
 *        let $scope;
 *        let element;
 *        let $ctrl;
 *
 *        beforeEach(() => {
 *            $scope = $rootScope.$new();
 *            $scope.neededLength = 4;
 *            element = angular.element(`
 *                <div
 *                    class="demo__slides"
 *                    bc-flickity="{{ flickityOptions }}"
 *                    bc-flickity-id="demoId1"
 *                >
 *                    <figure class="demo__slide" data-ng-repeat="slide in slides track by $index">
 *                        <img data-ng-src="{{ ::slide }}" alt="" />
 *                    </figure>
 *
 *                </div>
 *            `);
 *            element = $compile(element)($scope);
 *            $scope.$apply();
 *            $ctrl = element.isolateScope().vm;
 *        });
 *
 *        it('should instantiate a Flickity instance', () => {
 *            //expect(typeof vm.bcNumberModel).toEqual('string');
 *        });
 *
 *        it('should create an ID if one was not passed in', () => {
 *        });
 *
 *    });
 *
 *});
 *
 *
 */
