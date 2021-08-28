const dirTree = require(`directory-tree`);
const _ = require(`lodash`)

describe('folder structure', function () {
  test(`root directory is properly setup`, () => {
    const rootTree = dirTree(`${__dirname}/..`);
    const nodes = rootTree.children.map(node => node.name);

    expect(nodes).toContain(`resources`);
    expect(nodes).toContain(`index.html`);
    const expectedNodes = [
      `.git`,
      `.github`,
      `.vscode`,
      `resources`,
      `tests`,
      `.gitignore`,
      `index.html`,
      `package.json`,
      `README.md`
    ];
    expect(nodes).toEqual(expect.arrayContaining(expectedNodes));
  });

  test(`resources directory is properly setup`, () => {
    const resourcesTree = dirTree(`${__dirname}/../resources`);
    const nodes = resourcesTree.children.map(node => node.name);
    const expectedNodes = [
      `images`,
      `scripts`,
      `styles`
    ];
    expect(nodes).toEqual(expect.arrayContaining(expectedNodes));
  });

  test(`scripts directory includes one index.js files`, () => {
    const scriptsTree = dirTree(`${__dirname}/../resources/scripts`);
    const nodes = scriptsTree.children.map(node => node.name);

    expect(nodes).toContain(`index.js`);
  });

  test(`styles directory includes one styles.css files`, () => {
    const stylesTree = dirTree(`${__dirname}/../resources/styles`);
    const nodes = stylesTree.children.map(node => node.name);

    expect(nodes).toContain(`styles.css`);
  });
});