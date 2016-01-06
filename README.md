# Angular Flickity


## Demo

[http://plnkr.co/edit/gFwwJf?p=preview](http://plnkr.co/edit/gFwwJf?p=preview)


## Dependencies

- [Flickity.js (1.1.2)](http://flickity.metafizzy.co/)


## Options

This directive supports all options for version `1.1.2` of Flickity. A full list of options can be
found here: [Flickity Options](http://flickity.metafizzy.co/options.html).

The naming convention is to simply take the option name (eg. `cellSelector`), convert it to
[kebab-case](http://stackoverflow.com/a/12273101/722367) (eg. `cell-selector`) and add the
`flickity-` prefix.

Setting the option `initialIndex` would look like this:

```
<div
  bc-angular-flickity
  flickity-initial-index="3"
>
  <!-- slides -->
</div>
```


## Methods


### Next

The directive `bc-flickity-next` is provided to call the `next()` method on the Flickity instance.

```
<button bc-flickity-next>Next</button>
```

You can also pass in an optional parameter to control the looping.

```
// If true, the first cell will be selected if at the last cell.
// If false, it will do nothing when at the last cell.
<button bc-flickity-next="true">Next</button>
```


### Previous

The directive `bc-flickity-previous` is provided to call the `previous()` method on the Flickity
instance.

```
<button bc-flickity-previous>Previous</button>
```

You can also pass in an optional parameter to control the looping.

```
// If true, the last cell will be selected if at the first cell.
// If false, it will do nothing when at the first cell.
<button bc-flickity-previous="true">Previous</button>
```


- - -


### Scripts

* `npm run build` - produces production version of your library under the `dist` folder
* `npm run dev` - produces development version of your library and runs a watcher


### About Flickity.js

> _Touch, responsive, flickable galleries._

- [Flickity on Github](https://github.com/metafizzy/flickity)
- [Flickity Docs](http://flickity.metafizzy.co/)


