/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

const bootstrapClasses = require(`./bootstrapclasses`);

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

jest.dontMock("fs");

describe("html content", function () {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    // restore the original func after test
    jest.resetModules();
  });

  it(`body's first element is <div> element with the class of container`, function () {
    const bodyFirstElement = document.body.firstElementChild;
    expect(bodyFirstElement.classList).toContain(`container`);
    expect(bodyFirstElement.tagName).toContain(`DIV`);
  });

  it("contains a script tag that references the script.js file in resources/scripts", function () {
    const scriptElements = document.getElementsByTagName("script");
    const scriptSources = Array.from(scriptElements).map((ele) => ele.src);

    expect(scriptElements.length).toBeGreaterThanOrEqual(4);
    expect(scriptSources.map((src) => src.slice(-26))).toContain(
      `resources/scripts/index.js`
    );
  });

  it("contains a link tag that references the stylesheets in resources/styles", function () {
    const styleElements = document.getElementsByTagName("link");
    const styleSources = Array.from(styleElements)
      .filter((ele) => ele.rel === `stylesheet`)
      .map((ele) => ele.href);

    expect(styleElements.length).toBeGreaterThanOrEqual(2);
    expect(styleSources.map((src) => src.slice(-27))).toContain(
      `resources/styles/styles.css`
    );
  });

  it(`The container <div> contains 5 <div>s with the class name of (section)`, function () {
    const elements = document.querySelectorAll("div.container div.section");
    const sectionElements = Array.from(elements).filter(
      (ele) => ele.tagName === `DIV`
    );

    expect(sectionElements.length).toBeGreaterThanOrEqual(4);
  });

  it(`contains 1 image of sections`, function () {
    const elements = document.getElementsByTagName("img");

    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it(`programming languages section includes a numbered list`, function () {
    const programmingLanguagesSection = document.querySelector(
      `#programmingLanguages ol`
    );
    const tagName = programmingLanguagesSection.tagName;

    expect(tagName).toBe(`OL`);
  });

  it(`achievements section includes an unnumbered list`, function () {
    const achievementsSection = document.querySelector(`#achievements ul`);

    const tagName = achievementsSection.tagName;

    expect(tagName).toBe(`UL`);
  });

  it(`uses Bootstrap`, function () {
    const allclasses = [].concat(
      ...[...document.querySelectorAll("*")].map((elt) => [...elt.classList])
    );

    const found = allclasses.some((r) => bootstrapClasses.includes(r));

    expect(found).toBeTruthy();
  });

  test(`page title is the same as the first h1 tag`, function () {
    const documentTitle = document.title;
    const h1Title = document.querySelector(`h1`).textContent;

    expect(h1Title).toContain(documentTitle);
  });
});
