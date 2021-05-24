import request from "./request"
function axios(url,da,{text}={},callback){
  // console.log(da.split(""));
  console.log(da);
  request.get(url,{
      email:da
  }).then(({data})=>{
    if(data.code===400){
        callback(new Error(text));
    }else if(data.code===200){
        callback()
    }
})
}


export default axios
