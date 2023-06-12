/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

const diff = require('diff');

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on(["pull_request.opened","pull_request.synchronize"], async (context) => {
    const { number } = context.payload.pull_request;
    const { owner: { login: owner }, name: repo } = context.payload.pull_request.base.repo;

    const data=await context.octokit.paginate(
      context.octokit.pulls.listFiles,
      {
        owner,
        repo,
        pull_number: number,
        per_page: 100,
      },
    );
    console.log(data)
    console.log(data[0].patch);

    const patch=data[0].patch;
    const parsedPatch = diff.parsePatch(patch);
    console.log(parsedPatch)
    const updatedCode = diff.applyPatch(``, parsedPatch);
    
    console.log(updatedCode);
  });
};
