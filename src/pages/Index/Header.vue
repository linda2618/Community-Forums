<template>
    <div class="header_box">
        <div class="container w">
            <div class="logo">
                <img src="../../assets/logo.png" alt="">
                <span v-for="item in logoInfo" :key="item.id" :style="{ color: item.color }">{{ item.letter }}</span>
            </div>

            <!-- 模板信息 -->

            <div class="nav-menu">
                <router-link :class="['menu-item home', activePBoardId == undefined ? 'active' : '']"
                    to="/">首页</router-link>
                <template v-for="board in boardList">
                    <el-popover placement="bottom-start" :width="300" trigger="hover" v-if="board.children.length > 0">
                        <template #reference>
                            <span :class="['menu-item', board.boardId == activePBoardId ? 'active' : '']"
                                @click="boardClick(board)">{{ board.boardName }}</span>
                        </template>

                        <div class="sub-board-list">
                            <span v-for="subList in board.children"
                                :class="['sub-board', subList.boardId == activeBoardId ? 'active' : '']"
                                @click="subBoardClick(subList)">{{
                                    subList.boardName }}</span>
                        </div>
                    </el-popover>
                    <span class="menu-item" v-else @click="boardClick(board)">{{ board.boardName }}</span>

                </template>
            </div>

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
import router from '../../router';
const { proxy } = getCurrentInstance() as any

const store = useStore()
const input = ref('')
const api = {
    getUserInfo: "/getUserInfo",
    getBoardList: "/board/loadBoard"
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
//获取板块信息列表
const boardList: any = ref([])
const getBoardList = async () => {
    let result = await proxy.request({
        url: api.getBoardList
    })
    if (!result) { return }
    boardList.value = result.data
    store.commit("saveBoardList", result.data)
}
getBoardList()

// 监听 登录用户信息
const userInfo: any = ref({})
watch(() => store.state.loginUserInfo, (newValue, oldValue) => {
    if (newValue != undefined && newValue != null) {
        userInfo.value = newValue
    } else {
        userInfo.value = {}
    }

}, { immediate: true, deep: true })
//监听是否展示登录框
watch(() => store.state.showLogin, (newValue, oldValue) => {
    if (newValue) {
        showLoginRegister(1)
    }

}, { immediate: true, deep: true })



//板块点击
const boardClick = (board: any) => {
    // console.log(board.boardId)
    router.push(`/forum/${board.boardId}`)
}
const subBoardClick = (subBoard: any) => {
    router.push(`/forum/${subBoard.pBoardId}/${subBoard.boardId}`)
}


//当前选中的版块
const activePBoardId = ref(0)
watch(() => store.state.activePBoardId, (newVal, oldVal) => {
    if (newVal != 0) {
        activePBoardId.value = newVal
    }
}, { immediate: true, deep: true })

const activeBoardId = ref(0)
watch(() => store.state.activeBoardId, (newVal, oldVal) => {
    activeBoardId.value = newVal
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
        width: 550px;

        .menu-item {
            margin-left: 40px;
            cursor: pointer;
        }

        .home {
            text-decoration: none;
            color: #000;
        }

        .active {
            color: rgb(31, 223, 117);
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


.sub-board-list {
    display: flex;
    flex-wrap: wrap;

    .sub-board {
        padding: 0 10px;
        border-radius: 20px;
        margin-right: 10px;
        background-color: #ddd;
        border: 1px solid #ddd;
        color: rgb(135, 134, 134);
        margin-top: 10px;
        cursor: pointer;
    }

    .sub-board:hover {
        color: rgb(31, 223, 117);
    }

    .active {
        color: rgb(31, 223, 117);
    }
}
</style>