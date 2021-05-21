import request from "../../utils/request"
import {Message} from "element-ui"
export default {
    state:{
      role:[],
      //负责存储数据库user信息
      allData:[]
    },
    getters:{
      
    },
    //只有mutation能修改state里面的数据
    mutations:{
      roleG(state,payload){
        state.role = payload
      },
      All(state,payload){
        //接收actions属性里面异步函数获取到的数据
        state.allData = payload
      }
    },
    //只能actions处理异步函数
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
     judge(content,{r,id}){
       request.put("/user/change",{
        id,
        role:r
       }).then(({data})=>{
         if(data.code===200){
           Message({
             type:"success",
             message:"修改成功"
           })
         }else if(data.code===400){
          Message({
            type:"warning",
            message:"修改失败"
          })
         }
       })
     },

     //获取数据库的user
     getAll(content,payload){
       request.get("/user/all").then(({data})=>{
        content.commit("All",data.data)
       })
     }
    }
}