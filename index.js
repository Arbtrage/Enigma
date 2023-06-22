const github=require('./github/index');
const compile=require('./compiler/compile');
const comment=require('./comment')

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
      try {
        const res=await github(context);
        if(res.status==400){
          throw new Error(res.message);
        }
        console.log(res.code);

        const options={
          code:res.code,
          id:res.id,
          input:res.input=='null'?null:res.input,
          output:res.output=='null'?null:res.output
        }
        console.log(options)
        const output=await compile(options);
        if(output.status==400){
          throw new Error(output.message);
        }
        const body={
          output:output.Output,
          message:"Success"
        }
        await comment(context,body);
        
      } catch (error) {
        await comment(context,error.message);
      }
    }
  );
};
