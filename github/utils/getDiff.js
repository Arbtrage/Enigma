const diff = require("diff");

module.exports=async()=>{
    const { number } = context.payload.pull_request;
    const {
        owner: { login: owner },
        name: repo,
      } = context.payload.pull_request.base.repo;

    const data = await context.octokit.paginate(
        context.octokit.pulls.listFiles,
        {
          owner,
          repo,
          pull_number: number,
          per_page: 100,
        }
      );
    console.log(data);
    console.log(data[0].patch);

    const patch = data[0].patch;
    const parsedPatch = diff.parsePatch(patch);
    console.log(parsedPatch);
    const updatedCode = diff.applyPatch(``, parsedPatch);

    console.log(updatedCode);
}