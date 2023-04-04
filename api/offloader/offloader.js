const controller = require('../controller/hashTag-controller');

module.exports.Analyser = async(req,res)=>{
    let data;
    data = req;
    for(let i=0;i<data.length;i++)
    {
        let temp_str = data[i].Content;
        let starting_index, ending_index = 0;
        for(let j=0;j<temp_str.length;j++)
        {
            if(temp_str[j]=='#' && ending_index==0){
                starting_index = j;
                ending_index = j;
            }
            if(ending_index!=0 && temp_str[j]==" "){
                ending_index = j;
                let hash_string = temp_str.slice(starting_index,ending_index);
                console.log(hash_string+" hash strings.");
                controller.insertHashTags(hash_string);
                ending_index = 0;
            }
        }
    }
}