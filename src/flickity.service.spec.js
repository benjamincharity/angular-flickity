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

    describe(`create()`, () => {

        it(`should instantiate a Flickity instance with a custom ID`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'create';

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

        it(`should instantiate a Flickity instance with a dynamic ID`, function(done) {
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

        it(`should reject creation if the ID is already in use`, function(done) {
            const template = angular.element(`
                <div>
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'createReject';

            this.FlickityService.create(this.element[0], testId).then((instance) => {
                const actual = instance.id;
                const expected = testId;

                expect(actual).toEqual(expected);

                this.FlickityService.create(this.element[0], testId).catch((error) => {
                    const actual = error;
                    const expected = `This ID is already in use.`;

                    expect(actual).toEqual(expected);
                    done();
                });
            });
        });

    });


    describe(`destroy()`, () => {

        it(`should destroy a Flickity instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'destroy';

            this.FlickityService.create(this.element[0], testId).then(() => {
                this.FlickityService.getAll().then((results) => {
                    const actual = results.length;
                    const expected = 1;

                    // Verify an instance was created
                    expect(actual).toEqual(expected);

                    this.FlickityService.destroy(testId).then(() => {
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

        it(`should reject if destroying an instance that doesn't exist`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'destroyReject';
            const fakeId = 'destroyRejectFake';

            this.FlickityService.create(this.element[0], testId).then(() => {
                this.FlickityService.getAll().then((results) => {
                    const actual = results.length;
                    const expected = 1;

                    expect(actual).toEqual(expected);

                    this.FlickityService.destroy(fakeId).catch((error) => {
                        const actual = error;
                        const expected = `Instance ${fakeId} not found.`;

                        expect(actual).toEqual(expected);
                        done();
                    });
                });
            });
        });

    });


    describe(`getAll()`, () => {

        it(`should return all instances`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const idOne = 'getAllOne';
            const idTwo = 'getAllTwo';

            this.FlickityService.create(this.element[0], idOne).then(() => {
                this.FlickityService.getAll().then((results) => {
                    const actual = results.length;
                    const expected = 1;

                    // Verify a singe instance was returned
                    expect(actual).toEqual(expected);

                    this.FlickityService.create(this.element[0], idTwo).then(() => {
                        this.FlickityService.getAll().then((results) => {
                            const actual = results.length;
                            const expected = 2;

                            // Verify both instances are returned
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });

    });


    describe(`next()`, () => {

        it(`should move to the next slide`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'next';

            this.FlickityService.create(this.element[0], testId).then(() => {
                this.FlickityService.selectedIndex(testId).then((result) => {
                    const actual = result;
                    const expected = 0;

                    // Verify the index '0' is selected
                    expect(actual).toEqual(expected);

                    this.FlickityService.next(testId).then(() => {
                        this.FlickityService.selectedIndex(testId).then((result) => {
                            const actual = result;
                            const expected = 1;

                            // Verify the index '1' is selected
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });

        it(`should wrap when moving to the next slide`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'nextWrap';
            const options = {
                initialIndex: 3,
            };

            this.FlickityService.create(this.element[0], testId, options).then(() => {
                this.FlickityService.selectedIndex(testId).then((result) => {
                    const actual = result;
                    const expected = 3;

                    // Verify the index '3' is selected
                    expect(actual).toEqual(expected);

                    this.FlickityService.next(testId, true).then(() => {
                        this.FlickityService.selectedIndex(testId).then((result) => {
                            const actual = result;
                            const expected = 0;

                            // Verify the index '0' is selected
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });

    });


    describe(`previous()`, () => {

        it(`should move to the previous slide`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'previous';
            const options = {
                initialIndex: 2,
            };

            this.FlickityService.create(this.element[0], testId, options).then(() => {
                this.FlickityService.selectedIndex(testId).then((result) => {
                    const actual = result;
                    const expected = 2;

                    // Verify the index '0' is selected
                    expect(actual).toEqual(expected);

                    this.FlickityService.previous(testId).then(() => {
                        this.FlickityService.selectedIndex(testId).then((result) => {
                            const actual = result;
                            const expected = 1;

                            // Verify the index '1' is selected
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });

        it(`should wrap when moving to the previous slide`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'previousWrap';

            this.FlickityService.create(this.element[0], testId).then(() => {
                this.FlickityService.selectedIndex(testId).then((result) => {
                    const actual = result;
                    const expected = 0;

                    // Verify the index '0' is selected
                    expect(actual).toEqual(expected);

                    this.FlickityService.previous(testId, true).then(() => {
                        this.FlickityService.selectedIndex(testId).then((result) => {
                            const actual = result;
                            const expected = 3;

                            // Verify the index '3' is selected
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });

    });


    describe(`select()`, () => {

        it(`should select a slide`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'select';
            const newIndex = 2;

            this.FlickityService.create(this.element[0], testId).then(() => {
                this.FlickityService.selectedIndex(testId).then((result) => {
                    const actual = result;
                    const expected = 0;

                    // Verify the index '0' is selected
                    expect(actual).toEqual(expected);

                    this.FlickityService.select(testId, newIndex).then(() => {
                        this.FlickityService.selectedIndex(testId).then((result) => {
                            const actual = result;
                            const expected = newIndex;

                            // Verify the index '2' is selected
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });

    });


    describe(`selectCell()`, () => {

        it(`should select a slide with a selector string`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure
                        class="slide{{ $index }}"
                        data-ng-repeat="slide in slides track by $index"
                    >
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'selectCell';

            this.FlickityService.create(this.element[0], testId).then(() => {
                this.FlickityService.selectedIndex(testId).then((result) => {
                    const actual = result;
                    const expected = 0;

                    // Verify the index '0' is selected
                    expect(actual).toEqual(expected);

                    this.FlickityService.selectCell(testId, '.slide3').then(() => {
                        this.FlickityService.selectedIndex(testId).then((result) => {
                            const actual = result;
                            const expected = 3;

                            // Verify the index '3' is selected
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });

    });


    describe(`selectedIndex()`, () => {

        it(`should return the index of the current slide`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const testId = 'selectedIndex';
            const options = {
                initialIndex: 1,
            };

            this.FlickityService.create(this.element[0], testId, options).then(() => {
                this.FlickityService.selectedIndex(testId).then((result) => {
                    const actual = result;
                    const expected = 1;

                    // Verify the index '1' is selected
                    expect(actual).toEqual(expected);

                    this.FlickityService.next(testId).then(() => {
                        this.FlickityService.selectedIndex(testId).then((result) => {
                            const actual = result;
                            const expected = 2;

                            // Verify the index '2' is selected
                            expect(actual).toEqual(expected);
                            done();
                        });
                    });
                });
            });
        });

    });


    describe(`resize()`, () => {

        it(`should call resize() on the current instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'resize';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                spyOn(flickityInstance, 'resize');

                this.FlickityService.resize(customID).then((result) => {
                    expect(flickityInstance.resize).toHaveBeenCalled();
                    done();
                });
            });

        });

    });


    describe(`reposition()`, () => {

        it(`should call reposition() on the current instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'reposition';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                spyOn(flickityInstance, 'reposition');

                this.FlickityService.reposition(customID).then((result) => {
                    expect(flickityInstance.reposition).toHaveBeenCalled();
                    done();
                });
            });

        });

    });


    describe(`reloadCells()`, () => {

        it(`should call reloadCells() on the current instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'reloadCells';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                spyOn(flickityInstance, 'reloadCells');

                this.FlickityService.reloadCells(customID).then((result) => {
                    expect(flickityInstance.reloadCells).toHaveBeenCalled();
                    done();
                });
            });

        });

    });


    describe(`get()`, () => {

        it(`should return the instance with the matching ID`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'get';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                this.FlickityService.get(customID).then((result) => {
                    const actual = result.id;
                    const expected = customID;

                    expect(actual).toEqual(expected);
                    done();
                });
            });
        });

    });


    describe(`getFirst()`, () => {

        it(`should return the first instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'getFirst';
            const customIDTwo = 'getFirstSecond';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                this.FlickityService.create(this.element[0], customIDTwo).then((secondInstance) => {
                    const actual = secondInstance.id;
                    const expected = customIDTwo;

                    expect(actual).toEqual(expected);

                    this.FlickityService.getFirst().then((result) => {
                        const actual = result.id;
                        const expected = customID;

                        expect(actual).toEqual(expected);
                        done();
                    });
                });
            });
        });

    });


    describe(`getByElement()`, () => {

        it(`should return the instance attached to the element`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'getByElement';

            this.FlickityService.create(this.element[0], customID).then((created) => {
                this.FlickityService.getByElement(this.element[0]).then((instance) => {
                    expect(instance).toEqual(jasmine.any(Object));
                    done();
                });
            });
        });

    });


    describe(`prepend()`, () => {

        it(`should call prepend() on the current instance with the new elements`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);

            const slide = angular.element(`
                <figure>
                    <img data-ng-src="{{ extraSlide }}" alt="" />
                </figure>
            `);

            this.newElement = this.$compile(slide)(this.$scope);
            this.$scope.$digest();

            const customID = 'prepend';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                spyOn(flickityInstance, 'prepend');

                this.FlickityService.prepend(customID, this.newElement).then(() => {
                    expect(flickityInstance.prepend.calls.argsFor(0)[0]).toEqual(this.newElement);
                    done();
                });
            });
        });

    });


    describe(`append()`, () => {

        it(`should call append() on the current instance with the new elements`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);

            const slide = angular.element(`
                <figure>
                    <img data-ng-src="{{ extraSlide }}" alt="" />
                </figure>
            `);

            this.newElement = this.$compile(slide)(this.$scope);
            this.$scope.$digest();

            const customID = 'append';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                spyOn(flickityInstance, 'append');

                this.FlickityService.append(customID, this.newElement).then(() => {
                    expect(flickityInstance.append.calls.argsFor(0)[0]).toEqual(this.newElement);
                    done();
                });
            });
        });

    });


    describe(`insert()`, () => {

        it(`should call insert() on the current instance with the new elements`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);

            const slide = angular.element(`
                <figure>
                    <img data-ng-src="{{ extraSlide }}" alt="" />
                </figure>
            `);

            this.newElement = this.$compile(slide)(this.$scope);
            this.$scope.$digest();

            const customID = 'insert';
            const insertIndex = 3;

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                spyOn(flickityInstance, 'insert');

                this.FlickityService.insert(customID, this.newElement, insertIndex).then(() => {
                    expect(flickityInstance.insert.calls.argsFor(0)[0]).toEqual(this.newElement);
                    done();
                });
            });
        });

    });


    describe(`getCellElements()`, () => {

        it(`should call getCellElements() on the current instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'getCellElements';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                this.FlickityService.getCellElements(customID).then((cells) => {
                    const actual = cells.length;
                    const expected = 4;

                    expect(actual).toEqual(expected);
                    done();
                });
            });
        });

    });


    describe(`remove()`, () => {

        it(`should call remove() on the current instance with the element`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);

            const slide = angular.element(`
                <figure>
                    <img data-ng-src="{{ extraSlide }}" alt="" />
                </figure>
            `);

            this.newElement = this.$compile(slide)(this.$scope);
            this.$scope.$digest();

            const customID = 'remove';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                spyOn(flickityInstance, 'remove');

                this.FlickityService.remove(customID, this.newElement).then(() => {
                    expect(flickityInstance.remove.calls.argsFor(0)[0]).toEqual(this.newElement);
                    done();
                });
            });
        });

    });


    describe(`selectedElement()`, () => {

        it(`should return the currently selected element`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'selectedElement';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                this.FlickityService.selectedElement(customID).then((element) => {
                    expect(element.outerHTML).toContain('slide1.jpg');
                    done();
                });
            });
        });

    });


    describe(`cells()`, () => {

        it(`should return an array containing all cells`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = 'cells';

            this.FlickityService.create(this.element[0], customID).then((instance) => {
                const flickityInstance = instance.instance;
                const actual = instance.id;
                const expected = customID;

                expect(actual).toEqual(expected);

                this.FlickityService.cells(customID).then((cells) => {
                    const actual = cells.length;
                    const expected = 4;

                    expect(actual).toEqual(expected);
                    done();
                });
            });
        });

    });


    describe(`_getFlickityIndex()`, () => {

        it(`should return the index for a Flickity instance`, function(done) {
            const template = angular.element(`
                <div id="js_demo">
                    <figure data-ng-repeat="slide in slides track by $index">
                        <img data-ng-src="{{ slide }}" alt="" />
                    </figure>
                </div>
            `);
            this.compileDirective(template);
            const customID = '_getFlickityIndex';
            const customIDTwo = '_getFlickityIndex2';

            this.FlickityService.create(this.element[0], customID).then(() => {
                const actual = this.FlickityService._getFlickityIndex(customID);
                const expected = 0;

                expect(actual).toEqual(expected);

                this.FlickityService.create(this.element[0], customIDTwo).then((instance) => {
                    const actual = this.FlickityService._getFlickityIndex(customIDTwo);
                    const expected = 1;

                    expect(actual).toEqual(expected);
                    done();
                });
            });
        });

    });


    describe(`_findObjectById()`, () => {

        it(`should return an object with a matching ID if one exists`, function(done) {
            const objectsArray = [
                {
                    id: 'foo',
                    attr: 'object1',
                },
                {
                    id: 'bar',
                    attr: 'object2',
                },
                {
                    id: 'baz',
                    attr: 'object3',
                },
            ];

            const object = this.FlickityService._findObjectById(objectsArray, 'foo');
            const actual = object.attr;
            const expected = 'object1';
            expect(actual).toEqual(expected);

            const object2 = this.FlickityService._findObjectById(objectsArray, 'baz');
            const actual2 = object2.attr;
            const expected2 = 'object3';
            expect(actual2).toEqual(expected2);

            done();
        });

    });


});

