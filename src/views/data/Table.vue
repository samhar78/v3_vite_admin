<template>
    <div>
      <el-button type="primary" @click="get_houduan">get请求</el-button>
      <el-button type="primary" @click="post_houduan">post请求</el-button>
      <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
            <el-button @click="uploadFile"
                type="primary" round class="right"
                size="default">Upload</el-button>
        </div>
        
        <input ref="file" type="file" @change="onFileChange" style="display: none;"/>
    </div>

    <div style="width: 70%;margin-left: 30px;margin-top: 30px;">
    <el-button class="filter-item" type="success" icon="el-icon-download" @click="downFile()">下载</el-button>
  </div>
  </template>
   
  <script>
  import axios from "axios";
  export default {
    data() {
      return {
      }
    },
    mounted: function() {
 
},
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
      async onFileChange(e) {
        this.file = e.target.files[0]; // 可以不在data 中声明
        const formData = new FormData();
        formData.append("file", this.file);
        console.log(this.file);
        try {
            // 向upload页面上传
            const response = await axios.post("http://127.0.0.1:8000/upload/", formData);//上传的代码
            console.log(response);
            this.$emit("change", this.file); //并将当地的文件上传至父组件(可删去)
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    },
    uploadFile() {
        this.$refs.file.click();
    },
    },
    downloadFile(url, options = {}){
        return new Promise((resolve, reject) => {
          // console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
          // axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8'
          axios({
            method: 'post',
            url: url, // 请求地址
            data: options, // 参数
            responseType: 'blob' // 表明返回服务器返回的数据类型
          }).then(
            response => {
              // console.log("下载响应",response)
              resolve(response.data)
              let blob = new Blob([response.data], {
                type: 'application/vnd.ms-excel'
              })
              // console.log(blob)
              // let fileName = Date.parse(new Date()) + '.xlsx'
              // 切割出文件名
              let fileNameEncode = response.headers['content-disposition'].split("filename=")[1];
              // 解码
              let fileName = decodeURIComponent(fileNameEncode)
              // console.log("fileName",fileName)
              if (window.navigator.msSaveOrOpenBlob) {
                // console.log(2)
                navigator.msSaveBlob(blob, fileName)
              } else {
                // console.log(3)
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = fileName
                link.click()
                //释放内存
                window.URL.revokeObjectURL(link.href)
              }
            },
            err => {
              reject(err)
            }
          )
        })
      },
      // 下载文件
      downFile(){
        let postUrl= "http://127.0.0.1:8000/download/excel/"
        let params = {
          filename: "xxx.xlsx",//文件名 实际运用时可以从文件列表里获得
        }
        // console.log("下载参数",params)
        this.downloadFile(postUrl,params)
      },
    };
  </script>
   
  <style>
  </style>