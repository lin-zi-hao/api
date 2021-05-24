import request from "../../utils/request"
import {Message} from "element-ui"
export default {
    state:{
      role:[],
      //负责存储数据库user信息
      allData:[],
      //储存路由地址
      router:[]
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
      //获取用户权限
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
      //修改用户状态
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
     },
     
     //删除操作
     remove(content,{url,id}){
      request.delete(url, {
        params: {
            id,
        }
        }).then(({
            data
        }) => {
        if (data.code === 200) {
            Message({
                message: "删除成功",
                type: "success"
            })
        }
        
    })
     },


     getRouter(content,payload){
      request.get("/router/all").then(({data})=>{
        console.log(data);
      })
     }
    }
}