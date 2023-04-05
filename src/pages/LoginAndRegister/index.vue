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
                    <el-input v-model="formData.password" :type="passwordEyeType.passwordEyeOpen ? 'text' : 'password'"
                        placeholder="请输入密码" size="large">
                        <template #prefix>
                            <span class="iconfont icon-lock"></span>
                        </template>
                        <template #suffix>
                            <span
                                :class="['iconfont', passwordEyeType.passwordEyeOpen ? 'icon-yanjing1' : 'icon-yanjing-bi']"
                                @click="changeEye('passwordEyeOpen')"></span>
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
                            <el-button type="primary" size="large" class="check-btn"
                                @click="showSendEmailDialog">获取验证码</el-button>
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
                            :type="passwordEyeType.registerPasswordEyeOpen ? 'text' : 'password'" placeholder="请输入密码"
                            size="large">
                            <template #prefix>
                                <span class="iconfont icon-lock"></span>
                            </template>
                            <template #suffix>
                                <span
                                    :class="['iconfont', passwordEyeType.registerPasswordEyeOpen ? 'icon-yanjing1' : 'icon-yanjing-bi']"
                                    @click="changeEye('registerPasswordEyeOpen')"></span>
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
                    <el-button type="primary" class="login-btn" @click="doSubmit">
                        <span v-if="opType == 0">注册</span>
                        <span v-if="opType == 1">登录</span>
                        <span v-if="opType == 2">重置密码</span>
                    </el-button>
                </el-form-item>
            </el-form>

        </Dialog>
    </div>
    <!-- 发送邮件验证码弹窗 -->
    <Dialog :show="dialogConfigSendEmailCode.show" :title="dialogConfigSendEmailCode.title"
        :buttons="dialogConfigSendEmailCode.buttons" width="500px" :showCancel="false"
        @close="dialogConfigSendEmailCode.show = false">
        <el-form :model="formDataSendEmailCode" :rules="rules" ref="formDataSendEmailCodeRef" label-width="80px">
            <el-form-item label="邮箱 :">
                {{ formData.email }}
            </el-form-item>
            <el-form-item label="验证码" prop="checkCode">
                <div class="checkCode">
                    <el-input size="large" placeholder="请输入验证码" v-model="formDataSendEmailCode.checkCode">
                        <template #prefix>
                            <span class="iconfont icon-yanzhengma1"></span>
                        </template>
                    </el-input>
                    <img :src="checkCodeUrlSendEmailCode" class="check=code" @click="changeCheckImgUrl(1)" />
                </div>
            </el-form-item>
        </el-form>
    </Dialog>
    <div>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, nextTick } from 'vue'
import type { FormInstance, FormRules, ElForm } from 'element-plus'
import { de, pa } from 'element-plus/es/locale';
// 按需引用：(信息摘要算法: 对称加密)
import { Md5 } from "ts-md5";
const md5: any = new Md5()

const { proxy } = getCurrentInstance() as any

//api
const api = {
    checkCode: "/api/checkCode",
    sendEmailCode: "/sendEmailCode",
    register: '/register',
    login: ' /login',
    resetPwd: ' /resetPwd'
}
//0:注册，1：登录
const opType = ref()
const showPanel = (type: Number) => {
    opType.value = type
    console.log('11')
    resetForm()
    //刷新验证码
    changeCheckImgUrl(0)
    formDataRef.value?.resetFields()

}
defineExpose({ showPanel })

const formData = ref({
    email: '',
    password: '',
    checkCode: '',
    rememberMe: false,
    nickName: '',
    emailCode: '',
    registerPassword: '',
    reRegisterPassword: ''
})

interface paramsData {
    email?: String,
    checkCode?: String,
    type?: Number

}
//发送邮箱验证码弹窗
const formDataSendEmailCode: any = ref({
})
const formDataSendEmailCodeRef = ref<FormInstance>()
const dialogConfigSendEmailCode = reactive({
    show: false,
    title: "发送邮箱验证码",
    buttons: [
        {
            type: "primary",
            text: "发送验证码",
            click: () => {
                sendEmailCode()
            }
        }
    ]

})

const showSendEmailDialog = () => {
    console.log('邮箱验证码！')
    formDataRef.value?.validateField("email", (valid) => {
        if (!valid) {
            return
        }
        dialogConfigSendEmailCode.show = true

        nextTick(() => {
            changeCheckImgUrl(1)
            formDataSendEmailCodeRef.value?.resetFields()
            formDataSendEmailCode.value = {
                email: formData.value.email
            }
        })
    })
}
//发送邮件
const sendEmailCode = () => {
    formDataSendEmailCodeRef.value?.validate(async (valid) => {
        if (!valid) { return }

        const params: paramsData = Object.assign({}, formDataSendEmailCode.value)
        params.type = opType.value == 0 ? 0 : 1
        let result = await proxy.request({
            url: api.sendEmailCode,
            params: params
        })
        if (!result) {
            return
        }
        proxy.message.success("验证码发送成功！请登录邮箱查看！")
        dialogConfigSendEmailCode.show = false
    })

}

//解决方法一：把类型定义成any
// const formDataRef = ref<any>()
//解决方法二： .在vue的官方文档中Typescript支持里有告诉我们一个获取组件类型的方法，InstanceType<typeof 组件名称> 
// const formDataRef = ref<InstanceType<typeof ElForm>>()
const formDataRef = ref<FormInstance>()
const checkRePassword = (rule: any, value: String, callback: any) => {
    if (value !== formData.value.registerPassword) {
        callback(new Error(rule.message))
    } else {
        callback()
    }
}
const rules = reactive({
    email: [
        { required: true, message: "请输入邮箱", trigger: 'blur' },
        { validator: proxy.verify.email, message: "请输入正确的邮箱", trigger: 'blur' }
    ],
    emailCode: [{ required: true, message: "请输入邮箱验证码", trigger: 'blur' }],
    nickName: [{ required: true, message: "请输入昵称", trigger: 'blur' }],
    password: [
        { required: true, message: "请输入密码", trigger: 'blur' },
        { validator: proxy.verify.password, message: "密码只能是数字,字母,特殊字符8~18位", trigger: 'blur' }
    ],
    registerPassword: [{ required: true, message: "请输入密码", trigger: 'blur' },
    {
        validator: proxy.verify.password,
        message: "密码只能是数字,字母,特殊字符8~18位", trigger: 'blur'
    }],
    reRegisterPassword: [{ required: true, message: "请再次输入密码 ", trigger: 'blur' },
    {
        validator: checkRePassword,
        message: "两次输入的密码不一致"
    }],
    checkCode: [{ required: true, message: "请输入图片验证码", trigger: 'blur' }],
})


//验证码  图片路径
const checkImgUrl = ref(api.checkCode)
const checkCodeUrlSendEmailCode = ref(api.checkCode)
const changeCheckImgUrl = (type: Number) => {
    if (type == 0) {
        checkImgUrl.value = api.checkCode + "?type=" + type + "&time=" + new Date().getTime()
    } else {
        checkCodeUrlSendEmailCode.value = api.checkCode + "?type=" + type + "&time=" + new Date().getTime()
    }
}
//登录注册 弹窗基本信息
const dialogConfig = reactive({
    show: false,
    title: '登录/注册',
})
//重置表单
const resetForm = () => {
    dialogConfig.show = true
    if (opType.value == 0) {
        dialogConfig.title = '注册'
    } else if (opType.value == 1) {
        dialogConfig.title = "登录"
    } else if (opType.value == 2) {
        dialogConfig.title = "重置密码"
    }
    //登录
    if (opType.value == 1) {
        const cookieLogin = proxy.VueCookies.get("loginInfo")
        if (cookieLogin) {
            formData.value = cookieLogin
            console.log(formData)
        }
    }


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

//登录，注册，重置表单提交表单
const doSubmit = () => {
    formDataRef.value?.validate(async (valid) => {
        if (!valid) {
            return
        }
        let params: any = {}
        Object.assign(params, formData.value)
        //注册
        if (opType.value == 0 || opType.value == 2) {
            params.password = params.registerPassword
            delete params.registerPassword
            delete params.reRegisterPassword
        }
        //登录

        if (opType.value == 1) {
            let cookieLogin = proxy.VueCookies.get("loginInfo")
            let cookiePassword = cookieLogin == null ? null : cookieLogin.password

            if (params.password !== cookieLogin.password) {
                params.password = md5(params.password)
            }
        }

        let url = null
        if (opType.value == 0) {
            url = api.register
        } else if (opType.value == 1) {
            url = api.login
        } else if (opType.value == 2) {
            url = api.resetPwd
        }
        let result = await proxy.request({
            url: url,
            params: params
        })
        if (!result) { return }

        //注册返回
        if (opType.value == 0) {
            proxy.message.success('注册成功，请登录！')
            showPanel(1)
        } else if (opType.value == 1) {
            //登录
            if (params.rememberMe) {  //勾选，记住我框
                const loginInfo = {
                    email: params.email,
                    password: params.password,
                    rememberMe: params.rememberMe
                }
                proxy.VueCookies.set("loginInfo", loginInfo, '7000')
            } else {
                proxy.VueCookies.remove("loginInfo")
            }
            dialogConfig.show = false
            proxy.message.success("登录成功")

        } else if (opType.value == 2) {
            //重置密码
            proxy.message.success('重置密码成功，请登录！')
            showPanel(1)
        }




    })
}


</script>

<style scoped lang="less">
.login-register {

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

.checkCode {
    display: flex;

    .checkImg {
        margin-left: 5px;
        cursor: pointer;
    }
}
</style>