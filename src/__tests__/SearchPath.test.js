import { fireEvent, getByText, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import fs from "fs";
import path from "path";

jest.dontMock("fs");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("SearchPath.js", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });
  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });
  it("Clear function delete all red cells ", () => {
    const { Clear, select } = require("../App/SearchPath.js");
    const x = 3;
    const y = 3;
    select(x, y);
    const elements = document.getElementById("matrix").children;
    const element = elements.item(y).children.item(x);
    expect(element.children[0]).toBeTruthy();
    Clear();
    expect(element.children[0]).not.toBeTruthy();
  });
  it("ClearBlocks functions remove block class from cells", async () => {
    const { ClearBlocks } = require("../App/SearchPath.js");
    const { setlisteners } = require("../App/index.js");
    const x = 3;
    const y = 3;
    const elements = document.getElementById("matrix").children;
    const element = elements.item(y).children.item(x);
    fireEvent.click(element);
    expect(element).toHaveClass("block");
    ClearBlocks();
    expect(element).not.toHaveClass("block");
  });
});
