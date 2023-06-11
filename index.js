/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on("pull_request.opened", async (context) => {
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
    const res=await context.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path:data[0].filename,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
    const result=Buffer.from(res.data.content, 'base64').toString('utf8');
    // .toString('base64')
    console.log(result);
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
