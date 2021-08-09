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
    const x = 3;
    const y = 3;
    const elements = document.getElementById("matrix").children;
    select(x, y);
    expect(elements.item(y).children.item(x).children).toMatchSnapshot();
  });
  it("path mark works fine", () => {
    const { path_mark } = require("./App/index.js");
    const x = 3;
    const y = 3;
    const elements = document.getElementById("matrix").children;
    path_mark(x, y);
    expect(elements.item(y).children.item(x).children).toMatchSnapshot();
  });
});
