<template>
  <div class="register">
    <el-card class="register_center">
      <template #header>
        <div class="card_header">
          <span>用户注册</span>
        </div>
      </template>
      <el-form :model="registerFormState" :rules="rules" ref="registerFormRef">
        <el-form-item prop="username">
          <el-input v-model.trim="registerFormState.username" maxlength="32" placeholder="请输入用户名" clearable>
            <template #prefix>
              <icons name="User"></icons>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model.trim="registerFormState.email" maxlength="32" placeholder="请输入电子邮件" clearable>
            <template #prefix>
              <icons name="Mail"></icons>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="registerFormState.password" maxlength="16" show-password placeholder="请输入密码" clearable>
            <template #prefix>
              <icons name="Lock"></icons>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input v-model.trim="registerFormState.confirmPassword" maxlength="16" show-password placeholder="请确认密码" clearable>
            <template #prefix>
              <icons name="Lock"></icons>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :loading="registerFormState.loading" @click="handleRegister">注 册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import Icons from "../../components/Icons.vue";

export default {
  components: { Icons },
  setup() {
    const registerFormRef = ref();

    const registerFormState = reactive({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
    });

    const rules = {
      username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
      email: [
        { required: true, message: "电子邮件不能为空", trigger: "blur" },
        { type: "email", message: "请输入有效的电子邮件地址", trigger: "blur" }
      ],
      password: [
        { required: true, message: "密码不能为空", trigger: "blur" },
        { min: 6, max: 16, message: "密码长度为6-16位", trigger: "blur" },
      ],
      confirmPassword: [
        { required: true, message: "请确认密码", trigger: "blur" },
        { validator: (rule, value, callback) => {
          if (value !== registerFormState.password) {
            return callback(new Error("两次输入的密码不一致"));
          }
          return callback();
        }, trigger: 'blur' }
      ],
    };


    const handleRegister = () => {
      registerFormRef.value.validate(valid => {
        if (!valid) return;
        // 注册逻辑处理
        console.log("注册信息：", registerFormState);
        // 此处可以添加与后端通信的代码
      });
    };

    return { registerFormRef, registerFormState, rules, handleRegister };
  },
};
</script>

<style scoped>
.register {
  /* 样式可以根据需要调整，以下只是参考 */
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/img/login.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .register_center {
    width: 400px;
    height: auto;
  }

  .card_header {
    font-size: 18px;
    text-align: center;
  }
}
</style>
