<template>
    <div>
        <Dialog :show="dialogConfig.show" :title="dialogConfig.title" width="450px" :showCancel="false"
            @close="dialogConfig.show = false">
            <el-form ref="formDataRef" :model="formData" status-icon :rules="rules" label-width="0px" class="login-register"
                id="formDataId">
                <!-- input输入 -->
                <el-form-item prop="email">
                    <el-input v-model="formData.email" type="text" placeholder="请输入邮箱" size="large" clearable>
                        <template #prefix>
                            <span class="iconfont icon-email"></span>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 登录密码 -->
                <el-form-item prop="password" v-if="opType == 1">
                    <el-input v-model="formData.password" type="password" placeholder="请输入密码" size="large">
                        <template #prefix>
                            <span class="iconfont icon-lock"></span>
                        </template>
                    </el-input>
                </el-form-item>

                <!-- 注册 -->
                <div v-if="opType == 0 || opType == 2">
                    <el-form-item prop="emailCode">
                        <div class="yanzhengma-box">
                            <el-input v-model="formData.emailCode" type="text" placeholder="请输入邮箱验证码" size="large"
                                clearable>
                                <template #prefix>
                                    <span class="iconfont icon-yanzhengma1"></span>
                                </template>
                            </el-input>
                            <el-button type="primary" size="large" class="check-btn">获取验证码</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item prop="nickName" v-if="opType == 0">
                        <el-input v-model="formData.nickName" type="text" placeholder="请输入昵称" size="large" clearable>
                            <template #prefix>
                                <span class="iconfont icon-ziyuanxhdpi"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="registerPassword">
                        <el-input v-model="formData.registerPassword"
                            :type="passwordEyeType.reRegisterPasswordEyeOpen ? 'text' : 'password'" placeholder="请输入密码"
                            size="large">
                            <template #prefix>
                                <span class="iconfont icon-lock"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="reRegisterPassword">
                        <el-input v-model="formData.reRegisterPassword"
                            :type="passwordEyeType.reRegisterPasswordEyeOpen ? 'text' : 'password'" placeholder="请再次输入密码"
                            size="large">
                            <template #prefix>
                                <span class="iconfont icon-lock"></span>
                            </template>
                            <template #suffix>
                                <span
                                    :class="['iconfont', passwordEyeType.reRegisterPasswordEyeOpen ? 'icon-yanjing1' : 'icon-yanjing-bi']"
                                    @click="changeEye('reRegisterPasswordEyeOpen')"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>

                <el-form-item prop="checkCode">
                    <div class="checkCode">
                        <el-input v-model="formData.checkCode" type="text" placeholder="请输入验证码" size="large" clearable>
                            <template #prefix>
                                <span class="iconfont icon-yanzhengma1"></span>
                            </template>
                        </el-input>
                        <img :src="checkImgUrl" class="checkImg" alt="" @click="changeCheckImgUrl(0)">
                    </div>
                </el-form-item>
                <el-form-item v-if="opType == 1">
                    <div class="remember-box">
                        <el-checkbox v-model="formData.rememberMe" size="large">记住我</el-checkbox>
                    </div>
                    <div class="no-account">
                        <a href="javascript:void(0);" @click="showPanel(2)">忘记密码？</a>
                        <a href="javascript:void(0);" @click="showPanel(0)">没有账号？</a>
                    </div>
                </el-form-item>
                <el-form-item v-if="opType == 0">
                    <div class="had-account">
                        <a href="javascript:void(0);" @click="showPanel(1)">已有帐号？</a>
                    </div>
                </el-form-item>
                <el-form-item v-if="opType == 2">
                    <div class="had-account">
                        <a href="javascript:void(0);" @click="showPanel(1)">去登录？</a>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn">登录</el-button>
                </el-form-item>
            </el-form>

        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'

import type { ElForm } from "element-plus"

const { proxy } = getCurrentInstance() as any

//api
const api = {
    checkCode: "/api/checkCode"
}
//0:注册，1：登录
const opType = ref()
const showPanel = (type: Number) => {
    opType.value = type
    console.log('11')
    resetForm()
    console.log('22')

}
defineExpose({ showPanel })

const formData = reactive({
    email: '',
    password: '',
    checkCode: '',
    rememberMe: false,
    nickName: '',
    emailCode: '',
    registerPassword: '',
    reRegisterPassword: ''
})

//解决方法一：把类型定义成any
// const formDataRef = ref<any>()
//解决方法二： .在vue的官方文档中Typescript支持里有告诉我们一个获取组件类型的方法，InstanceType<typeof 组件名称> 
const formDataRef = ref<InstanceType<typeof ElForm>>()
const rules = reactive([
])
//验证码图片路径
const checkImgUrl = ref(api.checkCode)
const changeCheckImgUrl = (type: Number) => {
    checkImgUrl.value = api.checkCode + "?type=" + type + "&time=" + new Date().getTime()
}
//弹窗基本信息
const dialogConfig = reactive({
    show: false,
    title: '登录/注册',
})
//重置表单
const resetForm = async () => {
    dialogConfig.show = true
    if (opType.value == 0) {
        dialogConfig.title = '注册'
    } else if (opType.value == 1) {
        dialogConfig.title = "登录"
    } else if (opType.value == 2) {
        dialogConfig.title = "重置密码"
    }

    await nextTick(() => {
        console.log('nextTick');

        //刷新验证码
        changeCheckImgUrl(0)
        console.log(formDataRef.value)
        formDataRef.value?.resetFields()
    })
    // await nextTick()
    // changeCheckImgUrl(0)
    // formDataRef.value?.resetFields()

}

//控制密码显示与隐藏
const passwordEyeType = reactive({
    passwordEyeOpen: false,
    registerPasswordEyeOpen: false,
    reRegisterPasswordEyeOpen: false
})

const changeEye = (type: String) => {
    passwordEyeType[type as keyof typeof passwordEyeType] = !passwordEyeType[type as keyof typeof passwordEyeType]

}

</script>

<style scoped lang="less">
.login-register {
    .checkCode {
        display: flex;

        .checkImg {
            margin-left: 5px;
            cursor: pointer;
        }
    }

    .yanzhengma-box {
        display: flex;
        width: 100%;

        .check-btn {
            margin-left: 5px;
        }
    }

    .remember-box {
        width: 100%;
    }

    .no-account {
        a {
            color: rgb(64, 158, 255)
        }
    }

    .had-account {
        a {
            color: rgb(64, 158, 255)
        }
    }

    .login-btn {
        width: 100%;
    }
}
</style>