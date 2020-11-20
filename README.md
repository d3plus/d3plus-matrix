# d3plus-matrix

[![NPM Release](http://img.shields.io/npm/v/d3plus-matrix.svg?style=flat)](https://www.npmjs.org/package/d3plus-matrix) [![Build Status](https://travis-ci.org/d3plus/d3plus-matrix.svg?branch=master)](https://travis-ci.org/d3plus/d3plus-matrix) [![Dependency Status](http://img.shields.io/david/d3plus/d3plus-matrix.svg?style=flat)](https://david-dm.org/d3plus/d3plus-matrix) [![Gitter](https://img.shields.io/badge/-chat_on_gitter-brightgreen.svg?style=flat&logo=gitter-white)](https://gitter.im/d3plus/) 

Row/column layouts

## Installing

If you use NPM, run `npm install d3plus-matrix --save`. Otherwise, download the [latest release](https://github.com/d3plus/d3plus-matrix/releases/latest). The released bundle supports AMD, CommonJS, and vanilla environments. You can also load directly from [d3plus.org](https://d3plus.org):

```html
<script src="https://d3plus.org/js/d3plus-matrix.v0.1.full.min.js"></script>
```


## Simple Matrix

The [Matrix](http://d3plus.org/docs/#Matrix) class creates a simple rows/columns Matrix view of any dataset. You are required to set the [row](http://d3plus.org/docs/#Matrix.row) and [column](http://d3plus.org/docs/#Matrix.column) methods, as well as provide a unique index for each square using the [groupBy](http://d3plus.org/docs/#Viz.groupBy) method.

Everything else uses the same color and label methods as in other visualizations, such as the use of [colorScale](http://d3plus.org/docs/#Viz.colorScale) here to create a heatmap, and the use of the [rowConfig](http://d3plus.org/docs/#Matrix.rowConfig) and [columnConfig](http://d3plus.org/docs/#Matrix.columnConfig) methods, which are pass-throughs to the underling [Axis](http://d3plus.org/docs/#Axis) class displaying each corresponding set of labels.

```js
new d3plus.Matrix()
  .config({
    colorScale: "Trade Value",
    colorScaleConfig: {
      legendConfig: {
        title: "Trade Value"
      },
      scale: "jenks"
    },
    colorScalePosition: "right",
    column: "Importer Continent",
    columnConfig: {
      title: "Importer Continent"
    },
    data: "https://api.oec.world/tesseract/data.jsonrecords?cube=trade_i_baci_a_17&drilldowns=Year,Exporter+Continent,Importer+Continent&measures=Trade+Value&Year=2018",
    groupBy: ["Exporter Continent", "Importer Continent"],
    row: "Exporter Continent",
    rowConfig: {
      title: "Exporter Continent"
    },
    title: "Continent to Continent Product Trade",
    titleConfig: {
      fontSize: 20
    },
    tooltipConfig: {
      tbody: [
        ["Trade Value", function(d) { return Math.round(d["Trade Value"]) }]
      ]
    }
  })
  .render();
```


[<kbd><img src="/example/getting-started.png" width="990px" /></kbd>](https://d3plus.org/examples/d3plus-matrix/getting-started/)

[Click here](https://d3plus.org/examples/d3plus-matrix/getting-started/) to view this example live on the web.


### More Examples

 * [Radial Matrix](http://d3plus.org/examples/d3plus-matrix/radial-matrix/)<sup> ***New***</sup>

## API Reference

##### 
* [Matrix](#Matrix)
* [RadialMatrix](#RadialMatrix)

---

<a name="Matrix"></a>
#### **Matrix** [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L20)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [Matrix](#Matrix) ⇐ <code>Viz</code>
    * [new Matrix()](#new_Matrix_new)
    * [.cellPadding([*value*])](#Matrix.cellPadding)
    * [.column([*value*])](#Matrix.column)
    * [.columnConfig(*value*)](#Matrix.columnConfig) ↩︎
    * [.columnSort([*value*])](#Matrix.columnSort)
    * [.row([*value*])](#Matrix.row)
    * [.rowConfig(*value*)](#Matrix.rowConfig) ↩︎
    * [.rowSort([*value*])](#Matrix.rowSort)


<a name="new_Matrix_new" href="#new_Matrix_new">#</a> new **Matrix**()

Creates a simple rows/columns Matrix view of any dataset. See [this example](https://d3plus.org/examples/d3plus-matrix/getting-started/) for help getting started using the Matrix class.





<a name="Matrix.cellPadding" href="#Matrix.cellPadding">#</a> Matrix.**cellPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L163)

The pixel padding in between each cell.


This is a static method of [<code>Matrix</code>](#Matrix).


<a name="Matrix.column" href="#Matrix.column">#</a> Matrix.**column**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L176)

Determines which key in your data should be used for each column in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's column value.


This is a static method of [<code>Matrix</code>](#Matrix).


```js
function column(d) {
  return d.name;
}
```


<a name="Matrix.columnConfig" href="#Matrix.columnConfig">#</a> Matrix.**columnConfig**(*value*) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L186)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the column labels.


This is a static method of [<code>Matrix</code>](#Matrix), and is chainable with other methods of this Class.


<a name="Matrix.columnSort" href="#Matrix.columnSort">#</a> Matrix.**columnSort**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L199)

A sort comparator function that is run on the unique set of column values.


This is a static method of [<code>Matrix</code>](#Matrix).


```js
function column(a, b) {
  return a.localeCompare(b);
}
```


<a name="Matrix.row" href="#Matrix.row">#</a> Matrix.**row**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L212)

Determines which key in your data should be used for each row in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's row value.


This is a static method of [<code>Matrix</code>](#Matrix).


```js
function row(d) {
  return d.name;
}
```


<a name="Matrix.rowConfig" href="#Matrix.rowConfig">#</a> Matrix.**rowConfig**(*value*) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L222)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the row labels.


This is a static method of [<code>Matrix</code>](#Matrix), and is chainable with other methods of this Class.


<a name="Matrix.rowSort" href="#Matrix.rowSort">#</a> Matrix.**rowSort**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/Matrix.js#L235)

A sort comparator function that is run on the unique set of row values.


This is a static method of [<code>Matrix</code>](#Matrix).


```js
function row(a, b) {
  return a.localeCompare(b);
}
```

---

<a name="RadialMatrix"></a>
#### **RadialMatrix** [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L12)


This is a global class, and extends all of the methods and functionality of <code>Viz</code>.


* [RadialMatrix](#RadialMatrix) ⇐ <code>Viz</code>
    * [new RadialMatrix()](#new_RadialMatrix_new)
    * [.cellPadding([*value*])](#RadialMatrix.cellPadding)
    * [.column([*value*])](#RadialMatrix.column)
    * [.columnConfig(*value*)](#RadialMatrix.columnConfig) ↩︎
    * [.columnSort([*value*])](#RadialMatrix.columnSort)
    * [.innerRadius([*value*])](#RadialMatrix.innerRadius)
    * [.row([*value*])](#RadialMatrix.row)
    * [.rowSort([*value*])](#RadialMatrix.rowSort)


<a name="new_RadialMatrix_new" href="#new_RadialMatrix_new">#</a> new **RadialMatrix**()

Creates a radial layout of a rows/columns Matrix of any dataset. See [this example](https://d3plus.org/examples/d3plus-matrix/radial-matrix/) for help getting started using the Matrix class.





<a name="RadialMatrix.cellPadding" href="#RadialMatrix.cellPadding">#</a> RadialMatrix.**cellPadding**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L160)

The pixel padding in between each cell.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


<a name="RadialMatrix.column" href="#RadialMatrix.column">#</a> RadialMatrix.**column**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L173)

Determines which key in your data should be used for each column in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's column value.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function column(d) {
  return d.name;
}
```


<a name="RadialMatrix.columnConfig" href="#RadialMatrix.columnConfig">#</a> RadialMatrix.**columnConfig**(*value*) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L183)

A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the column labels.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix), and is chainable with other methods of this Class.


<a name="RadialMatrix.columnSort" href="#RadialMatrix.columnSort">#</a> RadialMatrix.**columnSort**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L196)

A sort comparator function that is run on the unique set of column values.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function column(a, b) {
  return a.localeCompare(b);
}
```


<a name="RadialMatrix.innerRadius" href="#RadialMatrix.innerRadius">#</a> RadialMatrix.**innerRadius**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L209)

The radius (in pixels) for the inner donut hole of the diagram. Can either be a static Number, or an accessor function that receives the outer radius as it's only argument.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function(outerRadius) {
  return outerRadius / 5;
}
```


<a name="RadialMatrix.row" href="#RadialMatrix.row">#</a> RadialMatrix.**row**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L222)

Determines which key in your data should be used for each row in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's row value.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function row(d) {
  return d.name;
}
```


<a name="RadialMatrix.rowSort" href="#RadialMatrix.rowSort">#</a> RadialMatrix.**rowSort**([*value*]) [<>](https://github.com/d3plus/d3plus-matrix/blob/master/src/RadialMatrix.js#L235)

A sort comparator function that is run on the unique set of row values.


This is a static method of [<code>RadialMatrix</code>](#RadialMatrix).


```js
function row(a, b) {
  return a.localeCompare(b);
}
```

---



###### <sub>Documentation generated on Fri, 20 Nov 2020 15:38:17 GMT</sub>
