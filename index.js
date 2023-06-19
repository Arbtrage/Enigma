const github=require('./github/index');
const compile=require('./compiler/compile');


module.exports = (app) => {
  // Your code here
  app.log.info("Yay, the app was loaded!");
  
  app.on(
    ["pull_request.opened", "pull_request.synchronize", "pull_request.edited"],
    async (context) => {

      const {pull_request:data}=context.payload;
      const {title}=data;

      //Checks for the command "Run" or "Execute" in the title of the Pull Request
      //Search function is case sensitive
      if(title.search("Run")==-1 && title.search("Execute")==-1){
        app.log.info("Execute or Run command is not given, so Bot will not run");
        return;
      }

      const code=await github(context);
      // console.log(code);
      // await compile(code);
    }
  );
};
