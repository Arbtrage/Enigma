const diff = require("diff");

// @TODO: Compare diff with the previous file(if exists) and update the code
// @TODO: Handle multiple files for addition and updation

module.exports=async(context)=>{

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

    // if(data[0].status!="added"){
    //   return "Null";
    // }

    const patch = data[0].patch;
    const parsedPatch = diff.parsePatch(patch);
    const updatedCode = diff.applyPatch(``, parsedPatch);

    return updatedCode;
}