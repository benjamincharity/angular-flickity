# Angular Flickity


## Demo

[http://plnkr.co/edit/gFwwJf?p=preview](http://plnkr.co/edit/gFwwJf?p=preview)


## Dependencies

- [Flickity.js (1.1.2)](http://flickity.metafizzy.co/)


## Options

This directive supports all options for version `1.1.2` of Flickity. A full list of options can be
found here: [Flickity Options](http://flickity.metafizzy.co/options.html).

Simply pass in an object containing any options you'd like to set.

```javascript
angular.module('myModule')
  .controller('MyController', ($scope) => {
    $scope.myCustomOptions = {
      initialIndex: 3,
      prevNextButtons: false,
    };
  });
```

`myCustom.template.js`:
```html
<!-- In your template -->
<div
  bc-flickity="{{ myCustomOptions }}"
>
  <!-- slides -->
</div>
```


## ID

The `FlickityService` uses IDs to manage multiple instances of the directive. An ID is automatically
created and assigned at initialization. However, at times you may need to access your instances in a
programmatic way. There are two ways for IDs to be assigned.

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


### Scripts

* `npm run build`
  - Produces uncompressed (`.js`) and minified (`.min.js`) versions of your library under the `dist` folder.
* `npm run watch`
  - Watches for changes inside `/src` and calls `npm run build` when changes are detected.


### About Flickity.js

> _Touch, responsive, flickable galleries._

- [Flickity on Github](https://github.com/metafizzy/flickity)
- [Flickity Docs](http://flickity.metafizzy.co/)


