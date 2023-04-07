<template>
    <div class="header_box">
        <div class="container w">
            <div class="logo">
                <img src="../../assets/logo.png" alt="">
                <span v-for="item in logoInfo" :key="item.id" :style="{ color: item.color }">{{ item.letter }}</span>
            </div>

            <ul class="nav-menu">
                <li>首页</li>
                <li>题库</li>
                <li>面试</li>
                <li>求职</li>
                <li>学习</li>
                <li>竞赛</li>
            </ul>

            <div class="nav-search">
                <div class="nav-search-container">
                    <input v-model="input" placeholder="搜索面经/职位/试题" clearable />
                    <button><i class="iconfont icon-ic_search24px"></i> 搜索</button>
                </div>
            </div>


            <!-- 登录后显示 -->
            <div v-if="userInfo.userId" class="afterLogin">
                <div class="messageInfo">
                    <el-dropdown>
                        <el-badge :value="200" :max="99" class="item">
                            <div class="iconfont icon-message1"></div>
                        </el-badge>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>回复我的</el-dropdown-item>
                                <el-dropdown-item>赞了我的文章</el-dropdown-item>
                                <el-dropdown-item>赞了我的评论</el-dropdown-item>
                                <el-dropdown-item>系统消息</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div class="userInfo">
                    <!-- 图像 -->
                    <el-dropdown>
                        <Avatar userId="7437465925"></Avatar>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>我的主页</el-dropdown-item>
                                <el-dropdown-item>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                </div>
            </div>


            <div class="login" v-else>
                <button @click="showLoginRegister(0)">注册</button>
                <button @click="showLoginRegister(1)">登录</button>
            </div>



        </div>

        <!-- 登录注册弹框 -->
        <LoginAndRegister ref="loginRegisterRef">这里是内容</LoginAndRegister>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, getCurrentInstance } from 'vue'

import { useStore } from 'vuex'
import LoginAndRegister from '../LoginAndRegister/index.vue'
const { proxy } = getCurrentInstance() as any

const store = useStore()
const input = ref('')
const api = {
    getUserInfo: "/getUserInfo"
}


const logoInfo = ref([
    {
        id: 1,
        letter: '快',
        color: '#3285FF',
    },
    {
        id: 2,
        letter: '乐',
        color: '#FB3624'
    },
    {
        id: 3,
        letter: '代',
        color: '#25B24E'
    }, {
        id: 4,
        letter: '码',
        color: '#FFBA02'
    }
])

let loginRegisterRef = ref<{ showPanel: Function }>()

//登录注册
const showLoginRegister = (type: Number) => {
    loginRegisterRef.value?.showPanel(type)
}

onMounted(() => {
    getUserInfo()
})
//获取用户信息
const getUserInfo = async () => {
    let result = await proxy.request({
        url: api.getUserInfo,
    })
    if (!result) { return }
    store.commit("updateLoginUserInfo", result.data)
}

// 监听 登录用户信息
const userInfo: any = ref({})
watch(() => store.state.loginUserInfo, (newValue, oldValue) => {
    if (newValue != undefined && newValue != null) {
        userInfo.value = newValue
    } else {
        userInfo.value = {}
    }

}, { immediate: true, deep: true })


</script>

<style scoped lang="less">
.header_box {
    height: 60px;
    background-color: #fff;
    box-shadow: 2px 2px 2px #ccc;
}

.container {
    height: 60px;
    line-height: 60px;
    display: flex;

    .logo {
        height: 100%;
        display: flex;

        img {
            height: 100%;
        }

        span {
            line-height: 80px;
            font-size: 18px;
            text-shadow: 1px 1px
        }
    }

    .nav-menu {
        width: 650px;
        display: flex;

        li {
            flex: 6;
        }
    }

    //搜索框部分
    .nav-search {
        width: 350px;

        .nav-search-container {

            input {
                width: 230px;
                background-color: #f1eeee;
                height: 36px;
                text-indent: 14px;
                border: 0;
                //聚焦input边框去除
                outline: none;
            }

            button {
                width: 80px;
                height: 36px;
                padding-bottom: 2px;
                color: rgb(99, 208, 171);
                background-color: #f1eeee;
                border: 0;
            }

            button:hover {
                color: rgb(72, 179, 143);
            }


        }
    }

    .afterLogin {
        .messageInfo {
            float: left;
            margin-left: 30px;
            margin-right: 30px;
            padding-top: 20px;

            .iconfont {
                font-size: 25px;
            }



        }

        .userInfo {
            padding-top: 5px;
            float: right;
            cursor: pointer;
        }
    }


    .login {
        width: 180px;


        button {
            float: right;
            margin-top: 15px;
            height: 35px;
            width: 50px;
            font-size: 14px;
            color: #fff;
            background-color: rgb(102, 216, 178);
            border: 0;
        }

        button:hover {
            background-color: rgb(72, 179, 143);
        }

        // button::before {
        //     content: '\e692';
        // }

    }

}
</style>