import { fireEvent, getByText, waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let container;

describe("index.html", () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("renders a heading element", () => {
    expect(container.querySelector("h1")).not.toBeNull();
    expect(getByText(container, "Pathfinding")).toBeInTheDocument();
  });
  it("all cols are set up", async () => {
    const cols = container.getElementsByClassName("col");
    const colsArr = Array.from(cols);
    const colsArrF = colsArr.filter((x) => colsArr.indexOf(x) > 1);
    expect(colsArrF.length).toBe(322);
    const col = cols[4];
    fireEvent.click(col);
  });
});
