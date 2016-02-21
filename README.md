# Angular Flickity

**NOTE:** This project is still in **alpha**. I reserve the right to make potentially breaking changes
until this reaches `1.0.0` (although, of course I will try not to).

[**Plunker Demo**](http://plnkr.co/edit/gFwwJf?p=preview)

## Contents

- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Options](#options)
- [ID](#id)
- [Global Defaults](#global-defaults)
- [Directives](#directives)
- [Directives](#directives)
  - [`bc-flickity-next`](#bc-flickity-next)
  - [`bc-flickity-previous`](#bc-flickity-previous)
- [Services](#services)
  - [`create`](#create)
  - [`destroy`](#destroy)
  - [`next`](#next)
  - [`previous`](#previous)
  - [`select`](#select)
  - [`getSelectedIndex`](#getselectedindex)
- [Scripts](#scripts)
- [About Flickity.js](#about-flickityjs)


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
<div bc-flickity>

    <figure data-ng-repeat="slide in slides">
        <img data-ng-src="{{ slide }}" alt="" />
    </figure>

</div>
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

### `bc-flickity-next`

The directive `bc-flickity-next` is provided to call the `next()` method on the `Flickity` instance.

```html
<button bc-flickity-next>Next</button>
```

You can also pass in an optional parameter to control the looping. If `true`, the first cell will be
selected if at the last cell. If `false`, it will do nothing when at the last cell.

```html
<button bc-flickity-next="true">Next</button>
```


### `bc-flickity-previous`

The directive `bc-flickity-previous` is provided to call the `previous()` method on the `Flickity`
instance.

```html
<button bc-flickity-previous>Previous</button>
```

You can also pass in an optional parameter to control the looping. If `true`, the last cell will be
selected if at the first cell. If `false`, it will do nothing when at the first cell.

```html
<button bc-flickity-previous="true">Previous</button>
```

- - -


## Services

While you can easily use Flickity via the directive only, most Flickity methods are accessible via
the `FlickityService`.

> _Don't be afraid to look at the source code. It isn't terribly complicated and fairly well
> commented._

### `create`

This can be called to manually create a new `Flickity` instance.

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

### `destroy`

Destroys a `Flickity` instance.

```javascript
FlickityService.destroy(id)
```

##### Parameters

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance to be destroyed.

##### Returns `Promise`

- `isDestroyed`: `{Bool}`


### `next`

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


### `previous`

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


### `select`

Move directly to a specific slide.

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


### `getSelectedIndex`

Get the index of the slide currently in view.

```javascript
FlickityService.getSelectedIndex(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance for which you need the index.

##### Returns `Promise`

- `selectedIndex`: `{Number}`
  - The index of the currently visible slide.


### `resize`

Triggers Flickity to resize the gallery and re-position cells.

```javascript
FlickityService.resize(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


### `reposition`

Tell Flickity to reposition cells while retaining the current index. Useful if cell sizes change
after initialization.

```javascript
FlickityService.reposition(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


### `reloadCells`

Re-collect all cell elements in `flickity-slider`.

```javascript
FlickityService.reloadCells(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


### `get`

Return a `Flickity` instance found by ID.

```javascript
FlickityService.get(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


### `getByElement`

Prepend elements and create cells to the beginning of the gallery.

```javascript
FlickityService.getByElement(id, element)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.
- `element`: `{Element}`
  - Element or selector string representing the `Flickity` instance.

##### Returns `Promise`

- `instance`: `{Object}`


### `prepend`

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


### `append`

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


### `insert`

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


### `getCellElements`

Get the elements of the cells.

```javascript
FlickityService.getCellElements(id)
```

- `id`: `{String}`
  - A string representing the ID of the `Flickity` instance.

##### Returns `Promise`

- `cellElements`: `{Array}`

- - -


## Scripts

* `npm run build`
  - Produces uncompressed (`.js`) and minified (`.min.js`) versions of the library under the `dist` folder.
* `npm run watch`
  - Watches for changes inside `/src` and calls `npm run build` when changes are detected.


## About Flickity.js

> _Touch, responsive, flickable galleries._

- [Flickity on Github](https://github.com/metafizzy/flickity)
- [Flickity Documentation](http://flickity.metafizzy.co/)

