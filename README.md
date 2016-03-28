# Angular Flickity

[**Simple Demo (Plunker)**][demo_basic]

_Comments and pull requests welcome!_

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
        - [`getFirst`](#getFirst)
        - [`getByElement`](#getbyelement)
    - [Properties](#properties)
        - [`selectedIndex`](#selectedindex)
        - [`selectedElement`](#selectedelement)
        - [`cells`](#cells)
- [Events](#events)
- [Development](#development)
- [About Flickity](#about-flickity)


## Installation

#### NPM
```bash
npm install angular-flickity --save
```

#### Bower
```bash
bower install angular-flickity --save
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


## Dependencies

- [Flickity.js (1.1.2)](http://flickity.metafizzy.co/)


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

This directive supports all options for version `1.1.2` of Flickity. A full list of options can be
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
export class MyController() {
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
Options](http://flickity.metafizzy.co/options.html).

```javascript
// ES6 Config Example
export function config(FlickityConfigProvider) {
    'ngInject';

    FlickityConfigProvider.prevNextButtons = false;
    FlickityConfigProvider.draggable = false;

}
```

```javascript
// ES5 Config Example
angular.module('myModule')
  .config((FlickityConfigProvider) => {
    'ngInject';

    FlickityConfigProvider.prevNextButtons = false;
    FlickityConfigProvider.draggable = false;

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

If no ID is set, the directive will assume that only one instance exists and grab the first
instance.

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

If no ID is set, the directive will assume that only one instance exists and grab the first
instance.

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

- - -

> _Don't be afraid to look at the [source code][source]. It isn't terribly complicated and fairly well
> commented._

### Initialize

#### `create`

This can be called to manually create a new `Flickity` instance.

[Create Demo (Plunker)][demo_create]

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
> Anytime you are dealing with the DOM from inside a controller (yuck) make sure to use
> document.ready. This ensures that the element you are looking for actually exists. You can also
> use a $timeout but I find using document.ready more accurately represents the intention.

```javascript
angular.element($document[0]).ready(() => {
    // Get the element that should hold the slider
    const element = angular.element(document.getElementById('demo-slider'));

    // Initialize our Flickity instance
    FlickityService.create(element[0], element[0].id);
});
```

### Selecting Cells

#### `select`

Move directly to a specific slide.

[Select Demo (Plunker)][demo_select]

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
FlickityService.previous(id, isWrapped)
```

##### Parameters

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance to move.
- `isWrapped`: `{Bool}` _optional_
  - Default: `false`
  - If `true` and `previous` is called when on the first slide, the slider will wrap around to show
      the last slide.
  - If `false` and `previous` is called when on the first slide, the slider will do nothing.

##### Returns `Promise`

- `instance`: `{Object}`


#### `next`

Move to the next slide.

```javascript
FlickityService.next(id, isWrapped)
```

##### Parameters

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance to move.
- `isWrapped`: `{Bool}` _optional_
  - Default: `false`
  - If `true` and `next` is called when on the last slide, the slider will wrap back to show slide 1.
  - If `false` and `next` is called when on the last slide, the slider will do nothing.

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


#### `reloadCells`

Re-collect all cell elements in `flickity-slider`.

```javascript
FlickityService.reloadCells(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


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
FlickityService.getSelectedIndex(id)
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

[Cells Demo (Plunker)][demo_select]

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

**[Events Demo (Plunker)][demo_events]**

> _Learn more in the [Angular docs on `$emit`][emit]._

### $emit

Each `$emit` event is named in this format: `Flickity:[instanceId]:[eventName]`

So, for example, if you had declared a [custom ID](#id) of `myCustomId` on `bc-flickity` and wanted
to know when the `settle` event occurs, you could listen for it like this:

```javascript
// Assume the gallery has been initialized with the custom ID of `myCustomId`
const settle = $rootScope.$on('Flickity:myCustomId:settle', (event, data) => {
    console.log('Flickity just settled!');
});
```

#### Resolve

- `event` is the Angular emit event object
- `data` is the `Flickity` instance from [`FlickityService`](#services)

#### Format: `eventName` => `Flickity:instanceId:eventName`

- `cellSelect` => `Flickity:instanceId:cellSelect`
- `settle` => `Flickity:instanceId:settle`
- `dragStart` => `Flickity:instanceId:dragStart`
- `dragMove` => `Flickity:instanceId:dragMove`
- `dragEnd` => `Flickity:instanceId:dragEnd`
- `pointerDown` => `Flickity:instanceId:pointerDown`
- `pointerMove` => `Flickity:instanceId:pointerMove`
- `pointerUp` => `Flickity:instanceId:pointerUp`
- `staticClick` => `Flickity:instanceId:staticClick`
- `lazyLoad` => `Flickity:instanceId:lazyLoad`

> _Learn more about [Flickity events][flickity_events]._


**Don't forget:**

The `$on` call should always be assigned to a variable. This allows it to be destroyed during the
`$scope` cleanup.

> _Learn more about [$destroy][destroy]._

- - -


## Development

* `npm run build`
  - Produces uncompressed (`.js`) and minified (`.min.js`) versions of the library under the `dist` folder.
* `npm run watch`
  - Watches for changes inside `/src` and calls `npm run build` when changes are detected.


## About Flickity

> _Touch, responsive, flickable galleries._

- [Flickity on Github][flickity]
- [Flickity Documentation][flickity_docs]



[flickity_api]: http://flickity.metafizzy.co/api.html
[flickity_options]: http://flickity.metafizzy.co/options.html
[flickity_events]: http://flickity.metafizzy.co/api.html#events
[flickity]: https://github.com/metafizzy/flickity
[flickity_docs]: http://flickity.metafizzy.co
[source]: https://github.com/benjamincharity/angular-flickity/tree/master/src
[emit]: https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$emit
[destroy]: https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$destroy
[demo_basic]: http://embed.plnkr.co/gFwwJf/
[demo_events]: http://embed.plnkr.co/k7Xw4t/
[demo_select]: http://embed.plnkr.co/qdyKKo/
[demo_create]: http://embed.plnkr.co/hkT7Tx/
