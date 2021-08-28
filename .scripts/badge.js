const git = require(`simple-git/promise`)(__dirname);
const lineReplace = require(`line-replace`);

async function main(){
  const remote = await git.getRemotes(true);
  const originRemote = remote.filter(r => r.name === `origin`)[0].refs.fetch.substring(4).slice(0,-4).replace(`:`,`/`);

  const result = `![Assignment Checks](https://${originRemote}/workflows/Assignment%20Checks/badge.svg)`;

  lineReplace({
    file: `README.md`,
    line: 3,
    text: result,
    callback: ({file, line, text, replacedText, error}) => {
      lineReplace({
        file: `README.md`,
        line: 8,
        text: `- [x] update the assignment checks above to the correct link. - Done Automatically`,
        callback: ({file, line, text, replacedText, error}) => {
          git.add([ `../README.md` ]);
          git.commit(`update README file`);
        }
      });
    }
  });
  
}

main();