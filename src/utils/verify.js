import axios from "axios"
const baseURL = "/user/check"
const ver1 = function(url,value1,text){
  return function(rule,value,callback){
    if(value){
      if(Object.prototype.toString.call(url) ==="[object String]"&& url.trim()!==""){
        this.$request.get(baseURL+url,{
          params:{
            value1:value,
          }
        }).then(({data})=>{
          if(data.code===400){
            callback(new Error(text))
          }else if(data.code==200){
            callback()
          }
        })
      }
    }
  }
}

export default ver1

// console.log(this);