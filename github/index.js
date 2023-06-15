const comment=require('./utils/comment');
const {checkBody, checkFiles}=require('./utils/checkPR');
const getDiff=require('./utils/getDiff');
const text=require('./text');

module.exports=async(context)=>{
  
  try {

    const res=await checkFiles(context);
    if(!res){
      return ;
    }
    const {language,sampleInput,sampleOutput}=checkBody(context.payload.pull_request.body);
    if(!language || !sampleInput || !sampleOutput){
      comment(text['Wrong Expression'],context);
      return;
    }
    
    const code =await getDiff(context);
    
    return code;
  } catch (error) {
    
  }

 
}