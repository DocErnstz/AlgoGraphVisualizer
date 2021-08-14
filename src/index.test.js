import { fireEvent, getByText, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import fs from "fs";
import path from "path";

jest.dontMock("fs");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

describe("index.js", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });
  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  it("block class is added to col when is clicked", () => {
    const { block_setter, setlisteners, select } = require("./App/index.js");

    const col = document.getElementsByClassName("col")[3];
    fireEvent.click(col);
    expect(col).toHaveClass("block");
  });
  it("select function paint cells", () => {
    const { select } = require("./App/index.js");
    const p = 3;
    const elements = document.getElementById("matrix").children;
    select(p, p);
    expect(elements.item(p).children.item(p).children).toMatchSnapshot();
  });
  it("path mark works fine", () => {
    const { path_mark } = require("./App/index.js");
    const p = 3;
    const elements = document.getElementById("matrix").children;
    path_mark(p, p);
    expect(elements.item(p).children.item(p).children).toMatchSnapshot();
  });
  it("blocks cannot be set in cells who hold a point", () => {
    const { block_setter, setlisteners } = require("./App/index.js");

    const elements = document.getElementById("matrix").children;
    const startcell = elements.item(0).children.item(0);
    const endcell = elements.item(0).children.item(2);
    fireEvent.click(startcell);
    fireEvent.click(endcell);
    expect(startcell).not.toHaveClass("block");
    expect(endcell).not.toHaveClass("block");
  });
  it("walls are fully generated", () => {
    const { setWalls } = require("./App/index.js");
    const elements = document.getElementById("matrix").children;
    setWalls();
    for (var j = 0; j < elements.length; j += 1) {
      for (var i = 0; i < elements.item(0).children.length; i += 1) {
        if (j % 2 == 0 || j == 0) {
          if (i == 0 || i % 2 == 0) {
            expect(elements.item(j).children.item(i)).not.toHaveClass("block");
          } else {
            expect(elements.item(j).children.item(i)).toHaveClass("block");
          }
        } else {
          expect(elements.item(j).children.item(i)).toHaveClass("block");
        }
      }
    }
  });
  it("eatWall delete the wall between two cells", () => {});
});
