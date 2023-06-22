const comment = async(context, data) => {
    const body = {
      "Wrong Body": "⚠️ **Invalid Body Format** ⚠️\n\nPlease make sure the body of the pull request follows the correct format:\n\nLanguage: [language]\nSample Input: [input]\nSample Output: [output]",
      "Language not found": "⚠️ **Language not found** ⚠️\n\nThe specified programming language is not supported. Please choose a valid programming language.",
      "Large File": "⚠️ **Large File** ⚠️\n\nThe size of the file in the pull request is too large. Please make sure the file size is within the allowed limits.",
      "Success": "✅ **Code Execution Successful** ✅\n\nThe code was executed successfully and the output is as follows:\n\n```\n" + data.output + "\n```"
    };
  
    const fallbackMessage = `⚠️ **Unknown Error** ⚠️\n\nAn unknown error occurred. Possible reasons for this failure could include:\n
    \n- API rate limiting: The API rate limit may have been exceeded. Please try again later.
    \n- Network issues: There might be connectivity issues. Please check your network connection and try again.
    \n- Please make sure the body of the pull request follows the correct format:\n\nLanguage: [language]\nSample Input: [input]\nSample Output: [output]`;
  
    const commentBody = data.message ?body[data.message]:body[data] || fallbackMessage;
  
    await context.octokit.issues.createComment({
      owner: context.repo().owner,
      repo: context.repo().repo,
      issue_number: context.payload.pull_request.number,
      body: commentBody
    });
  }
  

module.exports=comment;
