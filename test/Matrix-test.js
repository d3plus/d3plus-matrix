import assert from "assert";
import {default as Matrix} from "../src/Matrix.js";
import it from "./jsdom.js";

it("Matrix", function *() {

  yield cb => {

    new Matrix().render(cb);

  };

  assert.strictEqual(document.getElementsByTagName("svg").length, 1, "automatically added <svg> element to page");
  assert.strictEqual(document.getElementsByClassName("d3plus-Matrix").length, 1, "created <g> container element");

});