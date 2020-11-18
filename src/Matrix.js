import {Axis} from "d3plus-axis";
import {accessor, assign, configPrep, elem, unique} from "d3plus-common";
import {Rect} from "d3plus-shape";
import {Viz} from "d3plus-viz";

const cartesian = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));

const defaultAxisConfig = {
  align: "start",
  barConfig: {
    stroke: 0
  },
  gridSize: 0,
  paddingInner: 0,
  paddingOuter: 0,
  scale: "band",
  tickSize: 0
};

/**
    @class Matrix
    @extends Viz
    @desc Uses the [d3 Matrix layout](https://github.com/mbostock/d3/wiki/Matrix-Layout) to creates SVG rectangles based on an array of data. See [this example](https://d3plus.org/examples/d3plus-hierarchy/getting-started/) for help getting started using the Matrix generator.
*/
export default class Matrix extends Viz {

  /**
    @memberof Matrix
    @desc Invoked when creating a new class instance, and sets any default parameters.
    @private
  */
  constructor() {

    super();

    this._column = accessor("column");
    this._columnAxis = new Axis();
    this._columnConfig = assign({orient: "top"}, defaultAxisConfig);
    this._columnSort = (a, b) => `${a}`.localeCompare(`${b}`);

    this._label = (d, i) => `${this._getProp("row", d, i)} / ${this._getProp("column", d, i)}`;

    const defaultMouseMoveShape = this._on["mousemove.shape"];
    this._on["mousemove.shape"] = (d, i) => {
      defaultMouseMoveShape(d, i);
      const row = this._getProp("row", d, i);
      const column = this._getProp("column", d, i);
      this.hover((h, ii) => this._getProp("row", h, ii) === row || this._getProp("column", h, ii) === column);
    };

    this._row = accessor("row");
    this._rowAxis = new Axis();
    this._rowConfig = assign({orient: "left"}, defaultAxisConfig);
    this._rowSort = (a, b) => `${a}`.localeCompare(`${b}`);

  }

  _getProp(type, d, i) {
    return d[type] || this[`_${type}`](d, i);
  }

  /**
      @memberof Matrix
      @desc Extends the draw behavior of the abstract Viz class.
      @private
  */
  _draw(callback) {

    const rowValues = unique(this._filteredData.map(this._row)).sort(this._rowSort);
    const columnValues = unique(this._filteredData.map(this._column)).sort(this._columnSort);

    if (!rowValues.length || !columnValues.length) return this;

    const height = this._height - this._margin.top - this._margin.bottom,
          parent = this._select,
          transition = this._transition,
          width = this._width - this._margin.left - this._margin.right;

    const hidden = {opacity: 0};
    const visible = {opacity: 1};

    const selectElem = (name, opts) => elem(`g.d3plus-Matrix-${name}`, Object.assign({parent, transition}, opts)).node();

    this._rowAxis
      .select(selectElem("row", {enter: hidden, update: hidden}))
      .domain(rowValues)
      .height(height)
      .maxSize(width / 2)
      .width(width)
      .config(this._rowConfig)
      .render();

    const rowPadding = this._rowAxis.outerBounds().width - this._rowAxis.padding() * 2;
    this._padding.left += rowPadding;

    let columnTransform = `translate(${rowPadding + this._margin.left}, ${this._margin.top})`;
    const hiddenTransform = Object.assign({transform: columnTransform}, hidden);

    this._columnAxis
      .select(selectElem("column", {enter: hiddenTransform, update: hiddenTransform}))
      .domain(columnValues)
      .height(height)
      .maxSize(height / 2)
      .width(width)
      .config(this._columnConfig)
      .render();

    const columnPadding = this._columnAxis.outerBounds().height - this._columnAxis.padding() * 2;
    this._padding.top += columnPadding;

    super._draw(callback);

    const rowTransform = `translate(${this._margin.left}, ${columnPadding + this._margin.top})`;
    columnTransform = `translate(${rowPadding + this._margin.left}, ${this._margin.top})`;
    const visibleTransform = Object.assign({transform: columnTransform}, visible);

    this._rowAxis
      .select(selectElem("row", {update: Object.assign({transform: rowTransform}, visible)}))
      .height(height - this._margin.top - this._margin.bottom - columnPadding)
      .width(rowPadding + this._rowAxis.padding() * 2)
      .render();

    this._columnAxis
      .select(selectElem("column", {update: visibleTransform}))
      .height(columnPadding + this._columnAxis.padding() * 2)
      .width(width - this._margin.left - this._margin.right - rowPadding)
      .render();

    const shapeData = cartesian(rowValues, columnValues)
      .map(([rowValue, columnValue]) => {
        const dataObj = {
          __d3plusTooltip__: true,
          __d3plus__: true,
          column: columnValue,
          row: rowValue
        };
        const dataIndex = this._filteredData
          .findIndex((d, i) => this._row(d, i) === rowValue && this._column(d, i) === columnValue);
        if (dataIndex >= 0) {
          dataObj.i = dataIndex;
          dataObj.data = this._filteredData[dataIndex];
        }
        else {
          dataObj.data = {row: rowValue, column: columnValue};
        }
        return dataObj;
      });

    const rowScale = this._rowAxis._getPosition.bind(this._rowAxis);
    const columnScale = this._columnAxis._getPosition.bind(this._columnAxis);
    const cellHeight = rowValues.length > 1
      ? rowScale(rowValues[1]) - rowScale(rowValues[0])
      : this._rowAxis.height();
    const cellWidth = columnValues.length > 1
      ? columnScale(columnValues[1]) - columnScale(columnValues[0])
      : this._columnAxis.width();

    const transform = `translate(${this._margin.left + rowPadding}, ${this._margin.top + columnPadding})`;
    const rectConfig = configPrep.bind(this)(this._shapeConfig, "shape", "Rect");

    this._shapes.push(new Rect()
      .data(shapeData)
      .select(elem("g.d3plus-Matrix-cells", {
        parent: this._select,
        enter: {transform},
        update: {transform}
      }).node())
      .config({
        height: cellHeight,
        width: cellWidth,
        x: d => columnScale(d.column) + cellWidth / 2,
        y: d => rowScale(d.row) + cellHeight / 2
      })
      .config(rectConfig)
      .render());

    return this;

  }

  /**
      @memberof Matrix
      @desc Determines which key in your data should be used for each column in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's column value.
      @param {String|Function} [*value*]
      @example
function column(d) {
  return d.name;
}
  */
  column(_) {
    return arguments.length ? (this._column = typeof _ === "function" ? _ : accessor(_), this) : this._column;
  }

  /**
      @memberof Matrix
      @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the column labels.
      @param {Object} *value*
      @chainable
  */
  columnConfig(_) {
    return arguments.length ? (this._columnConfig = assign(this._columnConfig, _), this) : this._columnConfig;
  }

  /**
      @memberof Matrix
      @desc A sort comparator function that is run on the unique set of column values.
      @param {Function} [*value*]
      @example
function column(a, b) {
  return a.localeCompare(b);
}
  */
  columnSort(_) {
    return arguments.length ? (this._columnSort = _, this) : this._columnSort;
  }

  /**
      @memberof Matrix
      @desc Determines which key in your data should be used for each row in the matrix. Can be either a String that matches a key used in every data point, or an accessor function that receives a data point and it's index in the data array, and is expected to return it's row value.
      @param {String|Function} [*value*]
      @example
function row(d) {
  return d.name;
}
  */
  row(_) {
    return arguments.length ? (this._row = typeof _ === "function" ? _ : accessor(_), this) : this._row;
  }

  /**
      @memberof Matrix
      @desc A pass-through to the underlying [Axis](http://d3plus.org/docs/#Axis) config used for the row labels.
      @param {Object} *value*
      @chainable
  */
  rowConfig(_) {
    return arguments.length ? (this._rowConfig = assign(this._rowConfig, _), this) : this._rowConfig;
  }

  /**
      @memberof Matrix
      @desc A sort comparator function that is run on the unique set of row values.
      @param {Function} [*value*]
      @example
function row(a, b) {
  return a.localeCompare(b);
}
  */
  rowSort(_) {
    return arguments.length ? (this._rowSort = _, this) : this._rowSort;
  }

}
