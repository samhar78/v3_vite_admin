<template>
    <div class="login">
        <el-card class="login_center">
            <template #header>
                <div class="card_header">
                    <span>用户登录</span>
                </div>
            </template>
            <el-form :model="loginFormState" :rules="rules" ref="loginFormRef">
                <el-form-item prop="name">
                    <el-input v-model.trim="loginFormState.name" maxlength="32" placeholder="请输入账号" clearable>
                        <template #prefix>
                            <icons name="User"></icons>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input
                        v-model.trim="loginFormState.pwd"
                        maxlength="16"
                        show-password
                        placeholder="请输入密码"
                        clearable
                        @keyup.enter.exact="handleLogin"
                    >
                        <template #prefix>
                            <icons name="Lock"></icons>
                        </template>
                    </el-input>

    
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" :loading="loginFormState.loading" @click="handleLogin">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import { getCurrentInstance, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { encode } from "js-base64";
import Icons from "../../components/Icons.vue";

export default {
    components: { Icons },
    setup() {
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const store = useStore();
        const loginFormRef = ref();

        const loginFormState = reactive({
            name: "",
            pwd: "",
            role: "",  // 新增角色
            loading: false,
        });

        const rules = {
            name: [{ required: true, message: "账号不能为空", trigger: "blur" }],
            pwd: [
                { required: true, message: "密码不能为空", trigger: "blur" },
                { min: 5, max: 16, message: "密码长度为5-16位", trigger: "blur" },
            ],
        };
        const testUsers = reactive([
          { name: 'Doctor', pwd: '101abcd', role: 'dataProvider' },
          { name: 'Professor', pwd: '102abcd', role: 'dataUser' },
          { name: 'Student', pwd: '103abcd', role: 'dataProcessor' }
        ]);


        const handleLogin = () => {
            loginFormRef.value.validate(valid => {
                if (!valid) {
                    return false;
                }

                loginFormState.loading = true;

                  // 查找匹配的测试用户
        const user = testUsers.find(user => user.name === loginFormState.name && user.pwd === loginFormState.pwd);

        if (user) {
            // 如果找到匹配的用户，模拟登录成功的逻辑
            setTimeout(() => {
                let params = {
                    role: user.role,
                    username: user.name,
                };
                sessionStorage.setItem("jwt", encode(JSON.stringify(params)));
                store.dispatch("setUser", params);
                loginFormState.loading = false;
                router.replace("/");
                // 显示登录成功消息
                proxy.$message.success("登录成功");
            }, 1000);
        } else {
            // 没有找到匹配的用户，模拟登录失败的逻辑
            setTimeout(() => {
                loginFormState.loading = false;
                // 显示登录失败消息
                proxy.$message.error("登录失败：账号或密码错误");
            }, 1000);
        }
            });
        };

        return { loginFormRef, loginFormState, rules, handleLogin };
    },
};
</script>

<style lang="scss" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-image: url("../../assets/img/login.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .login_center {
        width: 396px;
        height: auto;
    }

    .card_header {
        font-size: 18px;
        text-align: center;
    }
}
</style>