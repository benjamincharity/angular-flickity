# Angular Flickity

**NOTE:** This project is still in **alpha**. I reserve the right to make potentially breaking changes
until this reaches `1.0.0` (although, of course I will try not to).

[**Plunker Demo**](http://plnkr.co/edit/gFwwJf?p=preview)


#### Note when using Flickity via bower

In my experience, including Flickity through bower often doesn't work out of the box. By default,
bower pulls in the unpackaged files as the Flickity `bower.json` specifies rather than packaged
files which seems to be what we need.

The trick is to specify which files bower should use in your own `bower.json`.

```json
// inside your bower.json specify which Flickity files to use
{
  "name": "myProject",
  "version": "0.0.0",
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


## Methods


### Next

The directive `bc-flickity-next` is provided to call the `next()` method on the `Flickity` instance.

```html
<button bc-flickity-next>Next</button>
```

You can also pass in an optional parameter to control the looping. If `true`, the first cell will be
selected if at the last cell. If `false`, it will do nothing when at the last cell.

```html
<button bc-flickity-next="true">Next</button>
```


### Previous

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


## Scripts

* `npm run build`
  - Produces uncompressed (`.js`) and minified (`.min.js`) versions of the library under the `dist` folder.
* `npm run watch`
  - Watches for changes inside `/src` and calls `npm run build` when changes are detected.


## About Flickity.js

> _Touch, responsive, flickable galleries._

- [Flickity on Github](https://github.com/metafizzy/flickity)
- [Flickity Documentation](http://flickity.metafizzy.co/)

