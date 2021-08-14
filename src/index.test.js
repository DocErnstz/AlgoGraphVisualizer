import { fireEvent, getByText, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import fs from "fs";
import path from "path";
import { Cell } from "./App/DataStructure.js";

jest.dontMock("fs");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
let elements;

describe("index.js", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    elements = document.getElementById("matrix").children;
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

    select(p, p);
    expect(elements.item(p).children.item(p).children).toMatchSnapshot();
  });
  it("path mark works fine", () => {
    const { path_mark } = require("./App/index.js");
    const p = 3;

    path_mark(p, p);
    expect(elements.item(p).children.item(p).children).toMatchSnapshot();
  });
  it("blocks cannot be set in cells who hold a point", () => {
    const { block_setter, setlisteners } = require("./App/index.js");

    const startcell = elements.item(0).children.item(0);
    const endcell = elements.item(0).children.item(2);
    fireEvent.click(startcell);
    fireEvent.click(endcell);
    expect(startcell).not.toHaveClass("block");
    expect(endcell).not.toHaveClass("block");
  });
  it("walls are fully generated", () => {
    const { setWalls } = require("./App/index.js");

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
  //TDD
  it("eatWall delete the wall between two cells", () => {
    const { eatWall, setWalls } = require("./App/index.js");
    setWalls();
    eatWall(new Cell(2, 2), new Cell(2, 4));
    expect(elements.item(3).children.item(2)).not.toHaveClass("block");
    eatWall(new Cell(2, 2), new Cell(4, 2));
    expect(elements.item(2).children.item(3)).not.toHaveClass("block");
    eatWall(new Cell(2, 2), new Cell(2, 0));
    expect(elements.item(1).children.item(2)).not.toHaveClass("block");
    eatWall(new Cell(2, 2), new Cell(0, 2));
    expect(elements.item(2).children.item(1)).not.toHaveClass("block");
  });
  //TDD
  it("skipNeighbors doesnt go beyond the matrix limits", () => {
    

  })
});
