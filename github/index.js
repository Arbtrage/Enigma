
const { checkBody} = require("./utils/checkPR");
const getDiff = require("./utils/getDiff");

module.exports = async (context) => {
  try {
    //Check for more than 1 changed file or file creation
    const { additions, changed_files } = context.payload.pull_request;
    if (additions == 0 || changed_files > 1) {
      throw new Error("Large File");
    }
    //Check for proper PR body
    const response = checkBody(context.payload.pull_request.body);
    if (response.status == 400) {
      throw new Error(response.message);
    }
    //Fetch the codefrom the PR's Diff
    const code = await getDiff(context);

    return {
      status:200,
      message:"Success",
      code:code,
      id:response.id,
      input:response.input,
      output:response.output
    }

  } catch (error){
    console.log(error.message)
    return {
      status:400,
      message:error.message,
      code:null
    }
  }
};
