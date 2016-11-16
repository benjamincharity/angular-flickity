# Angular Flickity

<img src="http://cdn.benjamincharity.com/open_source/angular-flickity/mark.png" align="right" alt="angular-flickity">

[![MIT License][license_image]][license_url] [![Coverage Status][coverage_image]][coverage_url] [![NPM version][npm_version_image]][npm_url] [![CircleCI][circle_badge]][circle_link]

An AngularJS module that exposes a directive and service to create and control multiple
[Flickity][flickity] instances.

> [:tv: **Demos and Examples**][demo_collection]

[Flickity][flickity] by [Metafizzy][metafizzy]

_[Comments and pull requests welcome!][issues]_

## Contents

- [Installation](#installation)
  - [Dependencies](#dependencies)
- [Usage](#usage)
- [Options](#options)
- [ID](#id)
- [Global Defaults](#global-defaults)
- [Directives](#directives)
    - [`bc-flickity`](#bc-flickity)
    - [`bc-flickity-next`](#bc-flickity-next)
    - [`bc-flickity-previous`](#bc-flickity-previous)
- [Services](#services)
    - [Initialize](#initialize)
        - [`create`](#create)
    - [Selecting Cells](#selecting-cells)
        - [`select`](#select)
        - [`previous`](#previous)
        - [`next`](#next)
    - [Sizing and Positioning](#sizing-and-positioning)
        - [`resize`](#resize)
        - [`reposition`](#reposition)
    - [Adding and Removing Cells](#adding-and-removing-cells)
        - [`prepend`](#prepend)
        - [`append`](#append)
        - [`insert`](#insert)
        - [`remove`](#remove)
    - [Utilities](#utilities)
        - [`destroy`](#destroy)
        - [`reloadCells`](#reloadcells)
        - [`getCellElements`](#getcellelements)
        - [`get`](#get)
        - [`getFirst`](#getfirst)
        - [`getByElement`](#getbyelement)
    - [Properties](#properties)
        - [`selectedIndex`](#selectedindex)
        - [`selectedElement`](#selectedelement)
        - [`cells`](#cells)
- [Events](#events)
  - [Events and Parameters](#eventsandparameters)
  - [Event Naming Convention](#eventnamingconvention)
- [Demos](#demos)
- [Development](#development)
- [About Flickity](#about-flickity)

---

## Installation

#### Dependencies

- [AngularJS `(^1.4.0)`][angular]
- [Flickity `(^2.0.5)`][flickity_docs]
- [flickity-imagesloaded `(^2.0.0)`][flickity_imagesloaded] (if using the [imagesloaded option][flickity_options])
- [flickity-bg-lazyload `(^1.0.0)`][flickity-bg-lazyload] (if using the [bgLazyLoad option][flickity_options])


#### NPM

```bash
npm install flickity --save
npm install flickity-imagesloaded --save # if using the imagesloaded option
npm install flickity-bg-lazyload --save # if using the bg-lazyload option
npm install angular-flickity --save
```

#### Bower

```bash
bower install flickity --save
bower install flickity-imagesloaded --save # if using the imagesloaded option
bower install flickity-bg-lazyload --save # if using the bg-lazyload option
bower install angular-flickity --save
```

### Include the scripts

Include `Flickity` (and `flickity-imagesloaded`/`flickity-bg-lazyload` if needed):

#### Webpack

```
import Flickity from 'flickity';
import 'flickity-imagesloaded';
import 'flickity-bg-lazyload';
import 'angular-flickity';

angular.module('myProject', ['bc.Flickity']);
```

#### Manually

```
<!-- Include the module -->
<script src="path/to/lib/flickity.js"></script>
<script src="path/to/lib/flickity-imagesloaded.js"></script>
<script src="path/to/lib/flickity-bg-lazyload.js"></script>
<script src="path/to/angular-flickity/dist/angular-flickity.js"></script>
```


##### Note when using Flickity via bower

In my experience, including Flickity through bower often doesn't work out of the box. By default,
bower pulls in the unpackaged files as the Flickity `bower.json` specifies rather than packaged
files which seems to be what we need.

The trick is to specify which files bower should use in your own `bower.json`.

```json
// inside your bower.json specify which Flickity files to use
{
  "name": "myProject",
  "overrides": {
    "flickity": {
      "main": [
        "dist/flickity.pkgd.js",
        "dist/flickity.min.css"
      ]
    }
  }
}
```


## Usage

Include `bc.Flickity` as a dependency in your project.

```javascript
angular.module('YourModule', ['bc.Flickity']);
```

Use the directive on the parent element containing your slides.

```html
<!-- Define the gallery: -->
<div
  bc-flickity="{{ vm.flickityOptions }}"
  id="myCustomId"
>
  <figure class="demo__slide" data-ng-repeat="slide in vm.slides">
      <img data-ng-src="{{ slide }}" alt="" />
  </figure>
</div>

<!-- Define the previous button (optional): -->
<button
  bc-flickity-previous
  bc-flickity-id="myCustomId"
>Previous</button>

<!-- Define the next button (optional): -->
<button
  bc-flickity-next
  bc-flickity-id="myCustomId"
>Next</button>
```


## Options

This module supports all options for Flickity version `2.0.5`. A full list of options can be
found here: [Flickity Options](http://flickity.metafizzy.co/options.html).

Simply pass in an object containing any options you'd like to set.

```javascript
// ES5 example
angular.module('myModule')
  .controller('MyController', ($scope) => {

    $scope.myCustomOptions = {
      cellSelector: '.mySlideClassName',
      initialIndex: 3,
      prevNextButtons: false,
    };

  })
;


// ES6 example
export class MyController {
  constructor() {

    this.flickityOptions = {
      cellSelector: '.mySlideClassName',
      initialIndex: 3,
      prevNextButtons: false,
    };

  }
}
```

`my.template.html`:
```html
<!-- In your template -->
<div bc-flickity="{{ myCustomOptions }}">
  <div class="mySlideClassName"></div>
  <div class="mySlideClassName"></div>
  ...
</div>
```


## ID

The `FlickityService` uses IDs to manage multiple instances of the directive. An ID is automatically
created and assigned at initialization. However, at times you may need to access your instances in a
programmatic way. There are two ways for IDs to be defined by your module.

#### Element ID

If the element containing the `bc-flickity` directive has an ID attribute, the value will
be used to create the ID.

```html
<!-- This instance would have the ID of `foo` -->
<div
  bc-flickity="{{ myCustomOptions }}"
  id="foo"
>
  <!-- slides -->
</div>
```

#### Explicitly Define

At times, you may not be able to use an element ID (or simply prefer not to). In those cases you can
pass the ID in directly as a string using `bc-flickity-id`.

```html
<!--  This instance would have the ID of `bar` -->
<div
  bc-flickity="{{ myCustomOptions }}"
  bc-flickity-id="bar"
>
  <!-- slides -->
</div>
```


## Global Defaults

This module exposes `FlickityConfigProvider` which can be used to set project-wide defaults for
Flickity. Simply set any options here using options that match the original [Flickity
options](http://flickity.metafizzy.co/options.html).

```javascript
// ES6 Config Example
export function config(FlickityConfigProvider) {
    'ngInject';

    FlickityConfigProvider.prevNextButtons = true;
    FlickityConfigProvider.setGallerySize = false;

}
```

```javascript
// ES5 Config Example
angular.module('myModule')
    .config((FlickityConfigProvider) => {
        'ngInject';

        FlickityConfigProvider.prevNextButtons = true;
        FlickityConfigProvider.setGallerySize = false;

    })
;
```


## Directives

### `bc-flickity`

The directive `bc-flickity` creates the Flickity gallery.

```html
<div bc-flickity>
  <!-- slides -->
</div>
```

You may optionally pass an options object to the directive. User defined options will override any
default options.

```html
<div bc-flickity="{{ vm.flickityOptions }}">
  <!-- slides -->
</div>
```

> _Learn more about [`angular-flickity` options](#options) & [Flickity options
> documentation][flickity_options]_


### `bc-flickity-next`

The directive `bc-flickity-next` is provided to call the `next()` method on a `Flickity` instance.

```html
<button bc-flickity-next>Next</button>
```

#### Multiple Instances

If you need to support multiple `Flickity` instances in a single view you can specify an instance ID
that the control should be linked to.

```javascript
<button
  bc-flickity-next
  bc-flickity-id="customId"
>Next</button>
```

> _More on setting the ID using a [directive](#id) or [service](#initialize)._

If no ID is set, the directive will assume that only one instance exists and grab the ID from the
first instance.

#### Looping

This directive accepts an optional parameter to control the looping. If `true` and at the last cell
when clicked, Flickity will loop back to the first cell. If `false`, it will do nothing when
clicked at the last cell.

```html
<button bc-flickity-next="true">Next</button>
```

#### Disabled

When the last cell is reached, the `disabled` attribute will be added to the element. The `disabled`
attribute will _not_ be added if either of these conditions are met:

- The associated gallery has `wrapAround` set to `true`.
- The directive has `true` passed in as the optional parameter (which overrides the default
    options).


### `bc-flickity-previous`

The directive `bc-flickity-previous` is provided to call the `previous()` method on the `Flickity`
instance.

```html
<button bc-flickity-previous>Previous</button>
```

#### Multiple Instances

If you need to support multiple `Flickity` instances in a single view you can specify an instance ID
that the control should be linked to.

```javascript
<button
  bc-flickity-next
  bc-flickity-id="customId"
>Next</button>
```

> _More on setting the ID using a [directive](#id) or [service](#initialize)._

If no ID is set, the directive will assume that only one instance exists and grab the ID from the
first instance.

#### Looping

This directive accepts an optional parameter to control the looping. If `true` and at the first cell
when clicked, Flickity will loop around to the last cell. If `false`, it will do nothing when
clicked at the first cell.

```html
<button bc-flickity-previous="true">Previous</button>
```

#### Disabled

When at the first cell, the `disabled` attribute will be added to the element. The `disabled`
attribute will _not_ be added if either of these conditions are met:

- The associated gallery has `wrapAround` set to `true`.
- The directive has `true` passed in as the optional parameter (which overrides the default
    options).


- - -


## Services

While you can easily use Flickity via the directive only, most Flickity methods are accessible via
the `FlickityService`.

> The services here follow the order of the [Flickity Documentation][flickity_api] as closely as possible
in order to be immediately familiar. This shouldn't feel like learning another library (assuming
you are already familiar with Flickity).

> [:tv: Service demo][demo_service_select]

- - -

> _Don't be afraid to look at the [source code][source]. It isn't terribly complicated and fairly well
> commented._

### Initialize

#### `create`

This can be called to manually create a new `Flickity` instance.

> [:tv: Create instance demo][demo_create_remote_docready]

```javascript
FlickityService.create(element, id, options)
```

##### Parameters

- `element`: `{Element}`
  - A DOM element wrapped as a jQuery object. This can be done with jqLite
      (`angular.element(element)`) or jQuery (`$(element)`)
- `id`: `{String}` _optional_
  - ID for the created `Flickity` instance. If no ID is assigned, one will be created and used
      internally.
- `options`: `{Object}` _optional_
  - Options object for Flickity

##### Returns `Promise`

- `instance`: `{Object}`

```javascript
// Example return
{
    id: 'foo',
    instance: Flickity
};
```

> **NOTE:**
> Anytime you are dealing with the DOM from inside a controller (:-1:) make sure to use
> document.ready. This ensures that the element you are looking for actually exists. You can also
> use a $timeout but I find using document.ready more accurately represents the intention.

> [:tv: Demo showing DOM issue and solution][demo_create_remote_docready]

```javascript
// document.ready example
angular.element($document[0]).ready(() => {
    // Get the element that should hold the slider
    const element = angular.element(document.getElementById('demo-slider'));

    // Initialize our Flickity instance
    FlickityService.create(element[0], element[0].id);
});
```

> **NOTE:**
> If you are dealing with remote data, you should wrap the `.create()` call with a `$timeout`.
> This ensures that the data has already been assigned to scope before the slider is initialized.

> [:tv: Demo with remote data][demo_create_remote_docready]

```javascript
// Remote data example
$http.get('http://yourRemoteSource.com/slides.json')
  .then((results) => {

    // Expose the slides array to $scope
    $scope.slides = results.data;

    // Get the element that should hold the slider
    const element = angular.element(document.getElementById('demo-slider'));

    // NOTE: When fetching remote data, we initialize the Flickity
    // instance inside of a $timeout. This ensures that the slides
    // have already been assigned to scope before the slider is
    // initialized.
    $timeout(() => {
      // Initialize our Flickity instance
      FlickityService.create(element[0], element[0].id);
    });
  });
```

### Selecting Cells

#### `select`

Move directly to a specific slide.

> [:tv: Selecting a cell demo][demo_service_select]

```javascript
FlickityService.select(id, index, isWrapped, isInstant)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance to move.
- `index`: `{Number}`
- `isWrapped`: `{Bool}` _optional_
  - Default: `false`
  - If `true` and `previous` is called when on the first slide, the slider will wrap around to show
      the last slide.
  - If `true` and `next` is called when on the last slide, the slider will wrap back to show slide 1.
- `isInstant`: `{Bool}` _optional_
  - Default: `false`
  - If `true` the slide will change instantly with no animation.

##### Returns `Promise`

- `instance`: `{Object}`


#### `previous`

Move to the previous slide.

```javascript
FlickityService.previous(id, isWrapped, isInstant)
```

##### Parameters

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance to move.
- `isWrapped`: `{Bool}` _optional_
  - Default: `false`
  - If `true` and `previous` is called when on the first slide, the slider will wrap around to show
      the last slide.
  - If `false` and `previous` is called when on the first slide, the slider will do nothing.
- `isInstant`: `{Bool}` _optional_
  - Default: `false`
  - If `true` the slide will change instantly with no animation.

##### Returns `Promise`

- `instance`: `{Object}`


#### `next`

Move to the next slide.

```javascript
FlickityService.next(id, isWrapped, isInstant)
```

##### Parameters

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance to move.
- `isWrapped`: `{Bool}` _optional_
  - Default: `false`
  - If `true` and `next` is called when on the last slide, the slider will wrap back to show slide 1.
  - If `false` and `next` is called when on the last slide, the slider will do nothing.
- `isInstant`: `{Bool}` _optional_
  - Default: `false`
  - If `true` the slide will change instantly with no animation.

##### Returns `Promise`

- `instance`: `{Object}`


#### `cellSelect`

Select a slide of a cell.

```javascript
FlickityService.cellSelect(id, value, isWrapped, isInstant)
```

##### Parameters

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance to move.
- `value`: `{Integer|String}`
  - Zero-based index OR selector string of the cell to select.
- `isWrapped`: `{Bool}` _optional_
  - Default: `false`
  - If `true` and `previous` is called when on the first slide, the slider will wrap around to show
      the last slide.
  - If `true` and `next` is called when on the last slide, the slider will wrap back to show slide 1.
- `isInstant`: `{Bool}` _optional_
  - Default: `false`
  - If `true` the slide will change instantly with no animation.

##### Returns `Promise`

- `instance`: `{Object}`



### Sizing and Positioning

#### `resize`

Triggers Flickity to resize the gallery and re-position cells.

```javascript
FlickityService.resize(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


#### `reposition`

Tell Flickity to reposition cells while retaining the current index. Useful if cell sizes change
after initialization.

```javascript
FlickityService.reposition(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


### Adding and Removing Cells

> Note: If you are trying to add cell(s) by appending to a 'slides' array and then reinitializing
> the slider, take a look at this [:tv: demo][demo_inject_slide]

#### `prepend`

Create cells at the beginning of the gallery and prepend elements.

```javascript
FlickityService.prepend(id, elements)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.
- `elements`: `{Object|Array|Element|NodeList}`
  - jQuery object, Array of Elements, Element, or NodeList

##### Returns `Promise`

- `instance`: `{Object}`


#### `append`

Create cells at the end of the gallery and append elements.

```javascript
FlickityService.append(id, elements)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.
- `elements`: `{Object|Array|Element|NodeList}`
  - jQuery object, Array of Elements, Element, or NodeList

##### Returns `Promise`

- `instance`: `{Object}`


#### `insert`

Insert elements into the gallery and create cells at the desired index.

```javascript
FlickityService.insert(id, elements, index)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.
- `elements`: `{Object|Array|Element|NodeList}`
  - jQuery object, Array of Elements, Element, or NodeList
- `index`: `{Integer}`
  - Zero based integer where the new slides should be inserted.

##### Returns `Promise`

- `instance`: `{Object}`


### `remove`

Remove cells from the gallery and remove the elements from DOM.

```javascript
FlickityService.remove(id, elements)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.
- `elements`: `{Object|Array|Element|NodeList}`
  - jQuery object, Array of Elements, Element, or NodeList

##### Returns `Promise`

- `instance`: `{Object}`


### Utilities

#### `destroy`

Destroys a `Flickity` instance.

```javascript
FlickityService.destroy(id)
```

##### Parameters

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance to be destroyed.

##### Returns `Promise`

- `isDestroyed`: `{Bool}`

This is very useful when your Flickity instance is created inside a controller attached to a route.
Each time the route is hit, the route's controller calls to create a new Flickity instance. But if
that instance already exists, it will cause an error. The correct way to handle this is to destroy
the Flickity instance when the controller is being destroyed.

```javascript
$scope.$on('$destroy', () => {
  FlickityService.destroy(instanceId);
});
```


#### `reloadCells`

Re-collect all cell elements in `flickity-slider`.

```javascript
FlickityService.reloadCells(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`

> Note: If you are trying to add cell(s) by appending to a 'slides' array and then reinitializing
> the slider, take a look at this [:tv: demo][demo_inject_slide]

#### `getCellElements`

Get the elements of the cells.

```javascript
FlickityService.getCellElements(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `cellElements`: `{Array}`


#### `get`

Return a `Flickity` instance found by ID.

```javascript
FlickityService.get(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


#### `getFirst`

Return the first `Flickity` instance.

```javascript
FlickityService.getFirst()
```

##### Returns `Promise`

- `instance`: `{Object}`


#### `getByElement`

Find a `Flickity` instance by element or selector string.

```javascript
FlickityService.getByElement(id, element)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.
- `element`: `{Element}`
  - Element or selector string representing the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


### Properties

### `selectedIndex`

Get the index of the slide currently in view.

```javascript
FlickityService.selectedIndex(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance for which you need the index.

##### Returns `Promise`

- `selectedIndex`: `{Number}`
  - The index of the currently visible slide.


### `selectedElement`

Get the currently selected cell element.

```javascript
FlickityService.selectedElement(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `selectedElement`: `{Element}`


### `cells`

Get all cells.

> [:tv: Get all cells demo][demo_service_select]

```javascript
FlickityService.cells(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `cells`: `{Array}`


- - -


## Events

All events trigger an associated `$emit` on `$rootScope`.

> [:tv: Events demo][demo_events]

> _Learn more in the [Angular docs on `$emit`][emit]._

Each `$emit` event is named in this format: `Flickity:[instanceId]:[eventName]`

So, for example, if you had declared a [custom ID](#id) of `myCustomId` on `bc-flickity` and wanted
to know when the `settle` event occurs, you could listen for it like this:

```javascript
// Assume the gallery has been initialized with the custom ID of `myCustomId`
const settle = $rootScope.$on('Flickity:myCustomId:settle', (event, data) => {
    console.log('Flickity just settled!', event, data);
});
```


### Events and Parameters

> For more information on individual events, check out the [Flickity Documentation on Events][flickity_events].

```javascript
// Legend
• eventName
  • parameter
```

- `select`
- `scroll`
  - `progress`
  - `positionX`
- `settle`
- `dragStart`
  - `event`
  - `pointer`
- `dragMove`
  - `event`
  - `pointer`
  - `moveVector`
- `dragEnd`
  - `event`
  - `pointer`
- `pointerDown`
  - `event`
  - `pointer`
- `pointerMove`
  - `event`
  - `pointer`
  - `moveVector`
- `pointerUp`
  - `event`
  - `pointer`
- `staticClick`
  - `event`
  - `pointer`
  - `cellElement`
  - `cellIndex`
- `lazyLoad`
  - `event`
  - `cellElement`


#### Event Naming Convention

**`eventName` => `Flickity:instanceId:eventName`**

| Event name | `$emit` name |
|------------|--------------|
|`select`|`Flickity:instanceId:select`|
|`scroll`|`Flickity:instanceId:scroll`|
|`settle`|`Flickity:instanceId:settle`|
|`dragStart`|`Flickity:instanceId:dragStart`|
|`dragMove`|`Flickity:instanceId:dragMove`|
|`dragEnd`|`Flickity:instanceId:dragEnd`|
|`pointerDown`|`Flickity:instanceId:pointerDown`|
|`pointerMove`|`Flickity:instanceId:pointerMove`|
|`pointerUp`|`Flickity:instanceId:pointerUp`|
|`staticClick`|`Flickity:instanceId:staticClick`|
|`lazyLoad`|`Flickity:instanceId:lazyLoad`|

> _Learn more about [Flickity events][flickity_events]._


**Don't forget:**

The `$on` call should always be assigned to a variable. This allows it to be destroyed during the
`$scope` cleanup.

> _Learn more about [$destroy][destroy]._

- - -


## Demos

- [All demos][demo_collection]
- [Simple][demo_basic]
- [Multiple instances on a page][demo_multiple_instances]
- [Using events][demo_events]
- [Using the service and selecting a cell][demo_service_select]
- [Create via the service and loading remote data][demo_create_remote_docready]
- [Inject a slide][demo_inject_slide]
- [bgLazyLoad][demo_bglazyload]


## Development

* `npm run build`
  - Produces uncompressed (`.js`) and minified (`.min.js`) versions of the library under the `dist` folder.
* `npm run watch`
  - Watches for changes inside `/src` and calls `npm run build` when changes are detected.
* `npm run test`
  - Runs all tests.
* `npm run watch:tests`
  - Watch for changes and re-run tests.

## About Flickity

> _Touch, responsive, flickable galleries._

Made by [Metafizzy][metafizzy] who make seriously [awesome][packery], [stuff][isotope].

- [Flickity on Github][flickity]
- [Flickity Documentation][flickity_docs]
- [Flickity Licensing][flickity_license]



[issues]: https://github.com/benjamincharity/angular-flickity/issues
[flickity_api]: http://flickity.metafizzy.co/api.html
[flickity_options]: http://flickity.metafizzy.co/options.html
[flickity_events]: http://flickity.metafizzy.co/api.html#events
[flickity]: https://github.com/metafizzy/flickity
[flickity_docs]: http://flickity.metafizzy.co
[source]: https://github.com/benjamincharity/angular-flickity/tree/master/src
[emit]: https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$emit
[destroy]: https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$destroy
[desandro]: http://desandro.com
[metafizzy]: http://metafizzy.co/
[packery]: http://packery.metafizzy.co/
[isotope]: http://isotope.metafizzy.co/
[flickity_license]: http://flickity.metafizzy.co/license.html
[angular]: https://angularjs.org
[flickity_imagesloaded]: https://github.com/metafizzy/flickity-imagesloaded
[flickity-bg-lazyload]: https://github.com/metafizzy/flickity-bg-lazyload

[demo_collection]: http://codepen.io/collection/nNzQxk/
[demo_basic]: http://codepen.io/benjamincharity/pen/amxVaV?editors=1000
[demo_multiple_instances]: http://codepen.io/benjamincharity/pen/dpEqoj?editors=1000
[demo_events]: http://codepen.io/benjamincharity/pen/yaWxor?editors=0010
[demo_service_select]: http://codepen.io/benjamincharity/pen/KgLxRW?editors=0010
[demo_create_remote_docready]: http://codepen.io/benjamincharity/pen/NRVLEb?editors=0010
[demo_inject_slide]: http://codepen.io/benjamincharity/pen/qaGJmW?editors=0010
[demo_bglazyload]: http://codepen.io/kukac7/pen/vyXjBp

[license_image]: http://img.shields.io/badge/license-MIT-blue.svg
[license_url]: LICENSE
[npm_url]: https://npmjs.org/package/angular-flickity
[npm_version_image]: http://img.shields.io/npm/v/angular-flickity.svg
[coverage_image]: https://coveralls.io/repos/github/benjamincharity/angular-flickity/badge.svg
[coverage_url]: https://coveralls.io/github/benjamincharity/angular-flickity
[circle_badge]: https://circleci.com/gh/benjamincharity/angular-flickity/tree/master.svg?style=svg
[circle_link]: https://circleci.com/gh/benjamincharity/angular-flickity/tree/master
