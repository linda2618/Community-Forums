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

            <div class="login">
                <!-- <i class="iconfont icon-shouji"></i> -->
                <button @click="showDialog = true">登录 / 注册</button>
            </div>
        </div>
        <Dialog :buttons="buttons" :show="showDialog" @close="closeDialog">这里是内容</Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
const input = ref('')
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
const showDialog = ref(true)

const buttons = [{
    text: '确定',
    type: 'primary'
}]
const closeDialog = () => {
    showDialog.value = false
}
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
        flex: 1;
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
                color: rgb(99, 208, 171);
                background-color: #f1eeee;
                border: 0;
            }

            button:hover {
                color: rgb(72, 179, 143);
            }


        }
    }


    .login {
        width: 180px;

        button {
            float: right;
            margin-top: 15px;
            height: 35px;
            width: 100px;
            font-size: 14px;
            color: #fff;
            background-color: rgb(102, 216, 178);
            border: 0;
            border-radius: 8px;
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