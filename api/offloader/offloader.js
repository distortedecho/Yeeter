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
                console.log(temp_str[j]);
                starting_index = j;
                ending_index = j;
                console.log(starting_index+"and"+ending_index)
            }
            if(ending_index!=0 && temp_str[j]==" "){
                ending_index = j;
                console.log(temp_str.slice(starting_index,ending_index+1));
                console.log(data[i]);
            }
        }
        // console.log(data[i].Content+"this i "+i);
    }
    // console.log(req);
}