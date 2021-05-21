import request from "../../utils/request"
import {Message} from "element-ui"
export default {
    state:{
      role:[],
    },
    getters:{

    },
    mutations:{
      roleG(state,payload){
        state.role = payload
      }
    },
    actions:{
      getRole(content,payload){
        request.get("/update/all").then(({data})=>{
          if(data.code===200){
            content.commit("roleG",data.data);
          }else if(data.code===400){
            Message({
              type:"error",
              message:"获取失败"
            })
          }
        })
      },
      judge(content,payload){
        console.log(payload);
      }
    }
}