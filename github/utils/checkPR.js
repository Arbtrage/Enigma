const findLanguage=require('./languages');

const getId=(name)=>{
  let id=0;
  findLanguage.forEach(language => {
    if(language.name===name){
      console.log(language.id);
      id= language.id;
      return ;
    }
  });
  return id;
}

module.exports = {
  checkBody: (body) => {
  //   const regex =
  // /Language:\s*([\w+]+)\s*Sample Input:\s*([\s\S]+?)\s*Sample Output:\s*([\s\S]+)/;
  const regex = /Language:\s*(.*?)\s*Sample Input:\s*([\s\S]+?)\s*Sample Output:\s*([\s\S]+)/s;


    const matches = body.match(regex);
    let language,sampleInput,sampleOutput,id;

    let reg_found=true;
    console.log(matches)
    if (matches) {
      language =matches[1];
      sampleInput = matches[2];
      sampleOutput = matches[3];      
      id=getId(language);
    } else {
      reg_found=false;
      return {
        status:400,
        message:"Wrong Body"
      }
    }
    if(id==0){
      return {
        status:400,
        message:"Language not found"
      }
    }
    return {
      status:200,
      message:"Success",
      id:id,
      input:sampleInput,
      output:sampleOutput
    }

  },
};
