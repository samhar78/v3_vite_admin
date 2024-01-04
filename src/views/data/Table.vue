<template>
    <div>
      <el-button type="primary" @click="get_houduan">get请求</el-button>
      <el-button type="primary" @click="post_houduan">post请求</el-button>
    </div>
  </template>
   
  <script>
  export default {
    methods: {
      set_charts(data){
        // 提示框显示数据
        for(var i = 0; i < data.length; i++){
          console.log(data[i].log_time)
        }
        //alert("数组1："+data.data1+"\n"+"数组2："+data.data2);
        
        // 更新表格数据
    },
      get_houduan() {
        this.$axios.get("http://100.78.169.243:8000/query_all_log").then((res) => {
          //console.log(res.data);
          this.set_charts(res.data);
        });
      },
      post_houduan() {
        this.$axios
          .post("http://100.78.169.243:8000/query_all_log", {
            user: 123,
            pwd: 123,
          })
          .then((res) => {
            console.log(res);
          });
      },
    },
  };
  </script>
   
  <style>
  </style>