const comment=require('./utils/comment');
const checkPrBody=require('./utils/checkPR');
const text=require('./text');

module.exports=async(context)=>{
  
  
  try {

    const res=await checkPrFiles(context);

    const {language,sampleInput,sampleOutput}=checkPrBody(context.payload.pull_request.body);
    if(!language || !sampleInput || !sampleOutput){
      comment(text['Wrong Expression'],context);
    }
  } catch (error) {
    
  }

 
}