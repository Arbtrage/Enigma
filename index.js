const github=require('./github/index');

// check status if added or not
// check additions 
// title me run needed
// language needed
// body is in pull request

module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");

  app.on(
    ["pull_request.opened", "pull_request.synchronize", "pull_request.edited"],
    async (context) => {

      const {pull_request:data}=context.payload;
      const {title,additions,changed_files}=data;

      //Checks for the command "Run" or "Execute" in the title of the Pull Request
      //Search function is case sensitive
      if(title.search("Run")==-1 || title.search("Execute")){
        console.log(title.split(' ')[0])
        app.log.info("Execute or Run command is not given, so Bot will not run");
        return;
      }

      if(additions==0 || changed_files>1){
        app.log.info("There were no additions or number of changed files are greater than 1, Bot will not run");
        return ;
      }

      github(context);
    }
  );
};
