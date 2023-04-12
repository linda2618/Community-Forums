<template>
    <div class="index_box">
        <Header></Header>


        <!-- 路由占位符 -->
        <router-view></router-view>
        <!-- <Main></Main> -->

        <!-- 底部模块 -->
        <Footer></Footer>

    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Header from './Header.vue'
import Footer from '../../components/Footer.vue'
import Main from './Main.vue'



</script>

<style scoped lang="less">
.index_box {
    background-color: #f5f5f5;
}
</style>