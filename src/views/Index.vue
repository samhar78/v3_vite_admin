<template>
    <div>
        <div> 
            <el-button @click="uploadFile" id="upload" 
                type="primary" round class="right"
                size="default">Upload</el-button>
        </div>
        
        <input ref="file" type="file" @change="onFileChange" style="display: none;"/>
    
    </div>
    <el-empty description="暂无数据"></el-empty>
</template>
<script>
import axios from "axios"; 
export default {
methods: {
    async onFileChange(e) {
        this.file = e.target.files[0]; // 可以不在data 中声明
        const formData = new FormData();
        formData.append("file", this.file);
        console.log(this.file);
        try {
            // 向upload页面上传
            const response = await axios.post("http://100.78.169.243:8000/receive/", formData);
            console.log(response);
            this.$emit("change", this.file); 
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    },
    uploadFile() {
        this.$refs.file.click();
    },
}
};
</script>